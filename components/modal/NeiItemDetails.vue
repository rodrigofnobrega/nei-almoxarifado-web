<template>
    <Modal id="NeiItemDetailing" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
        <template v-slot:header>
            <p class="header-title d-flex fw-bold justify-content-start align-items-center">Detalhes do item</p>
            <button class="btn btn-transparent text-light close-btn" type="button" data-bs-dismiss="modal">
                <IconsClose class="close ms-5 s-5" width="1.3em" height="1.3em"/>
            </button>
        </template> 
        <template v-slot:body>
            <div v-if="item_details != undefined" class="row">
				<div class="col-6">
                    <div class="mb-3"> 
                        <label class="form-label fw-bold"> Nome </label>
						<input readonly class="form-control edit-control" :class="{'bg-light-emphasis': !editionActive, 'bg-light': editionActive}" type="text" :value="item_details.name">
					</div>	
					<div class="mb-3"> 
                        <label class="form-label fw-bold"> Código Sipac </label>
						<input readonly class="form-control edit-control" :class="{'bg-light-emphasis': !editionActive, 'bg-light': editionActive}" :value="item_details.sipacCode ? item_details.sipacCode : 'nenhum'"> 
					</div>	
					<div class="mb-3"> 
						<label class="form-label fw-bold"> Tipo </label>
						<input readonly class="form-control bg-light-emphasis" :value="item_details.type"> 
					</div>
				</div>
				<div class="col-6">
                    <div class="mb-3"> 
                        <label class="form-label fw-bold"> Inventário </label>
						<input readonly class="form-control bg-light-emphasis" :value="item_route"> 
					</div>
                    <div class="mb-3"> 
                        <label class="form-label fw-bold"> Quantidade </label>
						<input readonly class="form-control bg-light-emphasis" :value="item_details.quantity"> 
					</div>	
                    <div class="mb-3"> 
                        <label class="form-label fw-bold"> Situação </label>
						<input readonly class="form-control bg-light-emphasis" :value="item_details.available === true ? 'disponível' : 'esgotado'"> 
					</div>	
				</div>
			</div>
        </template>
        <template v-slot:footer>
            <div class="d-flex">
                <div class="d-flex align-items-center justify-content-center">
                    <button class="btn btn-secondary fw-bold text-light mx-1" data-bs-toggle="modal" data-bs-target="#NeiItemRequest">Solicitar</button>
                    <button class="btn btn-light-alert fw-bold text-light mx-1" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </template> 
    </Modal>
</template>

<script>
import { useStorageStore } from '../../stores/storage';
import { usePopupStore } from '../../stores/popup';
import { inject } from 'vue';
import { useUser } from '../../stores/user';
import { getRecordByItemId } from '../../services/record/recordGET';
import { postRequest } from '../../services/requests/requestsPOST';
import { useSearch } from '../../stores/search';

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
            itemQtd: 0,
            description: ''
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
        async getRecord(){
            const res = await getRecordByItemId(this.userStore,this.item_details.id);
            this.store.itemRecord = res.content;
        },
        async sendRequest(){
            try{
                const res = await postRequest(this.userStore, this.item_details.id, this.itemQtd, this.description)
            }catch(err){
                console.log(err)
                return this.popUpStore.throwPopup('Erro: digite uma mensagem de solicitação', '#B71C1C')
            }
            return this.popUpStore.throwPopup('Solicitação enviada', '#0B3B69')
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
        const popUpStore = usePopupStore();
        return {
            store, userStore, popUpStore
        }
    },
}
</script>

<style scoped>
.btn{
    padding: 6px;
}
.mode-btn{
    font-size: 15px;
}
.close{
    position: relative;
    left: 20px;
}
.header-title{
    margin: -1px 0 -1px 0;
    padding: 0;
}
.modal-btn{
    border-radius: 5px;
}
@media screen and (max-width: 424px){
    #NeiItemDetailing{
        margin: 0;
    }
}
@media screen and (max-width: 360px){
    .form-label{
        font-size: 12px !important;
        font-weight: normal !important;
    }   
    .form-control, button{
        font-size: 12px !important;
    }
}
</style>