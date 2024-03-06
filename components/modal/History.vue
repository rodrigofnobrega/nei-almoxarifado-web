<script setup> </script>

<template>

<ModalLargeModal>
 	<template v-slot:header> <h5 class="modal-title"> Histórico mais recente do item </h5> </template>
        <template v-slot:body>
		<TablesHistory />
	</template>
	<template v-slot:footer> 
		<button class="btn btn-warning" data-bs-dismiss="modal"> Voltar </button>
	</template>

</ModalLargeModal>
</template>

<style scoped>
</style>

