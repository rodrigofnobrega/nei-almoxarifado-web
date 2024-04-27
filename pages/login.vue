<template>
	<div class="container-fluid login-container d-flex  col-1 justify-content-center">
		<div class="header">
			<p class="texto"><strong>Entrar</strong></p>
		</div>
		<form class="login-form" @submit.prevent="submitForm">
			<label for="username">Usuário:</label>
			<input type="text" id="username" v-model="username" required>
			<label for="password">Senha:</label>
			<input type="password" id="password" v-model="password" required>
			<button type="submit">Entrar</button>
		</form>
		<div class="info">
			
			<p><a href="#">Esqueceu sua senha?</a></p>
			<NuxtLink to="/cadastro">Ainda não tem uma conta? Cadastre-se aqui.</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts"> 
definePageMeta({
  layout: 'login'
})

import { ref } from 'vue';
	
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
	max-width: 300px;
	height: 65px;
	border-radius: 15px;
	opacity: 0px;
	background-color: #0B3B69;
	color: #ffff;
	margin-top: 0px;
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
	width: 100%;
	padding: 10px;
	background-color: #71DD67;
;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.info {
	margin-top: 20px;
	text-align: center;
}

.info a {
	color: #007bff;
	text-decoration: none;
}

.info a:hover {
	text-decoration: underline;
}
</style>