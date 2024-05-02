<template>
	<Card class="mb-5 cards-grid">
		<template v-slot:header>
			<div class="d-flex justify-content-between">
    		    <h5 class="justify-content-start">
    		        Solicitação
    		    </h5>
    		    <p class="fs-6 resquest-time">20/05/24 14:00<IconsClock class="mb-1 ms-2"/></p>
    		</div>
		</template>
		<template v-slot:default> 
			<div class="row cards-row">
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
					<div class="mb-3"> 
						<label class="form-label fw-semibold"> Item solicitado </label>
						<div class="overflow-x-auto">
							<input readonly class="form-control overflow-x-auto" :value="itemName"> 
						</div>
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
	props: ['person', 'requestedAt', 'expirationDate', 'message', 'itemName', 'itemTagging', 'quantity', 'itemQuantity', 'itemType', 'itemKey']
}
</script>


<style scoped>
.cards-grid{
	width:calc(104%*0.99);
}
.cards-row{
	margin-right: -20px; 
	margin-left: -20px;
}
.resquest-time{
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
@media screen and (max-width: 1250px){
	.form-label{
		font-size: 13.3px;
	}
}

@media screen and (max-width: 1050px){
	.cards-grid{
		width:calc(104%*0.93);
	}
}
@media screen and (max-width: 990px){
	.cards-grid{
		width: 102%;
	}
	.cards-row{
		margin-right: -24px; 
		margin-left: -24px;
	}
}
@media screen and (max-width: 822px){
	.cards-grid{
		width: calc(99%*0.98);
	}
	.cards-row{
		margin-right: -20px; 
		margin-left: -20px;
	}
}
</style>

