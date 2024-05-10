<template>
	<div class="container-fluid login-container d-flex  col-1 justify-content-center">
		<div class="header">
			<p class="texto"><strong>Cadastre-se</strong></p>
		</div>
		<form class="login-form" @submit.prevent="submitForm">

			<label for="username">Usuário:</label>
			<input type="text" id="username" placeholder="Seu nome" v-model="username" required>

			<label for="email">Email:</label>
			<input type="text" id="email" placeholder="Seu email" v-model="email" required>

			<label for="password">Senha:</label>
			<input type="password" id="password" placeholder="Sua senha" v-model="password" required>

			<label for="re-password">Confirme sua Senha:</label>
			<input type="password" id="rePassword" placeholder="Confirme sua senha" v-model="rePassword" required>

			

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
const email = ref('');
const password = ref('');
const rePassword = ref('');


const submitForm = () => {
	console.log('Usuário:', username.value);
	console.log('Email:', email.value);
	console.log('Senha:', password.value);
	console.log('Confirmação de Senha:', rePassword.value);

	if (password.value != rePassword.value) {
		console.log("A confirmação de senha não está correta")
		window.alert("A senha está incorreta, tente novamente.");
		resetForm();	
	}
	else {
		username.value = '';
		email.value = '';
		password.value = '';
		rePassword.value = '';
	}

	// Aqui está uma maneira de confirmar que ao enviar os dados preenchidos, 
	// eles serão salvos em alguma variável. E assim, está para ser inserida a
	// lógica por tras dos panos para fazer a pessoa entrar ou não.

}

const resetForm = () => {
	password.value = '';
	rePassword.value = '';
}

</script>

<style scoped>
.container-fluid {
	padding: 0px;
}

.login-container{
	width: 325px;
	padding-bottom: 25px;
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
	margin-top: 0px;
	margin-left: 10px;
	margin-right: 10px;
	margin-bottom: 0px;
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
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.login-form button:hover {
	background-color: #71DD90;
}

</style>