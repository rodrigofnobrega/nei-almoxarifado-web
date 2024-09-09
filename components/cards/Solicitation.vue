<template>
	<Card class="mb-5 cards-grid">
		<template v-slot:header>
			<div class="d-flex justify-content-between align-items-center">
				<h6 class="justify-content-start mb-3">
					Solicitação
    		    </h6>
    		    <p class="resquest-time mb-3">{{requestedAt.slice(0, 19)}}<IconsClock class="clock ms-2"/></p>
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
						<input readonly class="form-control" :value="quantityRequested">
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
						<input readonly class="form-control" :value="itemTag"> 
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
				<button class="action-btn text-light btn fw-bold btn-dark-alert col-2 mx-2" data-bs-toggle="modal" :data-bs-target="`#rejectModal${requestId}`"> Rejeitar </button>
				<button class="action-btn text-light btn fw-bold btn-dark-success col-2 mx-2" data-bs-toggle="modal" :data-bs-target="`#acceptModal${requestId}`"> Aceitar </button>
			</div>
		</template>
	</Card>
	<ModalActionConfirm :id="`acceptModal${requestId}`">
		<template v-slot:title> Confirmar aceitação</template>
		<template v-slot:text> 
			<p class="fw-bold"> Mensagem para a notificação </p>
			<textarea v-model="responseMessage" class="form-control textarea"> </textarea>
		 </template>
		<template v-slot:buttons> 
			<button @click="AcceptRequest()" data-bs-dismiss="modal" class="btn btn-secondary fw-bold mx-2"> Enviar </button>
		</template>
	 </ModalActionConfirm>
	<ModalActionConfirm :id="`rejectModal${requestId}`">
		<template v-slot:title> Confirmar rejeição </template>
		<template v-slot:text> 
			<p class="fw-bold"> Mensagem para a notificação</p>
			<textarea v-model="responseMessage" class="form-control textarea"> </textarea>
		 </template>
		<template v-slot:buttons> 
			<button @click="RejectRequest()"  data-bs-dismiss="modal" class="btn btn-secondary fw-bold mx-2"> Enviar </button>
		</template>
	 </ModalActionConfirm>
</template>

<script lang="ts">
import Card from './Card.vue';
import { useUser } from '../../stores/user.ts';
import { requestAccept, requestDecline } from '../../services/requests/requestsPATCH.ts';
import { usePopupStore } from '~/stores/popup';
import { inject, ref } from 'vue';

export default {
	components: { Card },
	data() {
        return {
            responseMessage: ''
        }
    },
	props: {
		requestId: { type: Number, required: true, },
		person: { type: String, required: true },
		requestedAt: { type: String, required: true }, 
		message: { type: String, required: true }, 
		itemName: { type: String, required: true },
		itemTag: { type: Number },
		itemQuantity: {type: Number, required: true },
		quantityRequested: { type: Number, required: true },
		itemType: { type: String, required: true },
	},
	methods:{
		async AcceptRequest(){
			const res = await requestAccept(this.userStore, this.requestId, this.responseMessage);
			if(res){
				this.popupStore.throwPopup('Solicitação aceita', '#0B3B69')
				this.sendDatatoParent()
				return true
			}
			this.popupStore.throwPopup('Erro: Quantidade solicitada maior que a disponível', '#B71C1C')
		},
		async RejectRequest(){
			const res = await requestDecline(this.userStore, this.requestId, this.responseMessage);
			if(res){
				this.popupStore.throwPopup('Solicitação rejeitada', '#0B3B69');
				this.sendDatatoParent()
				return true
			}
			this.popupStore.throwPopup('Erro: Problema interno no servidor(Contate o Suporte)', '#B71C1C')
		}
	},
	setup(){
		const toolTip = ref(false);
		const userStore = useUser();
		const popupStore = usePopupStore()
		const setSolicitations = inject('setSolicitations');
		const sendDatatoParent = () => {
			setSolicitations()
		}
		return {
			userStore,
			popupStore,
			sendDatatoParent,
			toolTip
		}
	}
};

</script>


<style scoped>
.cards-grid{
    border: 0px #c0c0c2 solid !important;
}
.cards-row{
	margin-right: -20px; 
	margin-left: -20px;
}
.resquest-time{
	font-size: 15px;
	opacity: 80%;
}
.clock{
	margin-bottom: 2px;
}
.form-label{
	white-space: nowrap;
	font-size: 14px;
}
.form-control{
	font-size: 15px;
}
.action-btn{
	font-size: 15px !important;
	width: 90px;
	font-size: 17px;
	white-space: nowrap;
}
.tooltipMargin{
	margin-top: -50px;
	margin-left: 10%;
}
@media screen and (max-width: 1250px){
	.form-label{
		font-size: 13.3px;
	}
}
@media screen and (max-width: 852px){
	.cards-grid{
		width: 100%;
	}
}

/*

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
}*/
</style>

