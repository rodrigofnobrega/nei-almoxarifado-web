<template>
	<div class="container-fluid singup-container d-flex  col-1 justify-content-center" :class="{ 'blurred': errorPassword }">

		<div class="header">

			<p class="texto"><strong>Cadastre-se</strong></p>

		</div>
		<form class="singup-form" @submit.prevent="submitForm">

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

	<span v-if="errorPassword" class="error-message">
		A senha está incorreta, tente novamente.
		<button @click="resetPassForm">Ok</button>
	</span>

</template>

<script setup lang="ts"> 


import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'authentication'
});

// Variáveis reativas para armazenar os valores dos campos	
const username = ref('');
const email = ref('');
const password = ref('');
const rePassword = ref('');

const errorPassword = ref(false);




const submitForm = () => {
	// Visualização dos valores armazenados
	console.log('Usuário:', username.value);
	console.log('Email:', email.value);
	console.log('Senha:', password.value);
	console.log('Confirmação de Senha:', rePassword.value);

	// Verificação da senha
	if (password.value != rePassword.value) {
		console.log("A confirmação de senha não está correta")
		errorPassword.value = true;
	}
	else {
		console.log(`Usuário ${username.value} foi cadastrado!`);

		username.value = '';
		email.value = '';
		password.value = '';
		rePassword.value = '';
	}

	// Aqui está uma maneira de confirmar que ao enviar os dados preenchidos, 
	// eles serão salvos em alguma variável. E assim, está para ser inserida a
	// lógica por tras dos panos para fazer a pessoa entrar ou não.

}

// Método para cleanar o formulário
const resetPassForm = () => {
  password.value = '';
  rePassword.value = '';
  errorPassword.value = false;
};

</script>

<style scoped>

.blurred {
	filter: blur(1.5px);
}

.error-message {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 330px;
	padding: 11px;
	text-align: center;
	background-color: #0B3B69;
	border-radius: 5px;
	color: #ffffff;
	font-weight: bold;
	}

.error-message button {
	width: 100%;
	margin-left: 0px;
	margin-top: 7px;
	padding: 0px;
	background-color: rgba(200, 0, 0);
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.error-message button:hover {
  background-color: #ff3333; /* Altera a cor do botão quando hover */
}

.container-fluid {
	padding: 0px;
}

.singup-container{
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

.singup-form {
	margin-top: 0px;
	margin-left: 10px;
	margin-right: 10px;
	margin-bottom: 0px;
}

.singup-form label {
	display: block;
	margin-bottom: 5px;
}

.singup-form input[type="text"],
.singup-form input[type="password"] {
	width: 100%;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-bottom: 10px;
}

.singup-form button {
	width: 100%;
	padding: 10px;
	background-color: #71DD67;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.singup-form button:hover {
	background-color: #71DD90;
}

</style>