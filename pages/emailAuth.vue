<template>
	<div class="container-fluid auth-container d-flex  col-1 justify-content-center">
		<div class="header">
			<p class="texto"><strong>Recuperar Senha</strong></p>
		</div>
            <form class="auth-form" @submit.prevent="submitForm">
                
                <div class="auth">
                    <label for="email">Email:</label>
                <input type="text" id="email" placeholder="Seu email" v-model="email" required>

                <label for="token">Código de verificação:</label>
                <input type="text" id="token" placeholder="Seu código" v-model="newToken" required>
                </div>
                
                <button v-if="!isSubmit" type="submit" @click="submitEmail">Enviar</button>
                
                <button v-else-if="isSubmit" type="submit" @click="goToSenhaAuth">Ir</button>

		    </form>
        
		

	</div>
</template>

<script setup lang="ts"> 
definePageMeta({
  layout: 'authentication'
});

import { ref, onMounted } from 'vue';

// Váriaveis responsivas que armazenam os valores dos campos acima
const email = ref('');
const token = ref('AJA3');
const newToken = ref('');

// Variáveis de verificação se foi mandado ou não o código e para verificar o código
const isSubmit = ref(false);
const isToken = ref(false);

// Métodos que vão fazer que a rotina aconteça
const submitEmail = () => {

}

const goToSenhaAuth = () => {

}


</script>

<style scoped>
.container-fluid {
	padding: 0px;
}

.auth-container{
	border-radius: 15px;
	height: 400px;
	width: 325px;
	flex-direction: column;
}
.auth {
    padding-top: 45px;
    padding-bottom: 48px;
    justify-content: space-around;
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
	border-radius: 15px 15px 0px 0px;
	background-color: #0B3B69;
	color: #ffff;
	margin-top: 0px;
	padding: 0px;
}

.auth-form {
	margin-top: 10px;
	margin-left: 10px;
	margin-right: 10px;
	padding: 12px;

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