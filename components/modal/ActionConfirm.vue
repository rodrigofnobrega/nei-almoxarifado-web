<script setup> </script>

<template>
	<Modal>
		<template v-slot:header>
			<h5 class="modal-title"> Confirmação de ação </h5>
			<IconsClose class="close mt-1 ms-5 s-5" width="1.7em" height="1.7em"/>
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

