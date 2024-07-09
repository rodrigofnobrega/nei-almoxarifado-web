<template>
	<div class="container-fluid bg-light-emphasis auth-container d-flex  col-1 justify-content-center" :class="{ 'blurred': isSubmitOn || tokenError }">
		<div class="header d-flex align-items-center justify-content-center">
			<p class="texto fw-bold">Recuperar Senha</p>
		</div>
		<div class="mx-3">
			<p v-if="!isSubmited" class="mt-3 mb-0">Para recuperar sua senha digite seu email para que enviemos um código de verificação.</p>	
			<p v-if="isSubmited" class="mt-3 mb-0">Coloque o exato código que foi enviado.</p>	
			<form class="auth-form" @submit.prevent="submitForm">
				<div class="auth">
					<div  v-if="!isSubmited" class="submit">
						<label class="fw-bold" for="email">Email:</label>
						<input type="text" id="email" placeholder="Email" v-model="email" required>
					</div>
					<p class="fw-bold text-dark-alert mb-2 mt-0 d-flex align-items-center" v-if="email && !isValidEmail(email)">
						<IconsInformation class="me-1"/>
						E-mail inválido
					</p>
					<div v-else-if="isSubmited" class="token">
						<label class="fw-bold" for="token">Código de verificação:</label>
						<input type="text" id="token" placeholder="Código" v-model="token">
					</div>
				
				</div>
				
				<button :class="!isValidEmail(email) ? 'disabled-button' : ''" :disabled="!isValidEmail(email)" class="mb-2" v-if="!isSubmited" type="submit" @click="forgetPassword">Enviar</button>
				
				<button v-else-if="isSubmited" type="submit" @click="validateToken">Ir</button>
	
			</form>
		</div>
	</div>

    <span v-if="isSubmitOn" class="pop-message">
		O código foi enviado.
		<button @click="resetOn">Ok</button>
	</span>

    <span v-if="tokenError" class="pop-error">
		O código não foi validado, tente novamente.
		<button @click="resetSubmit">Ok</button>
	</span>

</template>

<script setup lang="ts"> 

definePageMeta({
	layout: 'authentication'
	});
	
import { forgotPasswordAUTH, recoveryTokenAUTH } from '../services/auth/authPOST';
import { navigateTo } from 'nuxt/app';
import { useStorageStore } from '../stores/storage';
import { useUser } from '../stores/user';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserByEmail } from '../services/users/userGET';

const store = useStorageStore()
const userStore = useUser()
// Váriaveis responsivas que armazenam os valores dos campos acima (integrar à API)
const email = ref('');
const token = ref(''); // 
const newToken = ref('');

const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
}
// Variáveis de verificação se foi mandado ou não o código e para verificar o código
const isSubmited = ref(false);

// Váriaveis que mostrarão os Pop-Up's no envio do token ou no erro dele
const isSubmitOn = ref(false);
const tokenError = ref(false);

// Router
const router = useRouter();

// Métodos que vão fazer que a rotina aconteça
    // Envio do email

    // Tirar pop-up de envio
const resetOn = () => {
    isSubmitOn.value = false;
}

const resetSubmit = () => {
    newToken.value = '';
    tokenError.value = false;

}

const forgetPassword = async () => {
	const res = await forgotPasswordAUTH(email.value);
	//const res = await forgotPasswordPUT(1, recoveryToken.data, 121212, 121212)
	if (email.value != '') {
		console.log(`O token foi enviado para ${email.value}.`);
		isSubmitOn.value = true;
		isSubmited.value = true;  
	}
}
const validateToken = async () => {
	const res = await recoveryTokenAUTH(token.value);
	store.recoveryToken = token.value;
	console.log(res.data);
	userStore.email = email.value
	navigateTo('/senhaAuth');
}
</script>

<style scoped>
.blurred {
	filter: blur(1.5px);
}

.pop-message {
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

.pop-message button {
	width: 100%;
	margin-left: 0px;
	margin-top: 7px;
	padding: 0px;
	background-color: rgba(0, 0, 150);
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.pop-message button:hover {
  background-color: #3333ff; /* Altera a cor do botão quando hover */
}

.pop-error {
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

.pop-error button {
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

.pop-error button:hover {
  background-color: #ff3333; /* Altera a cor do botão quando hover */
}
.disabled-button {
  opacity: 75%;
  cursor: not-allowed !important;
}
.container-fluid {
	padding: 0px;

}

.auth-container{
	border-radius: 15px;
	width: 120%;
	flex-direction: column;
    margin-top: 30px;
}
.auth {
    padding-bottom: 10px;
    justify-content: space-around;
}

.texto {
	margin: 20px 0px 20px !important;
	font-weight: 500;
	font-size: 23px;
}

.header {
	width: 100%;
	height: 65px;
	border-radius: 15px 15px 0px 0px;
	background-color: #0B3B69;
	color: #ffff;
	margin-top: 0px;
	padding: 0px;
}


.auth-form {
	margin: 10px 0px 10px 0px;
}

.auth-form label {
	display: block;
	margin-bottom: 5px;
}

.auth-form input[type="text"] {
	width: 100%;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-bottom: 10px;
}


.auth-form button {
	width: 100%;
	padding: 11px;
	background-color: #71DD67;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}
</style>