<template>
    <div class="settings-container container mb-5">
        <!-- 
        <section class="settings-section mb-5">
            <h4 class="section-title">Níveis Limite de Estoque</h4>
            <div class="section-content d-flex flex-column justify-content-center">
              <div class="d-flex flex-wrap ms-5">
                <div class="item-limit mx-5 mb-4" v-for="item in stockItems" :key="item.id">
                  <p><strong>{{ item.name }}</strong></p>
                    <label class="d-block me-3">
                      Mínimo:
                      </label>
                    <input type="number" v-model="item.min" />
                    <label class="d-block">
                      Máximo:
                      </label>
                    <input type="number" v-model="item.max" />
                </div>
              </div>
            </div>
        </section>
        <section class="settings-section mb-5">
            <div class="section-title d-flex align-items-center justify-content-between ms-2">
                <h4>Emails para receber alertas</h4>
                <button :class="addOne ? 'disabled' : ''" class="btn btn-primary" @click="addAlertEmail">Adicionar</button>
            </div>
            <p class="ms-2">Os emails cadastrados nesta secção receberão mensagens de alerta configuradas para eventos selecionadas do sistema, como a de estoque abaixo do limite, itens faltando e afins.</p>
            <div class="section-content d-flex flex-column align-items-center mb-3">
                <div class="d-flex flex-wrap justify-content-start">
                    <div class="alert-email d-flex mx-2 my-2" v-for="(email, index) in alertEmails" :key="index">
                        <div class="me-3">
                            <input :class="email.valid ? 'bg-gray-light' : 'bg-light'" class="form-control" type="email" v-model="email.domain" placeholder="Email" />
                            <p class="position-absolute d-flex align-items-center text-dark-alert mt-2"  v-if="!isValidEmail(email.domain) && email.domain !== ''"><IconsInformation class="me-1"/>Formato de email inválido</p>
                        </div>
                        <div>
    
                            <button v-if="email.valid" class="btn btn-light-alert ms-3 text-light" @click="removeAlertEmail(index)">Remover</button>
                            <button v-if="!email.valid" class="btn btn-light-success ms-3 text-light" @click="validateEmail(index)">Confirmar</button>
                            <button v-if="!email.valid" class="btn btn-light-alert ms-3 text-light" @click="cancelValidation(index)">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    -->
        <section class="settings-section mb-5">
            <h3 class="section-title mx-2 pb-2">Personalizar Temas e Layouts</h3>
            <p class="fs-6 mx-2">Escolha um dos temas visuais abaixos para que a estilização do aplicativo esteja de acordo com suas preferências estéticas. O tema escolhido ficará salvo como preferências do usuário, ao sair da aplicação o tema continuará salvo.  </p>
            <div class="dashboard-container container-fluid d-flex px-0 justify-content-center align-items-center">
                <div class="card mx-2 bg-primary rounded-4" @click="changeLayout(0)"  onclick="document.getElementById('themeRadio1').checked = true;">
                    <img src="/defaultLayout.png" class="card-img-top" alt="...">
                    <div class="card-body p-3 text-dark-emphasis">
                        <div class="form-check text-light">
                          <input :checked="settingsStore.layout === 0" class="form-check-input" type="radio" id="themeRadio1" name="themeOptions" value="option1">
                          <label class="card-text fw-bold form-check-label fw-bold" for="themeRadio1">
                            Tema padrão
                          </label>
                        </div>
                    </div>
                </div>
                <div class="card mx-2 bg-primary rounded-4" @click="changeLayout(1)"  onclick="document.getElementById('themeRadio3').checked = true;">
                    <img src="/darkLayout.png" class="card-img-top" alt="...">
                    <div class="card-body p-3 text-dark-emphasis">
                        <div class="form-check text-light">
                          <input :checked="settingsStore.layout === 1" class="form-check-input" type="radio" id="themeRadio3" name="themeOptions" value="option3">
                          <label class="card-text fw-bold form-check-label fw-bold" for="themeRadio3">
                            Tema escuro
                          </label>
                        </div>
                    </div>
                </div>
                <div class="card mx-2 bg-primary rounded-4" @click="changeLayout(2)"  onclick="document.getElementById('themeRadio2').checked = true;">
                    <img src="/alternativeLayout.png" class="card-img-top" alt="...">
                    <div class="card-body p-3 text-dark-emphasis">
                        <div class="form-check text-light">
                          <input :checked="settingsStore.layout === 2" class="form-check-input" type="radio" id="themeRadio2" name="themeOptions" value="option2">
                          <label class="card-text fw-bold form-check-label fw-bold" for="themeRadio2">
                            Tema alternativo
                          </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--
        <div>
            <label class="form-check-label fw-bold">
                <input class="form-check-input" type="checkbox" v-model="reportSettings.includeTaxes[2]" />
                Solicitações recusadas
            </label>
            <p class="position-absolute">Esta opção processará todas as solicitações de cada mês do ano.</p>
        </div>
        <div>
            <label class="form-check-label fw-bold">
                <input class="form-check-input" type="checkbox" v-model="reportSettings.includeTaxes[3]" />
                Itens mais solicitados
            </label>
            <p class="position-absolute">Esta opção processará todas as solicitações de cada mês do ano.</p>
        </div>
        <div>
            <label class="form-check-label fw-bold">
                <input class="form-check-input" type="checkbox" v-model="reportSettings.includeTaxes[4]" />
                Usuários mais solicitantes
            </label>
            <p class="position-absolute">Esta opção processará todas as solicitações de cada mês do ano.</p>
        </div>
        <section class="settings-section mb-5">
            <h4 class="section-title">Relatórios Automáticos Personalizados</h4>
            <div class="section-content">
                <div class="d-flex flex-column">
                    <div class="d-flex flex-wrap justify-content-between">
                        <div>
                            <label class="form-check-label fw-bold">
                                <input class="form-check-input" type="checkbox" v-model="reportSettings.includeTaxes[0]" />
                                Todas as solicitações
                            </label>
                            <p class="text-wrap">Esta opção envia todas as solicitações de cada mês do ano.</p>
                        </div>
                        <div>
                            <label class="form-check-label fw-bold">
                                <input class="form-check-input" type="checkbox" v-model="reportSettings.includeTaxes[1]" />
                                Solicitações aceitas
                            </label>
                            <p class="text-wrap">Esta opção processará todas as solicitações de cada mês do ano.</p>
                        </div>
                        <div>
                            <label class="form-check-label fw-bold">
                                <input class="form-check-input" type="checkbox" v-model="reportSettings.includeTaxes[2]" />
                                Solicitações recusadas
                            </label>
                            <p class="text-wrap">Esta opção processará todas as solicitações de cada mês do ano.</p>
                        </div>
                        <div>
                            <label class="form-check-label fw-bold">
                                <input class="form-check-input" type="checkbox" v-model="reportSettings.includeTaxes[3]" />
                                Itens mais solicitados
                            </label>
                            <p class="text-wrap">Esta opção processará todas as solicitações de cada mês do ano.</p>
                        </div>
                        <div>
                            <label class="form-check-label fw-bold">
                                <input class="form-check-input" type="checkbox" v-model="reportSettings.includeTaxes[4]" />
                                Usuário com mais solicitações
                            </label>
                            <p class="text-wrap">Esta opção processará todas as solicitações de cada mês do ano.</p>
                        </div>
                    </div>
                </div>
                <br>
                </div>
                <label class="form-label mt-5" v-if="reportSettings.includeTaxes[0]">
                    Taxa Específica:
                    <input class="form-control" type="number" v-model="reportSettings.specificTax" />
                </label>
        </section>-->
    </div>
    </template>
    
    <script setup>
    import { inject, onUpdated } from 'vue';
    import { useSettingsStore } from '../stores/settings';
    
    definePageMeta({
    layout: 'client'
})
    // Dados de configuração inicial
    const settingsStore = useSettingsStore();
    const changeLayout = (index) => {
        settingsStore.layout = index
    }
    const itemCategory = ref('');
    
    const stockItems = ref([
    { id: 1, name: 'Item 1', min: 10, max: 100 },
    { id: 2, name: 'Item 2', min: 5, max: 50 },
    { id: 1, name: 'Item 1', min: 10, max: 100 },
    { id: 2, name: 'Item 2', min: 5, max: 50 },
    // Adicione mais itens conforme necessário
    ]);
    const alertEmails = ref([{domain: 'example1@example.com', valid: true}, {domain:'example2@example.com', valid: true}]);
    const theme = ref({
        primaryColor: '#007bff',
        secondaryColor: '#6c757d',
    });
    const reportSettings = ref({
        includeTaxes: [],
        specificTax: 0,
    });
    // Funções para manipulação de eventuais dados
    const addOne = ref(false)
    const isValidEmail = (email) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
    }
    const addAlertEmail = () => {
        alertEmails.value.push({domain: '', valid: false});
        addOne.value = true;
    };
    const validateEmail = (index) =>{
        alertEmails.value[index].valid = true;
        addOne.value = false;
    }
    const removeAlertEmail = (index) => {
        alertEmails.value.splice(index, 1);
    };
    const cancelValidation = (index) => {
        removeAlertEmail(index);
        addOne.value = false;
    }
    const addItemCategory = () => {
        settingsStore.categories.push(itemCategory.value)
    };
    const removeItemCategory = (index) => {
        settingsStore.categories.splice(index, 1);
    };
    const saveSettings = () => {
    // Função para salvar configurações, *integrar á API*
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
    .settings-container{
        margin-top: 100px;
    }
    .settings-container h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    section {
        margin-bottom: 20px;
    }
    .section-title{
        padding-bottom: 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgb(0, 0, 0, 0.3);
    }
    .section-content{
        font-size: 14px;
    }
    .stock-item {
        margin-bottom: 10px;
    }
    .btn, p{
        font-size: 13px;
    }
    .btn{
        font-weight: bold;
    }
    .card{
        transition: transform 0.5s ease-in-out;
        border: 1px #b6b6b6 solid;
        box-shadow:  0px 0px 10px 0px rgb(0, 0, 0, 0.2);
    }
    .card-text{
        font-size: 15px;
    }
    .stretched-link{
      text-decoration: none;
    }
    .card-img-top{
      transition: opacity 0.5s ease-in-out;
      opacity: 85%;
    }
    .close{
        position: relative;
        left: 20px;
    }
    .header-title{
        font-weight: 300;
        margin: -1px 0 -1px 0;
        padding: 0;
    }
    .trash:hover{
        transform: scale(1.2)
    }
    .card:hover .stretched-link{
        color: white !important;
    }
    .form-check-input {
        border-color: #aeaeae;
    }
    .form-check-input:checked {
        background-color: #1F69B1;
        box-shadow: none;
    }
    </style>