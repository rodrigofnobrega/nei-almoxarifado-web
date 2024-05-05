<template>
	<Modal id="itemHistory" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
		<template v-slot:header>
            <h6 class="header-title d-flex fw-medium justify-content-start align-items-center">Cadastro de Item</h6>
            <button class="btn btn-transparent text-light close-btn" type="button" data-bs-dismiss="modal">
                <IconsClose class="close ms-5 s-5" width="1.3em" height="1.3em"/>
            </button>
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
			<tr v-if="item_history" v-for="history in item_history.history" :key="'Amauri'"> 
				<td scope="row" class="p-2 mb-3"> {{ history }} </td>
				<td class="fw-bolder p-2 mb-3" style="--bs-bg-opacity: .99"
					:class="{'text-light bg-success border-0': isCreate(history), 'text-light bg-danger border-0': isDelete(history), 'text-light bg-warning border-0': isRequest(history)}"> {{ history.split('-')[1] }} </td>
				<td > {{item_history.qtd}} </td>
				<td > {{'Amauri'}} </td>
			</tr>
		</tbody>
	</table>
		</template>
	</Modal>
</template>

<script lang="ts">
export default{
	props: {
		item_history: {
			type: Object
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
    font-weight: semibold;
    margin: -1px 0 -1px 0;
    padding: 0;
}
.modal-btn{
    border-radius: 10px;
}
</style>
