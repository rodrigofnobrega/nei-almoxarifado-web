<template>
    <div class="settings-container">
        <h2>Configurações</h2>
        
        <section class="stock-levels">
        <h3>Níveis Limite de Estoque</h3>
        <div v-for="item in stockItems" :key="item.id" class="stock-item">
            <p><strong>{{ item.name }}</strong></p>
            <label>
            Mínimo:
            <input type="number" v-model="item.min" />
            </label>
            <label>
            Máximo:
            <input type="number" v-model="item.max" />
            </label>
        </div>
        </section>
        
        <section class="alerts">
        <h3>Definição dos Alertas</h3>
        <div v-for="(email, index) in alertEmails" :key="index">
            <input type="email" v-model="alertEmails[index]" placeholder="Email para alerta" />
            <button @click="removeAlertEmail(index)">Remover</button>
        </div>
        <button @click="addAlertEmail">Adicionar Email</button>
        </section>
        
        <section class="themes">
        <h3>Personalizar Cores e Temas</h3>
        <label>
            Cor Primária:
            <input type="color" v-model="theme.primaryColor" />
        </label>
        <label>
            Cor Secundária:
            <input type="color" v-model="theme.secondaryColor" />
        </label>
        </section>
        
        <section class="reports">
        <h3>Relatórios Personalizados</h3>
        <label>
            Incluir taxas específicas:
            <input type="checkbox" v-model="reportSettings.includeTaxes" />
        </label>
        <br>
        <label v-if="reportSettings.includeTaxes">
            Taxa Específica:
            <input type="number" v-model="reportSettings.specificTax" />
        </label>
        </section>
        
        <section class="item-categories">
        <h3>Personalizar Tipos e Categorias de Itens</h3>
        <div v-for="(category, index) in itemCategories" :key="index">
            <input type="text" v-model="itemCategories[index]" placeholder="Categoria de Item" />
            <button @click="removeItemCategory(index)">Remover</button>
        </div>
        <button @click="addItemCategory">Adicionar Categoria</button>
        </section>
        
        <button @click="saveSettings">Salvar Configurações</button>
    </div>
</template>
  

<script setup>
    import { ref } from 'vue';

    // Define o layout da página
    definePageMeta({
    layout: 'client'
    });

    // Dados de configuração inicial
    const stockItems = ref([
    { id: 1, name: 'Item 1', min: 10, max: 100 },
    { id: 2, name: 'Item 2', min: 5, max: 50 },
    // Adicione mais itens conforme necessário
    ]);

    const alertEmails = ref(['example1@example.com', 'example2@example.com']);

    const theme = ref({
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    });

    const reportSettings = ref({
    includeTaxes: false,
    specificTax: 0,
    });

    const itemCategories = ref(['Categoria 1', 'Categoria 2']);

    // Funções para manipular dados
    const addAlertEmail = () => {
    alertEmails.value.push('');
    };

    const removeAlertEmail = (index) => {
    alertEmails.value.splice(index, 1);
    };

    const addItemCategory = () => {
    itemCategories.value.push('');
    };

    const removeItemCategory = (index) => {
    itemCategories.value.splice(index, 1);
    };

    const saveSettings = () => {
    // Função para salvar configurações, integrar com a API aqui
    console.log('Salvando configurações...', {
        stockItems: stockItems.value,
        alertEmails: alertEmails.value,
        theme: theme.value,
        reportSettings: reportSettings.value,
        itemCategories: itemCategories.value,
    });
        };
</script>

<style scoped>
    .settings-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    }

    .settings-container h2 {
    text-align: center;
    margin-bottom: 20px;
    }

    section {
    margin-bottom: 20px;
    }

    .stock-item {
    margin-bottom: 10px;
    }

    button {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    }

    button:hover {
    background-color: #0056b3;
    }
</style>
