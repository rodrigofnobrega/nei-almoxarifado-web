<template>
    <LoadersPageLoading :isLoading="loading" class="loader"/>
	<div class="d-flex justify-content-center  bg-primary auth-container">
		<div class="container-fluid login-container d-flex justify-content-center" :style="{'transform': switchState ? 'translateX(94.52%)' : '', 'border-radius': delayedSwitchState ? '0px 8px 8px 0px' : '8px 0px 0px 8px'}">
			<div class="header d-flex justify-content-center align-items-center">
				<p v-if="delayedSwitchState === false" class="texto text-light">Recuperar Senha</p>
				<p v-else class="texto text-light">Verificar Código</p>
			</div>
			<form v-if="delayedSwitchState === false" class="login-form mt-4" @submit.prevent="forgetPassword">
				<div class="form-group">
					<div class="input-container">
						<input 
							:class="{'border-dark-alert border-2': email && !isValidSimpleEmail(email)}"
							type="email" 
							id="email"  
							v-model="email" 
							required
							@focus="isEmailFocused = true"
							@blur="isEmailFocused = false"
							placeholder="">
					<label class="fw-bold rounded-1" :class="{'label-focus': isEmailFocused || email, 'text-light-alert': email && !isValidSimpleEmail(email)  }" for="email">{{email && !isValidSimpleEmail(email) ? 'Email inválido' : 'Email:'}}</label>
					</div>
				</div>
				<button 
					:class="!isValidSimpleEmail(email)  ? 'disabled-button' : ''" 
					:disabled="!isValidSimpleEmail(email)" 
					id="forgetPassword" 
					class="fw-bold mt-4 disabled" 
					type="submit"
					>
					Enviar
				</button>
			</form>
			<form v-else-if="isSubmited" class="login-form mt-3" @submit.prevent="validateToken">
				<div class="form-group">
					<div class="input-container">
						<input 
							type="text" 
							id="token"  
							v-model="token" 
							required
							@focus="isTokenFocused = true"
							@blur="isTokenFocused = false"
							placeholder="">
					<label class="fw-bold rounded-1" :class="{'label-focus': isTokenFocused || token }" for="token">Código de verificação:</label>
					</div>
				</div>
				<button 
					:class="!token ? 'disabled-button' : ''" 
					:disabled="!token" 
					id="validateToken" 
					class="fw-bold mt-3 disabled" 
					type="submit">
					Verificar
				</button>
			</form>
			<div class="info">
				<a class="text-light text-decoration-underline" href="/login">Voltar para o login.</a>
				<br class="mb-2">
				<a class="text-light text-decoration-underline" href="mailto:almoxarifado957@gmail.com">Dúvidas? Clique aqui para contato.</a>
			</div>
		</div>

		<div class="container bg-warning info-container d-flex align-items-center justify-content-center" :style="{'transform': switchState ? 'translateX(-106%)' : '', 'border-radius': delayedSwitchState ? '8px 0px 0px 8px' : '0px 8px 8px 0px'}">
			<div class="text-center mb-5">
				<h2 class="fw-bolder mb-3">{{ delayedSwitchState ?  'Falta pouco!' : 'Vamos lá!'}}</h2>
				<div class=" text-center">				
					<p class="text-center fs-6 fw-bold">
						{{ delayedSwitchState ?  'Verifique sua caixa de email e coloque o exato código enviado.': 'Para recuperar sua senha digite seu email para que enviemos um código de verificação.' }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'authentication'
});

import { ref } from 'vue';
import { useUser } from '../stores/user.ts';
import { onBeforeRouteLeave } from 'vue-router';
import { navigateTo } from 'nuxt/app';
import { usePopupStore } from '../stores/popup.ts';
import { forgotPasswordAUTH, recoveryTokenAUTH } from '../services/auth/authPOST.ts';
import { useStorageStore } from '../stores/storage.ts';

const store = useStorageStore();
const userStore = useUser();
const popUpStore = usePopupStore();

const email = ref('');
const token = ref('');  

const isSubmited = ref(false);

const isEmailFocused = ref(false);
const isTokenFocused = ref(false);

const switchState = ref(false);
const delayedSwitchState = ref(false);

const switchAuth = async () => {
    switchState.value = !switchState.value;
    await new Promise(resolve => setTimeout(resolve, 370)); 
    delayedSwitchState.value = !delayedSwitchState.value;
};
const isValidSimpleEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
}
const isValidEmail = (email) => {
	  const emailRegex = /^[^\s@]+@ufrn\.edu\.br$/;
      return emailRegex.test(email);
};


const resetSubmit = () => {
    token.value = '';
}

const forgetPassword = async () => {
	try{
		const res = await forgotPasswordAUTH(email.value);
		popUpStore.throwPopup('Código de verificação enviado para o destinatário', 'blue');
		isSubmited.value = true;
		switchAuth();
	} catch(err){
		popUpStore.throwPopup('ERRO: Algum problema interno ocorreu, contate a administração', 'red');
	}
}
const validateToken = async () => {
	try{
		const res = await recoveryTokenAUTH(token.value);
		popUpStore.throwPopup('Código validado com sucesso', 'blue');
	} catch(err){
		popUpStore.throwPopup('ERRO: Código de verificação inválido', 'red');
		resetSubmit();
	}
	store.recoveryToken = token.value;
	userStore.email = email.value
	navigateTo('/atualizar-senha');
}

const loading = ref(false);
onBeforeRouteLeave(() => {
	loading.value = true;
});

</script>

<style scoped>
.loader {
	top: 0px;
}
.container-fluid {
	padding: 0px;
}
.disabled-button {
  opacity: 75%;
  cursor: not-allowed !important;
  opacity: 40%;
}
.auth-container {  
	box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 1) !important;
	margin-top: 50px;	
	width: 650px;
	height: 450px;
	border-radius: 8px;
}
.inset-shadow{
	box-shadow: inset 0px 0px 80px 0px rgba(0, 0, 0, 0.3);
}
.login-container {
	width: 110%;
	flex-direction: column;
	transition: transform 0.7s ease-in-out;
	transform: translateX(0); 
}
.info-container {	
	width: 100%;
	flex-direction: column;
	transition: transform 0.7s ease-in-out;
	transform: translateX(0); 
}
.texto {
	margin: 40px 0px 20px;
	font-size: 32px;
	font-weight: bold;
}

.header {
	width: 100%;
	height: 65px;
	border-radius: 8px 0px 0px 0px;
	color: black;
	margin-top: 0px;
	padding: 0px;
}
.alert-text{
	z-index: 10000;
}

.login-form {
	margin-top: 1px;
	margin-left: 10px;
	margin-right: 10px;
	padding: 12px;

}

.login-form .form-group {
	position: relative;
}

.login-form .input-container {
	position: relative;
}

.login-form label {
	position: absolute;
	left: 12px;
	color: rgb(0, 0, 0, 0.5);
	top: 40%;
	transform: translateY(-50%);
	transition: all 0.3s ease;
	pointer-events: none;
}

.login-form input[type="email"],
.login-form input[type="password"],
.login-form input[type="text"] {
	width: 100%;		
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-bottom: 10px;
}

.login-form .input-container:focus-within label {
	top: 0;
	font-size: 12px;
	background-color: #fff;
	padding: 0 5px;
}
.login-form input:not(:placeholder-shown) + label{
	top: 0;
	font-size: 12px;
	background-color: #fff; 
	padding: 0 5px;
}

.login-form button {
	width: 100%;
	padding: 11px;
	background-color: #31c939;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}
.sign-up-btn{
	padding: 11px;
	width: 100%;
}
.info {
	margin-top: 10px;
	margin-bottom: 10px;
	padding: 0px;
	text-align: center;
}

.info a {
	color: #007bff;
	text-decoration: none;
}

.info a:hover {
	text-decoration: underline;
}

.login-form button:hover {
	background-color: #71DD90;
}

.label-focus {
	top: 0;
	font-size: 12px;
	background-color: #fff; /* Ajuste conforme necessário */
	padding: 0 5px;
}
</style>
