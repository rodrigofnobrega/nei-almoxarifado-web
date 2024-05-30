<template>
    <Modal id="itemDetailing" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
        <template v-slot:header>
            <h6 class="header-title d-flex fw-medium justify-content-start align-items-center">Detalhes do Item</h6>
            <button class="btn btn-transparent text-light close-btn" type="button" data-bs-dismiss="modal">
                <IconsClose class="close ms-5 s-5" width="1.3em" height="1.3em"/>
            </button>
        </template> 
        <template v-slot:body>
            <div v-if="item_details" class="row">
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
                    <div class="mb-3"> 
                        <label class="form-label fw-bold"> Quantidade </label>
						<input readonly class="form-control bg-light-emphasis" :value="item_details.quantity ? item_details.quantity : item_qtd"> 
					</div>	
				</div>
				<div class="col-6">
                    <div class="mb-3"> 
                        <label class="form-label fw-bold"> Inventário </label>
						<input readonly class="form-control bg-light-emphasis" :value="item_route"> 
					</div>	
					<div class="mb-3">
                        <label class="form-label fw-bold"> Última atualização </label>
                        <input readonly class="form-control bg-light-emphasis" id="expansible-form" @mouseover="inputExpand" @mouseleave="inputContract" :value="'[]'">
                    </div>
					<div class="mb-3"> 
                        <label class="form-label fw-bold"> Data de Registro </label>
						<input readonly class="form-control bg-light-emphasis" :value="'03/12/2004 00:00'"> 
					</div>	
                    <div class="mb-3"> 
						<label class="form-label fw-bold"> Criador </label>
						<input readonly class="form-control bg-light-emphasis" :value="'Amauri'"> 
					</div>	
				</div>
			</div>
        </template>
        <template v-slot:footer>
            <div class="container-fluid d-flex justify-content-center align-items-center">
                <button class="btn mode-btn inset-shadow btn-dark-alert mx-1" :class="{'d-none': editionActive, 'd-block': !editionActive}" @click="deleteItem" id="itemDelete" data-bs-dismiss="modal">Excluir</button>
                <button type="button" class="btn inset-shadow btn-light-alert text-light mx-1" :class="{'d-none': !editionActive, 'd-block': editionActive}" @click="revertEdition" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn inset-shadow mode-btn btn-primary mx-1" @click="setEdition">{{ editionActive ? 'Voltar' : 'Editar' }}</button>
                <button class="btn inset-shadow btn-light-success text-light mx-1" id="fetch-inputs" :class="{'d-none': !editionActive, 'd-block': editionActive}" @click="fetchNewData" data-bs-dismiss="modal">Confirmar</button>
            </div>
            <div data-bs-target="#itemHistory" data-bs-toggle="modal" type="button" class="btn btn-primary position-fixed bg-primary rounded-2 p-1 d-flex justify-content-end text-light">
                <IconsHistory width="25px" height="25px"/>
            </div>
        </template> 
    </Modal>
    <ModalItemHistory v-if="toggleHistory" :item_history="item_details"/>
</template>

<script>
import { useStorageStore } from '../../stores/storage';
import { inject } from 'vue';

export default {
    data() {
        return {
            expansibleContainer: null,
            expansibleInput: null, 
            shadowInput: null,
            mouseOverFlag: false,
            inputs: [],
            editionActive: false,
            toggleHistory: true
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
        item_qtd: {
            type: Number
        }
    },
    setup(){
        const store = useStorageStore();
        return {
            store
        }
    },
}
</script>

<style scoped>
.inset-shadow{
    padding: 6px 10px 6px 10px;
    box-shadow: inset 1px 1px 15px 1px rgb(0, 0, 0, 0.2);
}
.modal-header{
    background-color: red;
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