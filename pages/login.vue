<template>
	<div class="container-fluid login-container d-flex  col-1 justify-content-center">
		<div class="header">
			<p class="texto"><strong>Entrar</strong></p>
		</div>
		<form class="login-form" @submit.prevent="submitForm">
			<label for="email">Email:</label>
			<input type="text" id="email" v-model="email" required>
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
  layout: 'authentication'
});
import { ref } from 'vue';
import { useUser } from '../stores/user.ts'

const userStore = useUser()
const email = ref('');
const password = ref('');

console.log("funcionando normal");

const submitForm = () => {
	userStore.setData(password.value, email.value)
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