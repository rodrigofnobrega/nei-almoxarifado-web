<template>
	<Modal id="itemHistory" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
	 	<template v-slot:header> 
			<h5 class="modal-title"> Histórico mais recente do item </h5>
		</template>
	    <template v-slot:body>
			<TablesHistory />
		</template>
		<template v-slot:footer> 
			<div class="container-fluid d-flex justify-content-center align-items-center">
				<button class="btn btn-warning" data-bs-dismiss="modal"> Voltar </button>
			</div>
		</template>
	</Modal>
</template>

<script>
export default{
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
