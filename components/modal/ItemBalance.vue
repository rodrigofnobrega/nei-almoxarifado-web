<template>
    <Modal id="itemDetailing" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
        <template v-slot:header>
            <h5 class="header-title d-flex justify-content-start align-items-center">Detalhes do Item</h5>
            <button class="btn btn-transparent text-light" type="button" data-bs-dismiss="modal">
                <IconsClose class="close mt-1 ms-5 s-5" width="1.7em" height="1.7em"/>
            </button>
        </template>
        <template v-slot:body>
            <div class="row">
				<div class="col-6">
					<div class="mb-3"> 
						<label class="form-label fw-bold"> Nome </label>
						<input readonly class="form-control" type="text" :value="item_details.name">
					</div>	
					<div class="mb-3"> 
						<label class="form-label fw-bold"> Código Sipac </label>
						<input readonly class="form-control" :value="item_details.sipac"> 
					</div>	
					<div class="mb-3"> 
						<label class="form-label fw-bold"> Tipo </label>
						<input readonly class="form-control" :value="item_details.type"> 
					</div>
                    <div class="mb-3"> 
						<label class="form-label fw-bold"> Quantidade </label>
						<input readonly class="form-control" :value="item_details.qtd"> 
					</div>	
				</div>
				<div class="col-6">
					<div class="mb-3"> 
						<label class="form-label fw-bold"> Inventário </label>
						<input readonly class="form-control" :value="item_details.storage"> 
					</div>	
					<div class="mb-4">
                        <label class="form-label fw-bold"> Última atualização </label>
                        <input readonly id="expansible-form" class="form-control" @mouseover="inputExpand" @mouseleave="inputContract" :value="item_details.history[0]">
                    </div>
					<div class="mb-3"> 
						<label class="form fw-bold"> Data de Registro </label>
						<input readonly class="form-control" :value="'03/12/2004 00:00'"> 
					</div>	
                    <div class="mb-4"> 
						<label class="form-label fw-bold"> Criador </label>
						<input readonly class="form-control" :value="'Amauri'"> 
					</div>	
				</div>
			</div>
        </template>
        <template v-slot:footer>
            <div class="container-fluid d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-warning mx-3" data-bs-dismiss="modal">Voltar</button>
            </div>
        </template> 
    </Modal>
</template>background-color: red;

<script>
export default {
    data() {
        return {
            expansibleContainer: null,
            expansibleInput: null, 
            shadowInput: null,
            mouseOverFlag: false,
        }
    },
    methods: {
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
                this.expansibleInput.style.width = "230px";
            }
        }
    },
    props: {
        item_details: {
            type: Object,
            required: true
        }
    },
}
</script>



<style scoped>
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
.btn{
    border-radius: 10px;
}


</style>