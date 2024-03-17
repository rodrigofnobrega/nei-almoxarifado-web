<script setup> </script>

<template>
	<Modal>
		<template v-slot:header>
			<h5 class="modal-title"> Confirmação de ação </h5>
			 <button class="btn btn-transparent text-light" type="button" data-bs-dismiss="modal">
                <IconsClose class="close mt-1 ms-5 s-5" width="1.7em" height="1.7em"/>
            </button>
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
.btn{
	padding: 0;
	margin: 0;
	border: none;
}
</style>

