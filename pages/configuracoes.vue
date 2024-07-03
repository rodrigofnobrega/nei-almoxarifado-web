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
    <section class="settings-section mb-5">
        <h4 class="section-title">Personalizar Temas e Layouts</h4>
        <div class="dashboard-container container-fluid d-flex px-0 justify-content-center align-items-center">
            <div class="card mx-2 bg-primary rounded-4" onclick="document.getElementById('themeRadio1').checked = true;">
                <img src="/almo.png" class="card-img-top" alt="...">
                <div class="card-body p-3 text-dark-emphasis">
                    <div class="form-check text-light">
                      <input class="form-check-input" type="radio" id="themeRadio1" name="themeOptions" value="option1">
                      <label class="card-text fw-bold form-check-label fw-bold" for="themeRadio1">
                        Tema padrão
                      </label>
                    </div>
                </div>
            </div>
            <div class="card mx-2 bg-primary rounded-4" onclick="document.getElementById('themeRadio2').checked = true;">
                <img src="/almo.png" class="card-img-top" alt="...">
                <div class="card-body p-3 text-dark-emphasis">
                    <div class="form-check text-light">
                      <input class="form-check-input" type="radio" id="themeRadio2" name="themeOptions" value="option2">
                      <label class="card-text fw-bold form-check-label fw-bold" for="themeRadio2">
                        Tema alternativo
                      </label>
                    </div>
                </div>
            </div>
            <div class="card mx-2 bg-primary rounded-4" onclick="document.getElementById('themeRadio3').checked = true;">
                <img src="/almo.png" class="card-img-top" alt="...">
                <div class="card-body p-3 text-dark-emphasis">
                    <div class="form-check text-light">
                      <input class="form-check-input" type="radio" id="themeRadio3" name="themeOptions" value="option3">
                      <label class="card-text fw-bold form-check-label fw-bold" for="themeRadio3">
                        Tema escuro
                      </label>
                    </div>
                </div>
            </div>
        </div>
    </section>
    ---<div>
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
    </section>
    <section class="settings-section mb-5">
        <div class="section-title d-flex align-items-center justify-content-between ms-2">
            <h4>Personalizar Tipos e Categorias de Itens</h4>
            <button class="btn btn-primary fw-bold" @click="addItemCategory">Adicionar</button>
        </div>
        <div class="section-content d-flex">
            <div class="d-flex" v-for="(category, index) in itemCategories" :key="index">
                <input class="form-control" type="text" v-model="itemCategories[index]" placeholder="Categoria de Item" />
                <button class="btn mx-3 btn-light-alert text-light fw-bold" @click="removeItemCategory(index)">Remover</button>
            </div>
        </div>
    </section>
    <button class="btn btn-primary fw-bold" @click="saveSettings">Salvar Configurações</button>
    -->
</div>
</template>

<script setup>
import { inject } from 'vue';

const setpageTitle = inject('setpageTitle');
const sendDataToParent = () => {
    const title = "Configurações";
    const route = `${useRoute().fullPath}`
    setpageTitle(title, route, 'settings');
};
sendDataToParent();
// Dados de configuração inicial
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
const itemCategories = ref(['Categoria 1', 'Categoria 2']);
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
    itemCategories.value.push('');
};
const removeItemCategory = (index) => {
    itemCategories.value.splice(index, 1);
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
    margin-right: 5%;
    border-bottom: 1px solid rgb(0, 0, 0, 0.3);
}
.section-content{
    font-size: 14px;
}
.stock-item {
    margin-bottom: 10px;
}
.btn, .form-control, p{
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
.form-control{
    width: 110%;
}
.stretched-link{
  text-decoration: none;
}
.card-img-top{
  transition: opacity 0.5s ease-in-out;
  opacity: 85%;
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