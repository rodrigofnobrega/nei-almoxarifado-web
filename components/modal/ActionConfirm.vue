<template>
	<Modal id="actionConfirm">
		<template v-slot:header>
			<h6 class="modal-title"> Confirmar ação </h6>
			 <button class="btn btn-transparent text-light close-btn" type="button" data-bs-dismiss="modal">
                <IconsClose class="close ms-5 s-5" width="1.3em" height="1.3em"/>
            </button>
		</template>
		<template v-slot:body>
			<slot name="text" />
		</template>
		<template v-slot:footer>
			<div class="container-fluid d-flex justify-content-center align-items-center">
				<slot name="buttons" />
            </div>
		</template>
	</Modal>
</template>

<script setup>


</script>

<style scoped>
.close-btn{
	padding: 0;
	margin: 0;
	border: none;
}
</style>

