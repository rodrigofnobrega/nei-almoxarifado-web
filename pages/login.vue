<template>
    <LoadersPageLoading :isLoading="loading" class="loader"/>
	<div class="d-flex justify-content-center  bg-primary auth-container">
		<div class="container-fluid login-container d-flex justify-content-center" :style="{'transform': switchState ? 'translateX(94.52%)' : '', 'border-radius': delayedSwitchState ? '0px 8px 8px 0px' : '8px 0px 0px 8px'}">
			<div class="header d-flex justify-content-center align-items-center">
				<p v-if="delayedSwitchState === false" class="texto text-light">Entrar</p>
				<p v-else class="texto text-light">Cadastrar</p>
			</div>
			<form v-if="delayedSwitchState === false" class="login-form mt-4 " @submit.prevent="submitLogin">
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
				<div class="form-group">
					<div class="input-container">
						<div class="d-flex align-items-center justify-content-end">
							<input 
								:class="{'border-dark-alert border-2': !password && email}"
								id="password" 
								:type="showPassword[0] ? 'text' : 'password'" 
								v-model="password" 
								required
								@focus="isPasswordFocused = true"
								@blur="isPasswordFocused = false"
								placeholder="">
							<label class="fw-bold rounded-1" :class="{'label-focus': isPasswordFocused || password, 'text-light-alert': !password && email}" for="password">{{ !password && email ? 'Digite a senha' : 'Senha:'}}</label>
							<IconsOpenEye v-if="!showPassword[0]" @click="showPassword[0] = !showPassword[0]" class="position-absolute me-2 mb-2 text-light-emphasis" width="25" height="40"/>
							<IconsCloseEye v-if="showPassword[0]" @click="showPassword[0] = !showPassword[0]" class="position-absolute me-2 mb-2 text-light-emphasis" width="25" height="40"/>
						</div>
					</div>
				</div>
				<button 
					:class="!isValidSimpleEmail(email) || !password ? 'disabled-button' : ''" 
					:disabled="!isValidSimpleEmail(email) || !password" 
					id="submitLogin" 
					class="fw-bold mt-4 auth-btn disabled" 
					type="submit"
				>
					Entrar
				</button>
			</form>
			<form v-else class="login-form mt-2" @submit.prevent="submitRegister">
				<div class="form-group">
					<div class="input-container">
						<input
							type="text" 
							id="username" 
							v-model="username"  
							required
							@focus="isUserFocused = true"
							@blur="isUserFocused = false"
							placeholder="">
							<label class="fw-bold rounded-1" :class="{'label-focus': isUserFocused || username}" for="username">Usuário:</label>
					</div>
				</div>
				<div class="form-group">
					<div class="input-container">
						<input 
							:class="{'border-dark-alert border-2': email && !isValidEmail(email)}"
							type="email" 
							id="email"  
							v-model="email" 
							required
							@focus="isEmailFocused = true"
							@blur="isEmailFocused = false"
							placeholder="">
					<label class="fw-bold rounded-1" :class="{'label-focus': isEmailFocused || email, 'text-light-alert': email && !isValidEmail(email)  }" for="email">{{email && !isValidEmail(email) ? 'Email inválido' : 'Email:'}}</label>
					</div>
				</div>
				<div class="form-group">
					<div class="input-container">
						<div class="d-flex align-items-center justify-content-end">
							<input 
								:class="{'border-dark-alert border-2': password && password.length < 6}"
								:type="showPassword[1] ? 'text' : 'password'" 
								id="password"  
								v-model="password" 
								required
								@focus="isPasswordFocused = true"
								@blur="isPasswordFocused = false"
								placeholder="">
							<label class="fw-bold rounded-1" :class="{'label-focus': isPasswordFocused || password, 'text-light-alert': password && password.length < 6}" for="password">{{password && password.length < 6 ? 'Senha deve ser de 6 a mais caracteres' : 'Senha:'}}</label>
							<IconsOpenEye v-if="!showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 mb-2 text-light-emphasis" width="25" height="40"/>
							<IconsCloseEye v-if="showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 mb-2 text-light-emphasis" width="25" height="40"/>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="input-container">
						<div class="d-flex align-items-center justify-content-end">
							<input 
								:class="{'border-dark-alert border-2': rePassword && rePassword !== password}"
								:type="showPassword[2] ? 'text' : 'password'" 
								id="rePassword"  
								v-model="rePassword" 
								required
								@focus="isRePasswordFocused = true"
								@blur="isRePasswordFocused = false"
								placeholder="">
							<label class="fw-bold rounded-1" :class="{'label-focus': isRePasswordFocused || rePassword, 'text-dark-alert': rePassword && rePassword !== password}" for="rePassword">{{rePassword && rePassword !== password ? 'As senhas não conferem' : 'Confirmar senha:'}}</label>
							<IconsOpenEye v-if="!showPassword[2]" @click="showPassword[2] = !showPassword[2]" class="position-absolute me-2 mb-2 text-light-emphasis" width="25" height="40"/>
							<IconsCloseEye v-if="showPassword[2]" @click="showPassword[2] = !showPassword[2]" class="position-absolute me-2 mb-2 text-light-emphasis" width="25" height="40"/>
						</div>
					</div>
				</div>
				<button 
					:class="!isValidEmail(email) || rePassword !== password || password.length < 6 ? 'disabled-button' : ''" 
					:disabled="!isValidEmail(email) || rePassword !== password || password.length < 6" 
					id="submitLogin" 
					class="fw-bold auth-btn mt-4 disabled" 
					type="submit">
					Cadastrar
				</button>
			</form>
			<div class="info">
				<NuxtLink class="text-light text-decoration-underline" to="/recuperar-senha">Esqueceu sua senha?</NuxtLink>
				<br class="mb-2">
				<a class="text-light text-decoration-underline" href="mailto:almoxarifado957@gmail.com">Dúvidas? Clique aqui para contato.</a>
			</div>
		</div>

		<div class="container bg-warning info-container d-flex align-items-center justify-content-center" :style="{'transform': switchState ? 'translateX(-106%)' : '', 'border-radius': delayedSwitchState ? '8px 0px 0px 8px' : '0px 8px 8px 0px'}">
			<div class="text-center mb-5">
				<h2 class="fw-bolder mb-3">{{ delayedSwitchState ?  'Vamos lá!' : 'Bem-vindo!'}}</h2>
				<div class=" text-center">				
					<p class="text-center fs-6 fw-bold">
						{{ delayedSwitchState ? 'Digite corretamento os dados' : 'Ainda não possui uma conta?' }}
						<br> 
						{{delayedSwitchState ? 'e verifique o endereço e-mail correto' : 'Cadastre-se:' }}
					</p>
					<button class="btn sign-up-btn auth-btn btn-light-alert text-light fw-bold" style="margin-left: 3px;" @click="switchAuth">
						{{delayedSwitchState ? 'Entrar' : 'Cadastrar'}}
					</button>
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
import { postUser } from '../services/users/userPOST.ts';
import { navigateTo } from 'nuxt/app';
import { usePopupStore } from '../stores/popup.ts';

const userStore = useUser();
const popUpStore = usePopupStore();

const username = ref('');
const email = ref('');
const password = ref('');
const rePassword = ref('');

const showPassword = ref([false, false, false]);

const isEmailFocused = ref(false);
const isPasswordFocused = ref(false);
const isUserFocused = ref(false);
const isRePasswordFocused = ref(false);

const switchState = ref(false);
const delayedSwitchState = ref(false);

const switchAuth = async () => {
    switchState.value = !switchState.value;
    await new Promise(resolve => setTimeout(resolve, 370)); 
    delayedSwitchState.value = !delayedSwitchState.value;
};

const isValidSimpleEmail = (email) => {
	  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
};
const isValidEmail = (email) => {
	  const emailRegex = /^[^\s@]+@ufrn\.edu\.br$/;
      return emailRegex.test(email);
};

const loading = ref(false);
const submitLogin = async () => {
	const authData = await userStore.fetchData(password.value, email.value);
	authData === 1 ? loading.value = true : 0;
};


const submitRegister = async () => {
	try{
		const res = await postUser(username.value, email.value, password.value)
		popUpStore.throwPopup('Sucesso ao se cadastrar', '#0B3B69')
		switchAuth();
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
@media screen and (max-width: 680px){
	.auth-container{
		width: 90%;
	}
	.login-form{
		margin-left: 2px;
		padding-left: 2px;
		margin-right: 2px;
		padding-right: 2px;
	}
	.texto{
		margin-bottom: 0px !important;
		font-size: 26px !important;
	}
	.input-container{
		font-size: 14px;
	}
	.auth-btn{
		width: 90%;
		padding: 8px 1px 8px 1px!important;
		font-size: 13px;
	}
	.info{
		font-size: 14px;
	}
}
</style>
