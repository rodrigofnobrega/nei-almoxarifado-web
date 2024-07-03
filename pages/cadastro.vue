<template>
	<div class="bg-light-emphasis container-fluid singup-container d-flex col-1 justify-content-center" :class="{ 'blurred': errorPassword }">
		<div class="header d-flex align-items-center justify-content-center">
			<p class="texto fw-bold">Cadastro</p>
		</div>
		<div class="mx-3">
			<p><strong>Observação:</strong> Antes de se cadastrar verifique com a administração as credenciais válidas para o cadastro.</p>
			<form class="singup-form" @submit.prevent="submitForm">
	
				<label for="username">Usuário:</label>
				<input type="text" id="username" placeholder="Nome" v-model="username" required>
	
				<label for="email">Email:</label>
				<input type="text" id="email" placeholder="Email" v-model="email" required>
				<p class="fw-bold text-dark-alert mb-2 mt-0 d-flex align-items-center" v-if="email && !isValidEmail(email)">
					<IconsInformation class="me-1"/>
					E-mail inválido
				</p>
				<label for="password">Senha:</label>
				<div class="d-flex justify-content-end">
					<input id="password" placeholder="Senha" :type="showPassword[0] ? 'text' : 'password'" v-model="password" required>
					<IconsOpenEye v-if="!showPassword[0]" @click="showPassword[0] = !showPassword[0]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
					<IconsCloseEye v-if="showPassword[0]" @click="showPassword[0] = !showPassword[0]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
				</div>
				<p class="fw-bold text-dark-alert mb-2 mt-0 d-flex align-items-center" v-if="password && password.length < 6">
					<IconsInformation class="me-1"/>
					A senha deve possuir 6 caracteres ou mais.
				</p>
				<div v-if="password && password.length >= 6">
					<label for="re-password">Confirme sua Senha:</label>
					<div class="d-flex justify-content-end">
						<input id="rePassword" placeholder="Confirmar senha" :type="showPassword[1] ? 'text' : 'password'" v-model="rePassword" required>
						<IconsOpenEye v-if="!showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
						<IconsCloseEye v-if="showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
					</div>
					<p class="fw-bold text-dark-alert mb-2 mt-0 d-flex align-items-center" v-if="rePassword && rePassword != password">
						<IconsInformation class="me-1"/>
						As senhas não conferem.
					</p>
				</div>
				<button v-if="isValidEmail(email) && rePassword === password && password.length >= 6" type="submit">Cadastrar</button>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts"> 


import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { postUser } from '../services/users/userPOST';
import { useUser } from '../stores/user';
import { navigateTo } from 'nuxt/app';
import { usePopupStore } from '../stores/popup'

definePageMeta({
  layout: 'authentication'
});

const userStore = useUser();
const popUpStore = usePopupStore()

const username = ref('');
const email = ref('');
const password = ref('');
const rePassword = ref('');




const showPassword = ref([false, false, false]);



const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@ufrn\.edu\.br$/;
      return emailRegex.test(email);
}

const submitForm = async () => {
	try{
		const res = await postUser(username.value, email.value, password.value)
		popUpStore.throwPopup('Sucesso ao se cadastrar', '#0B3B69')
		navigateTo('/login');
		return 1;
	}catch(err){
		if(!err.response){
			popUpStore.throwPopup("Erro: Servidor fora do ar contate o suporte", "#B71C1C")
		}
		switch(err.response.status){
			case 400:
				popUpStore.throwPopup('Erro: O email escolhido já está em uso', '#B71C1C')
				break;
			case 422:
				popUpStore.throwPopup('Erro: A senha deve possuir de 6 a mais caracteres', '#B71C1C')
				break;
			default:
				popUpStore.throwPopup('Erro: Algum problema ocorreu, contate o suporte', '#B71C1C')	
		}
	}
}


const resetPassForm = () => {
  password.value = '';
  rePassword.value = '';
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
	border-radius: 20px;
	width: 150%;
	margin-bottom: 100px;
	padding-bottom: 45px;
	flex-direction: column;
}
.texto {
	margin: 20px 0px 20px;
	font-weight: 500;
	font-size: 23px;
}

.header {
	width: 100%;
	max-width: 500px;
	height: 65px;
	border-radius: 15px;
	opacity: 0px;
	background-color: #0B3B69;
	color: #ffff;
	margin-top: 0px;
	margin-bottom: 18px;
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

@media screen and (max-width: 600px){
	.singup-container{
		width: 120%;
	}
}
@media screen and (max-width: 400px){
	.singup-container{
		width: 100%;
	}
}
</style>