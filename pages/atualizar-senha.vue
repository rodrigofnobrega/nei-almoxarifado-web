<template>
    <LoadersPageLoading :isLoading="loading" class="loader"/>
	<div class="d-flex justify-content-center  bg-primary auth-container">
		<div class="container-fluid login-container d-flex justify-content-center">
			<div class="header d-flex justify-content-center align-items-center">
				<p class="texto text-light">Atualizar Senha</p>
			</div>
			<form class="login-form mt-4" @submit.prevent="verifyPassword">
				<div class="form-group">
					<div class="input-container">
						<div class="d-flex align-items-center justify-content-end">
							<input 
								:class="{'border-dark-alert border-2': newPassword && newPassword.length < 6}"
								:type="showPassword[0] ? 'text' : 'password'" 
								id="newPassword"  
								v-model="newPassword" 
								required
								@focus="isPasswordFocused = true"
								@blur="isPasswordFocused = false"
								placeholder="">
							<label class="fw-bold rounded-1" :class="{'label-focus': isPasswordFocused || newPassword, 'text-light-alert': newPassword && newPassword.length < 6}" for="newPassword">{{newPassword && newPassword.length < 6 ? 'Senha deve ser de 6 a mais caracteres' : 'Nova senha:'}}</label>
							<IconsOpenEye v-if="!showPassword[0]" @click="showPassword[0] = !showPassword[0]" class="position-absolute me-2 mb-2 text-light-emphasis" width="25" height="40"/>
							<IconsCloseEye v-if="showPassword[0]" @click="showPassword[0] = !showPassword[0]" class="position-absolute me-2 mb-2 text-light-emphasis" width="25" height="40"/>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="input-container">
						<div class="d-flex align-items-center justify-content-end">
							<input 
								:class="{'border-dark-alert border-2': newRePassword && newRePassword !== newPassword}"
								:type="showPassword[1] ? 'text' : 'password'" 
								id="newRePassword"  
								v-model="newRePassword" 
								required
								@focus="isRePasswordFocused = true"
								@blur="isRePasswordFocused = false"
								placeholder="">
							<label class="fw-bold rounded-1" :class="{'label-focus': isRePasswordFocused || newRePassword, 'text-dark-alert': newRePassword && newRePassword !== newPassword}" for="newRePassword">{{newRePassword && newRePassword !== newPassword ? 'As senhas não conferem' : 'Confirmar senha:'}}</label>
							<IconsOpenEye v-if="!showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 mb-2 text-light-emphasis" width="25" height="40"/>
							<IconsCloseEye v-if="showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 mb-2 text-light-emphasis" width="25" height="40"/>
						</div>
					</div>
				</div>
				<button 
					:class="!newPassword || newPassword.length < 6 || !newRePassword || newPassword != newRePassword  ? 'disabled-button' : ''" 
					:disabled="!newPassword || newPassword.length < 6 || !newRePassword || newPassword != newRePassword" 
					id="verifyPassword" 
					class="fw-bold mt-4 disabled" 
					type="submit"
					>
					Atualizar
				</button>
			</form>
			<div class="info">
				<a class="text-light text-decoration-underline" href="/login">Voltar para o login.</a>
				<br class="mb-2">
				<a class="text-light text-decoration-underline" href="mailto:almoxarifado957@gmail.com">Dúvidas? Clique aqui para contato.</a>
			</div>
		</div>
		<div class="container bg-warning info-container d-flex align-items-center justify-content-center">
			<div class="text-center mb-5">
				<h2 class="fw-bolder mb-3">Para finalizar!</h2>
				<div class=" text-center">				
					<p class="text-center fs-6 fw-bold">
						Digite uma nova senha forte e confirme-a para recuperar a conta
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
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { usePopupStore } from '../stores/popup.ts';
import { useStorageStore } from '../stores/storage.ts';
import { forgotPasswordPUT } from '../services/users/userPUT.ts';

const store = useStorageStore();
const userStore = useUser();
const popUpStore = usePopupStore();

const newPassword = ref('');
const newRePassword = ref(''); 

const showPassword = ref([false, false, false]);

const router = useRouter();

const isPasswordFocused = ref(false);
const isRePasswordFocused = ref(false);

const verifyPassword = async () => {
    if (newPassword.value === newRePassword.value) {
		try{
			const res = await forgotPasswordPUT(userStore.email, store.recoveryToken, newPassword.value, newRePassword.value)
			popUpStore.throwPopup('Nova senha atualizada com sucesso', 'blue');
			router.push('/login');
		}catch(err){
			popUpStore.throwPopup('ERRO: Código expirado, tente novamente.', 'red');
		}
	}
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
		margin-top: 15px !important;
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
