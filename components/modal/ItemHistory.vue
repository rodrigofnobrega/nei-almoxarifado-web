<template>
	<Modal id="itemHistory" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
	 	<template v-slot:header> 
			<h5 class="modal-title"> Histórico mais recente do item </h5>
		</template>
	    <template v-slot:body>
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
			<tr v-for="history in item_history.history" :key="'Amauri'"> 
				<td scope="row" class="p-2 mb-3"> {{ history }} </td>
				<td class="fw-bolder p-2 mb-3" style="--bs-bg-opacity: .99"
					:class="{'text-light bg-success border-0': isCreate(history), 'text-light bg-danger border-0': isDelete(history), 'text-light bg-warning border-0': isRequest(history)}"> {{ history.split('-')[1] }} </td>
				<td > {{item_history.qtd}} </td>
				<td > {{'Amauri'}} </td>
			</tr>
		</tbody>
	</table>
		</template>
		<template v-slot:footer> 
			<div class="container-fluid d-flex justify-content-center align-items-center">
				<button class="btn btn-warning" data-bs-dismiss="modal"> Voltar </button>
			</div>
		</template>
	</Modal>
</template>

<script lang="ts">
export default{
	props: {
		item_history: {
			type: Object,
			required: true
		}
	},
	methods:{
	isCreate(data){
		if(data.includes('Adicionado')){
			return data; 
		}
	},
	isRequest(data){
		if(data.includes('Consumido')){
			return data; 
		}
	},
	isDelete(data){
		if(data.includes('Excluido')){
			return data; 
		}
	},
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
    font-size: 26px;
    font-weight: semibold;
    margin: -1px 0 -1px 0;
    padding: 0;
}
.btn{
    border-radius: 10px;
}
</style>
