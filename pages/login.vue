<template>
    <LoadersPageLoading :isLoading="loading" class="loader"/>
	<div class="container-fluid bg-light-emphasis login-container d-flex  col-1 justify-content-center">
		<div class="header d-flex justify-content-center align-items-center">
			<p class="texto fw-bold">Entrar</p>
		</div>
		<form class="login-form" @submit.prevent="submitForm">
			<label for="email">Email:</label>
			<input :class="email && !isValidEmail(email) ? 'border-dark-alert' : ''" type="text" id="email" placeholder="Seu email" v-model="email" required>
			<p class="fw-bold text-dark-alert mb-2 mt-0 d-flex align-items-center" v-if="email && !isValidEmail(email)">
				<IconsInformation class="me-1"/>
				E-mail inválido
			</p>
			<label for="password">Senha:</label>
			<input type="password" id="password" placeholder="Sua senha" v-model="password" required>
			<p class="fw-bold text-dark-alert mb-2 mt-0 d-flex align-items-center" v-if="!password && isValidEmail(email)">
				<IconsInformation class="me-1"/>
				Coloque a senha
			</p>
			<button :class="!isValidEmail(email) || !password ? 'disabled-button' : ''" :disabled="!isValidEmail(email) || !password" id="submitLogin" class="fw-bold disabled" type="submit">Entrar</button>
		</form>
		<div class="info">
			<NuxtLink to="/emailAuth">Esqueceu sua senha?</NuxtLink>
			<br>
			<NuxtLink to="/cadastro">Ainda não tem uma conta? Cadastre-se aqui.</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts"> 
definePageMeta({
  layout: 'authentication'
});

import { ref, onMounted } from 'vue';
import { useUser } from '../stores/user.ts';
import { onBeforeRouteLeave } from 'vue-router';

const userStore = useUser();
const email = ref('');
const password = ref('');

const submitForm = () => {
	userStore.fetchData(password.value, email.value);
};

const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
}

const loading = ref(false)
onBeforeRouteLeave(() => {
	loading.value = true
})
</script>

<style scoped>
.loader{
	top: 0px;
}
.container-fluid {
	padding: 0px;
}
.disabled-button {
  opacity: 75%;
  cursor: not-allowed !important;
}
.login-container{
	margin-top: 80px;
	border-radius: 15px;
	
	width: 110%;
	flex-direction: column;
}

.texto {
	margin: 20px 0px 20px;
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

.login-form {
	margin-top: 10px;
	margin-left: 10px;
	margin-right: 10px;
	padding: 12px;

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
	padding: 11px;
	background-color: #71DD67;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.info {
	margin-top: 20px;
	padding: 12px;
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
</style>