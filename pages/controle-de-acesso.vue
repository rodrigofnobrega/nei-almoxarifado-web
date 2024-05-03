<template>
    <div class="container d-flex content">
		<!-- TODO: transformar em tabela com linhas !-->
		<div class="row">
			<div v-if="solicitations.length > 0" v-for="req in solicitations" class="col-xl-4 px-xl-3 col-lg-6 px-lg-3 col-md-6 px-md-3 col-sm-12 col-xs-12 mb-3 mb-xl-0"> 
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
			<div v-else class="warning-text teste d-flex aling-items-center justify-content-center">
                 <p class="text-dark-emphasis fs-5 opacity-50">Nenhuma solicitação feita.</p>
             </div>
		</div>
    </div>
</template>

<script setup lang="ts"> 
import { inject } from 'vue';
import { getRequestByStatus } from '../services/requests/requestsGET';
import { useUser } from '../stores/user';
import { onMounted, ref } from 'vue';

const setpageTitle = inject('setpageTitle');

const sendDataToParent = () => {
    const data = "Controle de Acesso";
    setpageTitle(data);
};
sendDataToParent();
const userStore = useUser()

const solicitations = ref(await getRequestByStatus(userStore, 'pendente'))
</script>

<style scoped>
.teste{
	position: absolute;
	margin-top: 5%;
	margin-left: -10%;
}
.content {
	margin-left: 3vh;
	margin-right: 3vh;
}
</style>
