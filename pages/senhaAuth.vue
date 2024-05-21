<template>
	<div class="container-fluid auth-container d-flex  col-1 justify-content-center" :class="{ 'blurred': !isEqual }">

		<div class="header">
			<p class="texto"><strong>Recuperar Senha</strong></p>
		</div>

        <form class="auth-form" @submit.prevent="submitForm">
            
            <div class="auth">
                
                <div class="novaSenha">
                    <label for="newPassword">Nova Senha:</label>
                    <input type="password" id="newPassword" placeholder="Sua nova senha" v-model="newPassword" required>
                    <button class="showButton" @click="togglePasswordVisibility('newPassword')">Texto</button>
                </div>

                <div class="confirmarNova">
                    <label for="newRePassword">Confirma a Nova Senha:</label>
                    <input type="password" id="newRePassword" placeholder="Confirme sua nova senha" v-model="newRePassword" required>
                    <button class="showButton" @click="togglePasswordVisibility('newRePassword')">Texto</button>
                </div>

            </div>
            
            <button type="submit" @click="verifyPassword">Enviar</button>

        </form>

	</div>

    <span v-if="!isEqual" class="pop-error">
		As senhas não estão iguais, tente novamente
		<button @click="resetPassword">Ok</button>
	</span>

</template>

<script setup lang="ts"> 
definePageMeta({
  layout: 'authentication'
});

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Váriaveis responsivas que armazenam os valores dos campos acima (integrar à API)
const newPassword = ref('');
const newRePassword = ref(''); 
const isEqual = ref(true);



// Router para voltar ao login
const router = useRouter();

// Métodos para fazer a rotina funcionar

    // Verifica se as senhas estão iguais
const verifyPassword = () => {
    if (newPassword === newRePassword) {
        console.log("Você será direcionado para o login novamente.");
        router.push('/login');
    }
    else {
        console.log("As senhas não estão iguais, tente novamente.")
        isEqual.value = false;
    }
}

    // Reiniciar a rotina
const resetPassword = () => {
    newPassword.value = '';
    newRePassword.value = '';
    isEqual.value = true;

}

    //Visualizar a senha;
const togglePasswordVisibility = (fieldId) => {
    const field = document.getElementById(fieldId);
    
    if (field.type === 'password') {
        field.type = 'text';
        console.log(`Sua senha é ${field.value}.`); // Verificação
    } else {
        field.type = 'password';
    }
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
	height: 400px;
	width: 325px;
	flex-direction: column;
    margin: 10px;
}
.auth {
    padding-top: 0px;
    padding-bottom: 50px;
    justify-content: space-between;
    margin-top: 32px;
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
	max-width: 350px;
	height: 65px;
	border-radius: 15px;
	background-color: #0B3B69;
	color: #ffff;
	margin-top: 0px;
	padding: 0px;
}

.auth-form {
	margin-top: 5px;
    margin-bottom: 5px;
    padding: 10px;

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