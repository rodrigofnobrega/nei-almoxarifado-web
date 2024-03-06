<script setup lang="ts"> 
	import { reactive, computed } from 'vue';
	const itemOperations = reactive([
		{
			 date: new Date(Date.now()).toLocaleDateString(),
			 operation: 'Cadastro',
			 quantity: 3,
			 author: 'Andriel',
		},
		{
			 date: new Date(Date.now()).toLocaleDateString(),
			 operation: 'Consumo',
			 quantity: 3,
			 author: 'Andriel',
		},
		{
			 date: new Date(Date.now()).toLocaleDateString(),
			 operation: 'Exclusão',
			 quantity: 3,
			 author: 'Andriel',
		},
	]);
	
	const isCreate = (data) => {
		return data.operation == 'Cadastro'; 
	};
	const isRequest = (data) => {
		return data.operation == 'Consumo'; 
	};
	const isDelete = (data) => {
		return data.operation == 'Exclusão'; 
	};
</script>

<template>
	<table class="table text-center"> 
		<thead>
			<tr>
				<th scope="col"> Data </th> 
				<th scope="col"> Operação </th> 
				<th scope="col"> Quantidade </th> 
				<th scope="col"> Autor </th> 
			</tr>
		 </thead>
		<tbody>
			<tr v-for="line in itemOperations" > 
				<td scope="row" class="p-2 mb-3"> {{line.date}} </td>
				<td class="fw-bolder p-2 mb-3" style="--bs-bg-opacity: .99"
					:class="{'text-success': isCreate(line), 'text-danger': isDelete(line), 'text-warning': isRequest(line)}"> {{line.operation}} </td>
				<td > {{line.quantity}} </td>
				<td > {{line.author}} </td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
</style>

