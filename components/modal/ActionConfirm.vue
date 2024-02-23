<script setup> </script>

<template>
	<Modal>
		<template v-slot:header>
			<h5 class="modal-title"> Confirmação de ação </h5>
			<button type="button" class="btn-close" data-bs-dismiss="modal"/>
		</template>
		<template v-slot:body>
			<slot name="text" />
		</template>
		<template v-slot:footer>
			<div class=""> 
				<slot name="buttons" />
			</div>
		</template>
	</Modal>
</template>

<style scoped>

</style>

