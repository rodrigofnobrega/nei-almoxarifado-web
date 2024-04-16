<template>
	<Card class="mb-5" style="width:103%;">
		<template v-slot:header> <h5 class="d-flex"> Solicitação <span class="fs-6 resquest-time">20/05/24 14:00<IconsClock class="mb-1 ms-2"/></span> </h5> </template>
		<template v-slot:default> 
			<div class="row">
				<div class="col-6 me-0">
					<div class="mb-3"> 
						<label class="form-label fw-semibold"> Solicitador </label>
						<input readonly class="form-control" type="text" :value="person"> 
					</div>	
					<div class="mb-3"> 
						<label class="form-label fw-semibold"> Quantidade Solicitada </label>
						<input readonly class="form-control" :value="quantity">
					</div>		
					<div class="mb-3"> 
						<label class="form-label fw-semibold"> Quantidade Disponível </label>
						<input readonly class="form-control" :value="itemQuantity"> 
					</div>
				</div>
				<div class="col-6">
					<div class="mb-3" @mouseover="inputExpand" @mouseleave="inputContract"> 
						<label class="form-label fw-semibold"> Item solicitado </label>
						<input readonly class="form-control" id="expansible-form" :value="itemName"> 
					</div>	
					<div class="mb-3"> 
						<label class="form-label fw-semibold"> Código Sipac </label>
						<input readonly class="form-control" :value="itemTagging"> 
					</div>	
					<div class="mb-0"> 
						<label class="form-label fw-semibold"> Tipo </label>
						<input readonly class="form-control" :value="itemType">
					</div>	
				</div>
				<div class="mb-0"> 
						<label class="form-label fw-semibold"> Mensagem </label>
						<div class="d-flex">
							<textarea readonly class="form-control"> {{ message }} </textarea>
						</div>
				</div>	
			</div>
			</template>
		<template v-slot:footer>
			<div class="row justify-content-evenly"> 
				<button class="action-btn btn btn-danger col-2 mx-2" data-bs-toggle="modal" data-bs-target="#rejectModal"> Rejeitar </button>
				<button class="action-btn btn btn-outline-success col-2 mx-2" data-bs-toggle="modal" data-bs-target="#acceptModal"> Aceitar </button>
			</div>
		</template>
	</Card>
	<ModalActionConfirm id="acceptModal">
		<template v-slot:title> Confirmar aceitação </template>
		<template v-slot:text> 
			<h6> Mensagem para a notificação </h6>
			<textarea class="form-control"> </textarea>
		 </template>
		<template v-slot:buttons> 
			<button class="btn btn-secondary mx-2"> Enviar </button>
		</template>
	 </ModalActionConfirm>
	<ModalActionConfirm id="rejectModal">
		<template v-slot:title> Confirmar rejeição </template>
		<template v-slot:text> 
			<h6> Mensagem para a notificação </h6>
			<textarea class="form-control"> </textarea>
		 </template>
		<template v-slot:buttons> 
			<button class="btn btn-secondary mx-2"> Enviar </button>
		</template>
	 </ModalActionConfirm>
</template>

<script>
import Card from './Card.vue'
export default {
	components: { Card },
	data(){
		return{
            expansibleContainer: null,
            expansibleInput: null, 
            shadowInput: null,
            mouseOverFlag: false,
		}
	},
	methods: {
		inputExpand() { 
			console.log("EXPNADI");
            if (!this.mouseOverFlag) { 
                this.mouseOverFlag = true;
                this.shadowInput = document.createElement("input");
                this.shadowInput.setAttribute("class", "form-control");
                this.shadowInput.setAttribute("value", "");
                this.shadowInput.setAttribute("readonly", "true");

                this.expansibleInput = document.getElementById("expansible-form");
                this.expansibleInput.style.position = "fixed";
				this.expansibleInput.style.zIndex = "1000";
                this.expansibleInput.style.width = "14%";
				this.expansibleInput.style.backgroundColor = "#f5ee4c";
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
				this.expansibleInput.style.backgroundColor = "white";
            }
        }
	},
	props: ['person', 'requestedAt', 'expirationDate', 'message', 'itemName', 'itemTagging', 'quantity', 'itemQuantity', 'itemType']
}
</script>


<style scoped>
.resquest-time{
	margin-left: 25%; 
	margin-top: 3px;
	opacity: 80%;
}
.form-label{
	white-space: nowrap;
	font-size: 14px;
}
.form-control{
	font-size: 15px;
}
.action-btn{
	width: 24%;
	font-size: 17px;
	white-space: nowrap;
}
</style>

