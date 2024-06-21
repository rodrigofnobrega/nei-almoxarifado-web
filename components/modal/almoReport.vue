<template>
    <Modal id="almoReport" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
        <template v-slot:header>
            <h6 class="header-title d-flex fw-medium justify-content-start align-items-center">Gerar Relatório</h6>
            <button class="btn btn-transparent text-light close-btn" type="button" data-bs-dismiss="modal">
                <IconsClose class="close ms-5 s-5" width="1.3em" height="1.3em"/>
            </button>
        </template>
        <template v-slot:body>
            <form @submit.prevent="generateReport">
                <div class="d-block mb-3">
                    <label for="item-qtd">Período</label>
                    <div class="d-flex my-2">
                        <div class="form-check me-3">
                            <input class="form-check-input" type="radio" name="period" id="allPeriod" value="all" v-model="selectedPeriod">
                            <label class="form-check-label" for="allPeriod">
                                Todo período
                            </label>
                        </div>
                        <div class="form-check mx-2">
                            <input class="form-check-input" type="radio" name="period" id="monthlyPeriod" value="monthly" v-model="selectedPeriod">
                            <label class="form-check-label" for="monthlyPeriod">
                                Mensal
                            </label>
                        </div>
                        <div class="form-check mx-2">
                            <input class="form-check-input" type="radio" name="period" id="weeklyPeriod" value="weekly" v-model="selectedPeriod">
                            <label class="form-check-label" for="weeklyPeriod">
                                Semanal
                            </label>
                        </div>
                    </div>

                    <div v-if="selectedPeriod === 'monthly'" class="d-flex flex-wrap align-items-center">
                        <div v-for="(month, index) in months" :key="index" class="form-check">
                            <input class="form-check-input" type="checkbox" :id="'check'+index" :value="month" v-model="selectedMonths">
                            <label class="form-check-label mx-2" :for="'check'+index">
                                {{ month.slice(0, 3) }}
                            </label>
                        </div>
                    </div>
                    
                    <div v-if="selectedPeriod === 'weekly'" class="d-flex flex-wrap align-items-center">
                        <div v-for="(week, index) in weeks" :key="index" class="form-check">
                            <input class="form-check-input" type="checkbox" :id="'checkWeek'+index" :value="week" v-model="selectedWeeks">
                            <label class="form-check-label mx-2" :for="'checkWeek'+index">
                                {{ week }}
                            </label>
                        </div>
                    </div>
                </div>

                <div class="d-block mb-3">
                    <label for="type">Tipo de Item</label>
                    <select class="form-select me-5" aria-label="Default select" v-model="reportType">
                        <option disabled selected>Selecione o tipo</option>
                        <option value="todos">Todos</option>
                        <option value="unidade">Unidade</option>
                        <option value="sacola">Sacola</option>
                        <option value="caixa">Caixa</option>
                    </select>
                </div>

                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="monthlyAverage" v-model="includeMonthlyAverage">
                    <label class="form-check-label" for="monthlyAverage">
                        Incluir média mensal das solicitações por item
                    </label>
                </div>
                
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="includeUsers" v-model="includeUsers">
                    <label class="form-check-label" for="includeUsers">
                        Incluir usuários
                    </label>
                </div>

                <div v-if="includeUsers" class="d-block mb-3">
                    <label for="userType">Tipo de Usuário</label>
                    <select class="form-select me-5" aria-label="Default select" v-model="userType">
                        <option disabled selected>Selecione o tipo</option>
                        <option value="admin">Administrador</option>
                        <option value="regular">Regular</option>
                    </select>
                </div>
            </form>
        </template>
        <template v-slot:footer>
            <div class="container-fluid d-flex justify-content-end align-items-center">
                <button type="button" class="btn btn-light-alert inset-shadow text-light mx-1" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-light-success inset-shadow text-light mx-1" @click="generateReport">Gerar</button>
            </div>
        </template>
    </Modal>
</template>

<script setup>
import { ref } from 'vue';

const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const weeks = ['1ª semana', '2ª semana', '3ª semana', '4ª semana'];

const selectedPeriod = ref('all');
const selectedMonths = ref([]);
const selectedWeeks = ref([]);
const reportType = ref('');
const includeMonthlyAverage = ref(false);
const includeUsers = ref(false);
const userType = ref('');

const generateReport = () => {
    // Lógica para gerar o relatório
    console.log({
        selectedPeriod: selectedPeriod.value,
        selectedMonths: selectedMonths.value,
        selectedWeeks: selectedWeeks.value,
        reportType: reportType.value,
        includeMonthlyAverage: includeMonthlyAverage.value,
        includeUsers: includeUsers.value,
        userType: userType.value,
    });
};
</script>

<style scoped>
.form-check-input {
    border-color: #aeaeae;
}
.form-check-input:checked {
    background-color: #FED51E;
    box-shadow: none;
}
.close {
    position: relative;
    left: 20px;
}
.header-title {
    font-weight: 300;
    margin: -1px 0 -1px 0;
    padding: 0;
}
.btn {
    border-radius: 9px;
}
.inset-shadow {
    padding: 5px;
    box-shadow: inset 1px 1px 15px 1px rgba(0, 0, 0, 0.2);
}
.close-btn {
    border: none;
}
.sipac-container:hover {
    opacity: 100% !important;
}
.sipac-container:active {
    opacity: 100% !important;
}
</style>
