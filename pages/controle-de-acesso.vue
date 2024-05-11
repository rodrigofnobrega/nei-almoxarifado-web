<template>
    <div class="container">
		<!-- TODO: transformar em tabela com linhas !-->
		<div class="row mt-3 d-flex align-items-center justify-content-center">
			<div v-if="solicitations.length > 0" v-for="req in solicitations" :key="req.id" :class="{'extra-large': solicitations.length == 1, 'col-xl-6': solicitations.length == 2}" class="p-0 col-xl-4 col-lg-6 col-md-6 col-sm-12  mb-3 mb-xl-0"> 
				<CardsSolicitation
					:person="req.user.name"
					:requestedAt="req.creationDate"	
					:message="req.description"
					:itemName="req.item.name"	
					:itemTag="req.item.sipacCode"
					:quantityRequested="req.quantityRequested"
					:itemQuantity="req.item.quantity"
					:itemType="req.item.type"
					:requestId="req.id"
					> 
				</CardsSolicitation>
			</div>
			<div v-else class="warning-text d-flex aling-items-center justify-content-center">
                 <p class="text-dark-emphasis fs-5 opacity-50">Nenhuma solicitação feita.</p>
             </div>
		</div>
    </div>
</template>

<script setup lang="ts"> 
import { inject } from 'vue';
import { getRequestByStatus } from '../services/requests/requestsGET';
import { useUser } from '../stores/user';
import { provide, ref } from 'vue';

const setpageTitle = inject('setpageTitle');

const sendDataToParent = () => {
    const data = "Controle de Acesso";
    setpageTitle(data);
};
sendDataToParent();
const userStore = useUser()
const solicitations = ref(await getRequestByStatus(userStore, 'pendente'))

provide('setSolicitations', async () => {
	solicitations.value = await getRequestByStatus(userStore, 'pendente')
})
</script>

<style scoped>
.extra-large{
	width: 50vw;
}
.container{
	width: 100%;
	padding-left: 30px;
}
.warning-text{
	position: absolute;
	margin-top: 5%;
	width: 80%;
}
</style>
