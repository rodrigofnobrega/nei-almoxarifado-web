<template>
	<div class="container-fluid auth-container d-flex  col-1 justify-content-center" :class="{ 'blurred': isSubmitOn || tokenError }">
		<div class="header">
			<p class="texto"><strong>Recuperar Senha</strong></p>
		</div>
        <form class="auth-form" @submit.prevent="submitForm">
            
            <div class="auth">
                
                <div  v-if="!isEnviado" class="submit">
                    <label for="email">Email:</label>
                    <input type="text" id="email" placeholder="Seu email" v-model="email" required>
                </div>
            

                <div v-else-if="isEnviado" class="token">
                    <label for="token">Código de verificação:</label>
                    <input type="text" id="token" placeholder="Seu código" v-model="token">
                </div>
            
            </div>
            
            <button v-if="!isEnviado" type="submit" @click="forgetPassword">Enviar</button>
            
            <button v-else-if="isEnviado" type="submit" @click="validateToken">Ir</button>

        </form>
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
const forgetPassword = async () => {
	console.log(email.value);
	const res = await forgotPasswordAUTH(email.value);
	//const res = await forgotPasswordPUT(1, recoveryToken.data, 121212, 121212)
	console.log(res)
	if (email.value != '') {
		console.log(`O token foi enviado para ${email.value}.`);
		isSubmitOn.value = true;
		isEnviado.value = true;  
	}
}
const validateToken = async () => {
	const res = await recoveryTokenAUTH(token.value);
	store.recoveryToken = token.value;
	console.log(res.data);
	navigateTo('/senhaAuth');
}
// Váriaveis responsivas que armazenam os valores dos campos acima (integrar à API)
const email = ref('');
const token = ref(''); // 
const newToken = ref('');

// Variáveis de verificação se foi mandado ou não o código e para verificar o código
const isEnviado = ref(false);

// Váriaveis que mostrarão os Pop-Up's no envio do token ou no erro dele
const isSubmitOn = ref(false);
const tokenError = ref(false);

// Router
const router = useRouter();

// Métodos que vão fazer que a rotina aconteça
    // Envio do email

    // Tirar pop-up de envio
const resetOn = () => {
    console.log(`Insira o token enviado para ${email.value}.`);
    isSubmitOn.value = false;
}

const resetSubmit = () => {
    newToken.value = '';
    tokenError.value = false;

}
</script>

<style scoped>
.blurred {
	filter: blur(1.5px);
}
/* .auth-container {

} */
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



.container-fluid {
	padding: 0px;

}

.auth-container{
	border-radius: 15px;
	height: 400px;
	width: 325px;
	flex-direction: column;
    margin: 10px;
}
.auth {
    padding-top: 5px;
    padding-bottom: 50px;
    justify-content: space-around;
    margin-top: 70px;
    margin-bottom: 55px;
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
	max-width: 350px;
	height: 65px;
	border-radius: 15px;
	background-color: #0B3B69;
	color: #ffff;
	margin-top: 0px;
	padding: 0px;
}

.auth-form {
	margin-top: 30px;
    margin-bottom: 5px;
    padding: 10px;

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