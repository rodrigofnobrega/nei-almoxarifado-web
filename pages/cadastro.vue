<template>
	<div class="container-fluid login-container d-flex  col-1 justify-content-center">
		<div class="header">
			<p class="texto"><strong>Cadastre-se</strong></p>
		</div>
		<form class="login-form" @submit.prevent="submitForm">
			<label for="username">Usuário:</label>
			<input type="text" id="username" v-model="username" required>
			<label for="username">Email:</label>
			<input type="text" id="username" v-model="username" required>
			<label for="password">Senha:</label>
			<input type="password" id="password" v-model="password" required>
			<label for="password">Confirme sua Senha:</label>
			<input type="password" id="password" v-model="password" required>
			<button type="submit">Cadastrar</button>
		</form>
	</div>
</template>

<script setup lang="ts"> 


import { ref } from 'vue';

definePageMeta({
  layout: 'authentication'
});
	
const username = ref('');
const password = ref('');

const submitForm = () => {
	console.log('Usuário:', username.value);
	console.log('Senha:', password.value);
	// Aqui está uma maneira de confirmar que ao enviar os dados preenchidos, 
	// eles serão salvos em alguma variável. E assim, está para ser inserida a
	// lógica por tras dos panos para fazer a pessoa entrar ou não.
	
	
	username.value = '';
	password.value = '';
}

</script>

<style scoped>
.container-fluid {
	padding: 0px;
}

.login-container{
	width: 325px;
	flex-direction: column;
}
.texto {
	display: flex;
	margin: 20px 10px 10px;
	font-weight: 500;
	font-size: 20px;
	justify-content: space-around;
}

.header {
	width: 100%;
	max-width: 325px;
	height: 65px;
	border-radius: 15px 15px 0px 0px;
	opacity: 0px;
	background-color: #0B3B69;
	color: #ffff;
	margin-top: 0px;
	margin-bottom: 18px
}

.login-form {
	margin-top: 20px;
	margin-left: 10px;
	margin-right: 10px;
}

.login-form label {
	display: block;
	margin-bottom: 5px;
}

.login-form input[type="text"],
.login-form input[type="password"] {
	width: 100%;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-bottom: 10px;
}

.login-form button {
	width: 200px;
	padding: 1px;
	background-color: #71DD67;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

</style>