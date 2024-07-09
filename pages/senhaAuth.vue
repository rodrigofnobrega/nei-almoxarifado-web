<template>
	<div class="container-fluid bg-light-emphasis auth-container d-flex col-1 justify-content-center">
		<div class="header">
			<p class="texto"><strong>Recuperar Senha</strong></p>
		</div>
		<div class="mx-2">
			<p class="mt-3 mb-0">Para finalizar, digite a nova senha e confirme.</p>	
			<form class="auth-form" @submit.prevent="submitForm">
				<div class="auth">
					<label class="fw-bold" for="password">Senha:</label>
					<div class="d-flex justify-content-end">
						<input class="form-control" id="password" placeholder="Nova Senha" :type="showPassword[0] ? 'text' : 'password'" v-model="newPassword" required>
						<IconsOpenEye v-if="!showPassword[0]" @click="showPassword[0] = !showPassword[0]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
						<IconsCloseEye v-if="showPassword[0]" @click="showPassword[0] = !showPassword[0]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
					</div>
					<p class="fw-bold text-dark-alert mb-2 my-1 d-flex align-items-center" v-if="newPassword && newPassword.length < 6">
						<IconsInformation class="me-1"/>
						A senha deve possuir 6 ou mais caracteres.
					</p>	
					<div class="mt-3">
						<label class="fw-bold" for="re-password">Confirme sua Senha:</label>
						<div class="d-flex justify-content-end">
							<input class="form-control" id="rePassword" placeholder="Confirmar senha" :type="showPassword[1] ? 'text' : 'password'" v-model="newRePassword" required>
							<IconsOpenEye v-if="!showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
							<IconsCloseEye v-if="showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
						</div>
						<p class="fw-bold text-dark-alert mb-2 my-1 d-flex align-items-center" v-if="newRePassword && newPassword.length >= 6 && newRePassword != newPassword">
							<IconsInformation class="me-1"/>
							As senhas não conferem.
						</p>
					</div>
				</div>  
				<button :class="!newPassword || newPassword.length < 6 || !newRePassword || newPassword != newRePassword ? 'disabled-button' : ''" :disabled="!newPassword || newPassword.length < 6 || !newRePassword || newPassword != newRePassword " class="mb-2" type="submit" @click="verifyPassword">Enviar</button>
			</form>
		</div>
	</div>

</template>

<script setup lang="ts"> 

definePageMeta({
  layout: 'authentication'
});

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStorageStore } from '../stores/storage';
import { useUser } from '../stores/user';
import { forgotPasswordPUT } from '../services/users/userPUT';
import { usePopupStore } from '../stores/popup';

const store = useStorageStore();
const userStore = useUser()
const popUpStore = usePopupStore();
// Váriaveis responsivas que armazenam os valores dos campos acima (integrar à API)
const newPassword = ref('');
const newRePassword = ref(''); 
const isEqual = ref(true);

const showPassword = ref([false, false, false]);

// Router para voltar ao login
const router = useRouter();

// Métodos para fazer a rotina funcionar

    // Verifica se as senhas estão iguais
const verifyPassword = async () => {
    if (newPassword.value === newRePassword.value) {
		try{
			const res = await forgotPasswordPUT(userStore.email, store.recoveryToken, newPassword.value, newRePassword.value)
			router.push('/login');
		}catch(err){
			popUpStore.throwPopup('ERRO: Algum erro interno ocorreu, contate o suporte.', 'red')
			isEqual.value = false;
		}
	}
}

    // Reiniciar a rotina
const resetPassword = () => {
    isEqual.value = true;
}

</script>

<style scoped>

.showButton {
    max-width: 20px;
    max-height: 20px;
}

.showButton:hover {
    background-color: #007bff;
}
.showButton.active {
  background-color: #007bff;
}

.blurred {
	filter: blur(1.5px);
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
	width: 75%;
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

.container-fluid {
	padding: 0px;
}

.auth-container{
	border-radius: 15px;
	width: 120%;
	flex-direction: column;
    margin: 10px;
}
.auth {
    padding-top: 0px;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 20px;
}

.novaSenha {
    margin-bottom: 10px;
}

.confirmarNova {
    margin-top: 10px;
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
	height: 65px;
	border-radius: 15px 15px 0px 0px;
	background-color: #0B3B69;
	color: #ffff;
	margin-top: 0px;
	padding: 0px;
}


.auth-form {
    margin-bottom: 5px;
    padding: 0 10px 10px 10px;
}

.auth-form input[type="password"] {
    width: 100%;
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
.disabled-button {
  opacity: 75%;
  cursor: not-allowed !important;
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