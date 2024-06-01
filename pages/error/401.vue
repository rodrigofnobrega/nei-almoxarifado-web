<template>
    <div class="error-container">
        <h1 class="text-warning">401</h1>
        <h2>Acesso Proibido</h2>
        <p>Você não tem permissão para acessar esta página.</p>
        <a class="btn btn-primary rounded-1" href="/">Voltar para a Página Inicial</a>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
    router.push('/')
}

definePageMeta({
    layout: 'error'
})
</script>

<style scoped>
.error-container {
    text-align: center;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: auto;
}

.error-container h1 {
    font-size: 6em;
    margin: 0;
    color: #dc3545;
}

.error-container h2 {
    font-size: 1.5em;
    margin: 10px 0;
    color: #333;
}

.error-container p {
    margin: 20px 0;
    color: #666;
}

.error-container button {
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.error-container button:hover {
    background-color: #0056b3;
}
</style>
