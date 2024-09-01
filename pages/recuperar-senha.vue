<template>
    <LoadersPageLoading :isLoading="loading" class="loader"/>
	<div class="d-flex justify-content-center  bg-primary auth-container">
		<div class="container-fluid login-container d-flex justify-content-center" :class="{'login-movement': switchState}"  :style="{'border-radius': delayedSwitchState ? '0px 8px 8px 0px' : '8px 0px 0px 8px'}">
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
					class="fw-bold mt-4 disabled auth-btn" 
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
					class="fw-bold mt-3 disabled auth-btn" 
					type="submit">
					Verificar
				</button>
			</form>
			<div class="info">
				<a class="text-light text-decoration-underline" href="/login">Voltar para o login.</a>
				<br class="mb-2">
				<div>

					<a class="text-light text-decoration-underline" href="mailto:almoxarifado957@gmail.com">Dúvidas? Clique aqui para contato.</a>
				</div>
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
      const emailRegex = /^[^\s@]+@ufrn\.edu\.br$/;
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
		return 0;
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
.login-movement{
	transform: translateX(94.52%);
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
.mobile-form{
	display: none;
}
.label-focus {
	top: 0;
	font-size: 12px;
	background-color: #fff; /* Ajuste conforme necessário */
	padding: 0 5px;
}
.mobile-btn{
	display: none;
}
@keyframes leaveDisplay{
	0% { display: none;}
	50% { display: none; }
	100% { display: block;}
}
@keyframes returnDisplay{
	0% { display: none;}
	50% { display: none; }
	100% { display: block;}
}
@keyframes leaveOpacity {
	0% { opacity: 100%; }		
	50% { opacity: 0%; }
	100% { opacity: 100%; }
}
@keyframes returnOpacity {
	0% { opacity: 100%; }		
	50% { opacity: 0%; }
	100% { opacity: 100%; }
}
@media screen and (max-width: 680px){
	.auth-container{
		width: 90%;
	}
	.login-content{
		margin-bottom: 70px;
	}
	.info-container{
		display: none !important;
	}
	.info-container p, h2{
		display: none !important;
	}
	.login-movement{
		transform: translateX(0px);
	}
	.mobile-form{
		border-radius: 8px;
		display: block;
		top: 0;
		right: 0;
		transition: height 1s ease-in-out, width 1s ease-in-out;
		z-index: -1;
	}
	.mobile-btn{
		border-radius: 10px 10px 0px 0px;
		display: block;
		bottom: 0; 
		left: 35%; 
		width: 100px;
	}
	.mobile-btn:focus{
		background-color: transparent;
		color: #FED51E;
	}
	@keyframes leaveText {
		0% { transform: translateX(0%); }		
		50% { transform: translateX(140%); }	
		100% { transform: translateX(0%); }
	}
	@keyframes returnText {
		0% { transform: translateX(0%); }		
		50% { transform: translateX(-140%); }
		100% { transform: translateX(0%); }
	}
	.leave-op{
		animation: leaveDisplay 2s;
	}
	.return-op{
		animation: returnDisplay 2s;
	}
	.leave-text{
		animation: leaveText 1.7s, leaveOpacity 1.9s;
	}
	.return-text{
		animation: returnText 1.7s, returnOpacity 1.9s;
	}
	.login-container{
		overflow: hidden !important;
	}
	.auth-btn{
		margin-bottom: 30px;
		margin-top: 12px !important;
	}
	.login-form{
		margin-left: 10px;
		margin-right: 10px;
		padding-left: 2px;
		padding-right: 2px;
	}
	.texto{
		font-size: 37px !important;
	}
	.info{
		margin-top: 2px !important;
		font-size: 18px;
	}
}
</style>
