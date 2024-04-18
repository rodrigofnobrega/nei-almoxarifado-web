<template>
    <div class="container d-flex content">
		<!-- TODO: transformar em tabela com linhas !-->
		<div class="row">
			<div v-for="req in requests" class="col-xl-4 px-xl-3 col-lg-6 px-lg-3 col-md-6 px-md-3 col-sm-12 col-xs-12 mb-3 mb-xl-0"> 
				<CardsSolicitation 
					:person="req.person"
					:requestedAt="req.requestedAt"	
					:message="req.message"
					:itemName="req.item"	
					:itemTagging="req.itemTagging"
					:quantity="req.quantity"
					:itemQuantity="req.itemQuantity"
					:itemType="req.itemType"
					> 
				</CardsSolicitation>
			</div>
		</div>
    </div>
</template>

<script setup lang="ts"> 
import { inject } from 'vue';

const setpageTitle = inject('setpageTitle');

const sendDataToParent = () => {
    const data = "Controle de Acesso";
    setpageTitle(data);
};
sendDataToParent();
	const requests = [
	{ 
		requestedAt: new Date(Date.now()).toLocaleDateString(),
		message: "Solicito o item para a sala A308",
		quantity: 1,
		person: 'Gabriel',
		item: 'Monitor Multilaser',
		itemTagging: 2029103923,
		itemQuantity: 2,
		itemType: 'unidade'
	 }, 
	{
		requestedAt: new Date(Date.now()).toLocaleDateString(),
		message: "Solicito o item para a sala B204",
		quantity: 15,
		person: "Clezio",
		item: "Copo descartável",
		itemTagging: 20191029301, 
		itemQuantity: 200,
		itemType: 'unidade'
	},
	{
		requestedAt: new Date(Date.now()).toLocaleDateString(),
		message: "Solicito o item para a sala B204",
		quantity: 15,
		person: "Clezio",
		item: "Copo descartável",
		itemTagging: 20191029301, 
		itemQuantity: 200,
		itemType: 'unidade'
	},
	{
		requestedAt: new Date(Date.now()).toLocaleDateString(),
		message: "Solicito o item para a sala B204",
		quantity: 15,
		person: "Clezio",
		item: "Copo descartável",
		itemTagging: 20191029301, 
		itemQuantity: 200,
		itemType: 'unidade'
	},
	{
		requestedAt: new Date(Date.now()).toLocaleDateString(),
		message: "Solicito o item para a sala B204",
		quantity: 15,
		person: "Clezio",
		item: "Copo descartável",
		itemTagging: 20191029301, 
		itemQuantity: 200,
		itemType: 'unidade'
	},
	{
		requestedAt: new Date(Date.now()).toLocaleDateString(),
		message: "Solicito o item para a sala B204",
		quantity: 15,
		person: "Clezio",
		item: "Copo descartável",
		itemTagging: 20191029301, 
		itemQuantity: 200,
		itemType: 'unidade'
	},
	];

</script>

<style scoped>
.content {
	margin-left: 3vh;
	margin-right: 3vh;
}
</style>
