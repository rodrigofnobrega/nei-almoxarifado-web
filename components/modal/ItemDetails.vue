<template>
    <Modal v-if="item_details != []" id="itemDetailing" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
        <template v-slot:header>
            <h6 class="header-title d-flex fw-medium justify-content-start align-items-center">Detalhes do item</h6>
            <button class="btn btn-transparent text-light close-btn" type="button" data-bs-dismiss="modal">
                <IconsClose class="close ms-5 s-5" width="1.3em" height="1.3em"/>
            </button>
        </template> 
        <template v-slot:body>
            <div class="row">
				<div class="col-6">
                    <div class="mb-3"> 
                        <label class="form-label fw-bold"> Nome </label>
						<input readonly class="form-control edit-control" :class="{'bg-light-emphasis': !editionActive, 'bg-light': editionActive}" type="text" :value="item_details.name">
					</div>	
					<div class="mb-3"> 
                        <label class="form-label fw-bold"> Código Sipac </label>
						<input readonly class="form-control edit-control" :class="{'bg-light-emphasis': !editionActive, 'bg-light': editionActive}" :value="item_details.sipacCode"> 
					</div>	
					<div class="mb-3"> 
						<label class="form-label fw-bold"> Tipo </label>
						<input readonly class="form-control bg-light-emphasis" :value="item_details.type"> 
					</div>
                    <div v-if="item_details.lastRecord != undefined" class="mb-3" style="width: 212%">
                        <label class="form-label fw-bold"> Última atualização </label>
                        <input readonly class="form-control bg-light-emphasis" id="expansible-form" @mouseover="inputExpand" @mouseleave="inputContract" :value="`${item_details.lastRecord.operation} ${item_details.lastRecord.creationDate === undefined? item_details.lastRecord.data.slice(0, 16) : item_details.lastRecord.creationDate.slice(0, 16)} ${item_details.lastRecord.user.name}`">
                    </div>	
				</div>
				<div class="col-6">
                    <!--
                    <div class="mb-3"> 
                        <label class="form-label fw-bold"> Inventário </label>
						<input readonly class="form-control bg-light-emphasis" :value="item_route"> 
					</div>
                    -->	
                    <div class="mb-3"> 
                        <label class="form-label fw-bold"> Quantidade </label>
						<input readonly class="form-control bg-light-emphasis" :value="item_details.quantity"> 
					</div>	
					<div v-if="item_details.createdAt != undefined" class="mb-3"> 
                        <label class="form-label fw-bold"> Data de Registro </label>
						<input readonly class="form-control bg-light-emphasis" :value="item_details.createdAt.slice(0,19)"> 
					</div>	
                    <div v-if="item_details.createdBy != undefined" class="mb-3"> 
						<label class="form-label fw-bold"> Criador </label>
						<input readonly class="form-control bg-light-emphasis" :value="item_details.createdBy.name"> 
					</div>
				</div>
			</div>
        </template>
        <template v-slot:footer>
            <div class="d-flex">
                <div v-if="userStore.role === 'ADMIN' && store.isEditionMode" class="container-fluid d-flex justify-content-center align-items-center">
                    <!--<button class="btn mode-btn inset-shadow btn-dark-alert mx-1" :class="{'d-none': editionActive, 'd-block': !editionActive}" @click="deleteItem" id="itemDelete" data-bs-dismiss="modal">Excluir</button>-->
                    <button type="button" class="btn inset-shadow btn-light-alert text-light mx-1" :class="{'d-none': !editionActive, 'd-block': editionActive}" @click="revertEdition" data-bs-dismiss="modal">Cancelar</button>
                    <button class="btn inset-shadow mode-btn btn-primary mx-1" @click="setEdition">{{ editionActive ? 'Voltar' : 'Editar' }}</button>
                    <button class="btn inset-shadow btn-light-success text-light mx-1" id="fetch-inputs" :class="{'d-none': !editionActive, 'd-block': editionActive}" @click="fetchNewData" data-bs-dismiss="modal">Confirmar</button>
                </div>
                <div v-if="userStore.role === 'ADMIN'" class="d-flex align-items-center justify-content-center">
                    <button class="btn inset-shadow mode-btn btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#itemReposition">Repor</button>
                </div>
                <div v-if="userStore.role === 'USER'" class="d-flex align-items-center justify-content-center">
                    <button class="btn btn-light-alert text-light" data-bs-dismiss="modal">Fechar</button>
                </div>
                <div v-if="userStore.role === 'ADMIN'" @click="getRecord" data-bs-target="#itemHistory" data-bs-toggle="modal" type="button" class="btn btn-primary  my-1 bg-primary rounded-2 p-1 d-flex justify-content-end text-light">
                    <IconsHistory width="25px" height="25px"/>
                </div>
            </div>
        </template> 
    </Modal>
    <ModalItemHistory v-if="toggleHistory"/>
    <ModalItemReposition :itemName="item_details.name" :itemSipac="item_details.sipacCode" :itemType="item_details.type" :itemIndex="item_index"/>
</template>

<script>
import { useStorageStore } from '../../stores/storage';
import { inject } from 'vue';
import { useUser } from '../../stores/user';
import { getRecordByItemId } from '../../services/record/recordGET';

export default {
    data() {
        return {
            expansibleContainer: null,
            expansibleInput: null, 
            shadowInput: null,
            mouseOverFlag: false,
            inputs: [],
            editionActive: false,
            toggleHistory: true,
        }
    },
    methods: {
        deleteItem(){
            this.store.deleteItem(this.item_index, this.item_route);
        },
        inputExpand() { 
            if (!this.mouseOverFlag) { 
                this.mouseOverFlag = true;
                this.shadowInput = document.createElement("input");
                this.shadowInput.setAttribute("class", "form-control");
                this.shadowInput.setAttribute("value", "");
                this.shadowInput.setAttribute("readonly", "true");

                this.expansibleInput = document.getElementById("expansible-form");
                this.expansibleInput.style.position = "fixed";
                this.expansibleInput.style.width = "300px";

                this.expansibleContainer = this.expansibleInput.parentNode;
                this.expansibleContainer.appendChild(this.shadowInput);
            }
        },
        inputContract() {
            this.mouseOverFlag = false; 
            if (this.shadowInput && this.expansibleContainer) {
                this.expansibleContainer.removeChild(this.shadowInput);
                this.shadowInput = null;
                this.expansibleInput.style.position = "static";
                this.expansibleInput.style.width = "100%";
            }
        },
        setEdition(){       
            this.editionActive = !this.editionActive;
            this.inputs = document.getElementsByClassName("edit-control");
            for(let i = 0; i < this.inputs.length; i++){
                this.inputs[i].removeAttribute('readonly');
            }
        },
        revertEdition(){
            this.editionActive = false;
            this.inputs = document.getElementsByClassName("edit-control");
            for(let i = 0; i < this.inputs.length; i++){
                this.inputs[i].setAttribute('readonly', '');
            }
        },
        fetchNewData(){
            this.store.updateItemQtd(this.item_index, this.inputs[0].value, this.inputs[1].value,this.item_route);
            this.revertEdition();
        },
        async getRecord(){
            const res = await getRecordByItemId(this.userStore,this.item_details.id);
            this.store.itemRecord = res.content;
        }
    },
    props: {
        item_details: {
            type: Object    
        },
        item_index:{
            type: Number
        },
        item_route:{
            type: String
        },
    },
    setup(){
        const store = useStorageStore();
        const userStore = useUser();
        return {
            store, userStore
        }
    },
}
</script>

<style scoped>
.inset-shadow{
    padding: 6px 10px 6px 10px;
    box-shadow: inset 1px 1px 15px 1px rgb(0, 0, 0, 0.2);
}
.close{
    position: relative;
    left: 20px;
}
.header-title{
    font-weight: semibold;
    margin: -1px 0 -1px 0;
    padding: 0;
}
.modal-btn{
    border-radius: 10px;
}
@media screen and (max-width: 424px){
    .form-label{
        font-size: 14px !important;
        font-weight: normal !important;
    }   
    .form-control{
        font-size: 12px !important;
    }
}
@media screen and (max-width: 360px){
    .form-label{
        font-size: 12px !important;
        font-weight: normal !important;
    }   
    .form-control{
        font-size: 12px !important;
    }
}
</style>