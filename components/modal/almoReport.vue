<template>
    <Modal :id="`almoReport${props.id}`" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
        <template v-slot:header>
            <h6 class="header-title d-flex fw-medium justify-content-start align-items-center">Gerar Relatório</h6>
            <button class="btn btn-transparent text-light close-btn" type="button" data-bs-dismiss="modal">
                <IconsClose class="close ms-5 s-5" width="1.3em" height="1.3em"/>
            </button>
        </template>
        <template v-slot:body>
            <form @submit.prevent="generateReport">
                <div class="d-block mb-3">
                    <div v-if="props.id === 1">
                        <label class="report-subtitle" for="item-qtd">Dados</label>
                        <div class="d-flex align-items-center justify-content-between my-2">
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="allRequests" v-model="reportOptions.dataset[0]">
                                <label class="form-check-label" for="allRequests">
                                    Todas as solicitações 
                                </label>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="acceptRequests" v-model="reportOptions.dataset[1]">
                                <label class="form-check-label" for="acceptRequests">
                                    Solicitações aceitas
                                </label>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="rejectRequests" v-model="reportOptions.dataset[2]">
                                <label class="form-check-label" for="rejectRequests">
                                    Solicitações recusadas
                                </label>
                            </div>
                        </div>
                    </div>
                    <div v-if="props.id === 2">
                        <label class="report-subtitle" for="item-qtd">Dados</label>
                        <div class="d-flex align-items-center justify-content-start my-2">
                            <div class="form-check mb-3 me-4">
                                <input class="form-check-input" type="checkbox" id="itemsMost" v-model="reportOptions.dataset[0]">
                                <label class="form-check-label" for="itemsMost">
                                    Itens
                                </label>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="usersMost" v-model="reportOptions.dataset[1]">
                                <label class="form-check-label" for="usersMost">
                                    Usuários
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for="item-qtd">Período</label>
                        <div class="d-flex my-2">
                            <div class="form-check me-3">
                                <input class="form-check-input" type="radio" name="period" id="allPeriod" value="all" v-model="reportPeriod">
                                <label class="form-check-label" for="allPeriod">
                                    Todo período
                                </label>
                            </div>
                            <div class="form-check mx-2">
                                <input class="form-check-input" type="radio" name="period" id="monthlyPeriod" value="monthly" v-model="reportPeriod">
                                <label class="form-check-label" for="monthlyPeriod">
                                    Mensal
                                </label>
                            </div>
                        </div>
                    </div>
                    <div v-if="reportPeriod === 'monthly'" class="d-flex flex-wrap align-items-center">
                        <div v-for="(month, index) in months" :key="index" class="form-check">
                            <input class="form-check-input" type="checkbox" :id="'check'+index" :value="index" v-model="selectedMonths">
                            <label class="form-check-label mx-2" :for="'check'+index">
                                {{ month.slice(0, 3) }}
                            </label>
                        </div>
                    </div>
                    
                    <div v-if="reportPeriod === 'weekly'" class="d-flex flex-wrap align-items-center">
                        <div v-for="(week, index) in weeks" :key="index" class="form-check">
                            <input class="form-check-input" type="checkbox" :id="'checkWeek'+index" :value="week" v-model="selectedWeeks">
                            <label class="form-check-label mx-2" :for="'checkWeek'+index">
                                {{ week }}
                            </label>
                        </div>
                    </div>
                </div>

                <div v-if="props.id === 2" class="d-block mb-3">
                    <label for="type">Tipo de Item</label>
                    <select class="form-select me-5" aria-label="Default select" v-model="reportType">
                        <option disabled selected>Selecione o tipo</option>
                        <option value="todos">Todos</option>
                        <option value="unidade">Unidade</option>
                        <option value="sacola">Sacola</option>
                        <option value="caixa">Caixa</option>
                    </select>
                </div>

                <div v-if="props.id === 2" class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="monthlyAverage" v-model="includeMonthlyAverage">
                    <label class="form-check-label" for="monthlyAverage">
                        Incluir média mensal das solicitações por item
                    </label>
                </div>
                
                <div v-if="props.id === 2" class="form-check mb-3">
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
import { onMounted, provide, ref } from 'vue';
import jsPDF from 'jspdf';
import { useStorageStore } from '../../stores/storage';

const props = defineProps({
    id:{
        type: Number,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});

const store = useStorageStore();

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const weeks = ['1ª semana', '2ª semana', '3ª semana', '4ª semana'];

const reportOptions = ref({
    dataset: [false, false, false]
});

const reportPeriod = ref('all');
const selectedMonths = ref([]);
const selectedWeeks = ref([]);
const reportType = ref('');
const includeMonthlyAverage = ref(false);
const includeUsers = ref(false);
const userType = ref('');

/* const generateReport = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const date = new Date();
    const title = 'RELATÓRIO';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    const titleWidth = doc.getStringUnitWidth(title) * doc.getFontSize() / doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2;
    doc.text(title, titleX, 10);
    doc.setFontSize(11);
    doc.text('Data:', titleX+50, 10);
    doc.setFont('helvetica', 'light');
    doc.text(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getUTCMinutes()}:${date.getSeconds()}`, titleX+62, 10);
    doc.line(10, 13, 200, 13);

    doc.setFont('times', 'light');
    doc.setFontSize(10);

    if (reportPeriod.value === 'all') {
        if(props.id === 1){
            if (reportOptions.value.dataset[0]) {
            for(let i = 0; i < months.length; i++){
                doc.text(`${months[i].slice(0, 3)}`, titleX-40+(i*10), 20);  
                doc.text(`${props.data.requests[0][i]}`, titleX-39+(i*10), 30);  
            }
            doc.text('Total de requisições: ', 10, 30);
            }
            if (reportOptions.value.dataset[1]) {
            for(let i = 0; i < months.length; i++){
                doc.text(`${months[i].slice(0, 3)}`, titleX-40+(i*10), 20);  
                doc.text(`${props.data.requestsAccepted[0][i]}`, titleX-39+(i*10), 40);  
            }
            doc.text('Total de aceitações: ', 10, 40);
            }
            if (reportOptions.value.dataset[2]) {
            for(let i = 0; i < months.length; i++){
                doc.text(`${months[i].slice(0, 3)}`, titleX-40+(i*10), 20);  
                doc.text(`${props.data.requestsRejected[0][i]}`, titleX-39+(i*10), 50);  
            }
            doc.text('Total de rejeições:', 10, 50);
            }
        }
        else if(props.id === 2){
            if (reportOptions.value.dataset[0]) {
            doc.text(`Itens mais solicitados`, 10, 20)
            doc.text(`${props.data.labels.mostItems[0]}`, 10, 30);
            doc.text(`${props.data.datasets.mostItemsTime[0]}`, 10, 40);
            }
            if (reportOptions.value.dataset[1]) {
            doc.text('Usuários com mais solicitações', 83, 20);
            doc.text(`${props.data.labels.mostRequesters[0]}`, 83, 30);
            doc.text(`${props.data.datasets.mostRequestersTime[0]}`, 83, 40);
            }
        }
    } else if (reportPeriod.value === 'monthly') {
        if(props.id === 1){
            doc.setFont('times', 'bold');
            doc.text(`Total de requisições`, 10, 20);
            doc.text(`Requisições aceitas`, 83, 20);
            doc.text(`Requisições recusadas`, 150, 20);
            doc.setFont('times', 'light');
            for(let i = 0; i < selectedMonths.value.length; i++){
            if(reportOptions.value.dataset[0]){
                doc.text(`${months[selectedMonths.value[i]]}: ${props.data.requests[1][selectedMonths.value[i]]}`, 10, 30+(10*i));
            }
            if(reportOptions.value.dataset[1]){
                doc.text(`${months[selectedMonths.value[i]]} : ${props.data.requestsAccepted[1][selectedMonths.value[i]]}`, 83, 30+(10*i));
            }
            if(reportOptions.value.dataset[2]){
                doc.text(`${months[selectedMonths.value[i]]}: ${props.data.requestsRejected[1][selectedMonths.value[i]]}`, 150, 30+(10*i));
            }
        }
        }
        else if(props.id === 2){
            doc.text(`Itens mais solicitados`, 10, 20)
            doc.text('Usuários com mais solicitações', 83, 20);
            for(let i = 0; i < selectedMonths.value.length; i++){
                if (reportOptions.value.dataset[0]) {
                    if(props.data.datasets.mostItemsTime[1][selectedMonths.value[i]] != undefined){
                        doc.text(`${props.data.labels.mostItems[1][selectedMonths.value[i]]}`, 10, 30+(10*i));
                        doc.text(`${months[selectedMonths.value[i]]}: ${props.data.datasets.mostItemsTime[1][selectedMonths.value[i]]}`, 10, 35+(10*i));
                    }
                }
                if (reportOptions.value.dataset[1]) {
                    if(props.data.datasets.mostRequestersTime[1][selectedMonths.value[i]] != undefined){
                        doc.text(`${props.data.labels.mostRequesters[1][selectedMonths.value[i]]}`, 83, 30+(10*i));
                        doc.text(`${months[selectedMonths.value[i]]}: ${props.data.datasets.mostRequestersTime[1][selectedMonths.value[i]]}`, 83, 35+(10*i));
                    }
                }
            }
        }
    }
    // Salvar o PDF
    doc.save('relatorio.pdf');
}; */

const generateReport = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const date = new Date();
    const title = 'RELATÓRIO';

    // Adicionar um cabeçalho com fundo colorido
    doc.setFillColor(220, 220, 220);
    doc.rect(0, 0, pageWidth, 20, 'F');
    
    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102); // Cor do título
    const titleWidth = doc.getStringUnitWidth(title) * doc.getFontSize() / doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2;
    doc.text(title, titleX, 10);

    // Data
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0); // Cor do texto
    doc.text('Data:', titleX + 50, 10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, titleX + 62, 10);
    doc.setDrawColor(0, 51, 102);
    doc.line(10, 13, 200, 13);

    // Conteúdo do relatório
    doc.setFont('times', 'normal');
    doc.setFontSize(10);

    const addSectionTitle = (text, y) => {
        doc.setFont('times', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(0, 51, 102);
        doc.rect(10, y - 4, pageWidth - 20, 8, 'F');
        doc.text(text, 12, y);
    };

    if (reportPeriod.value === 'all') {
        if (props.id === 1) {
            if (reportOptions.value.dataset[0]) {
                addSectionTitle('Total de Requisições por Mês', 20);
                for (let i = 0; i < months.length; i++) {
                    doc.setTextColor(0, 0, 0);
                    doc.text(`${months[i].slice(0, 3)}`, titleX - 40 + (i * 10), 30);
                    doc.text(`${props.data.requests[0][i]}`, titleX - 39 + (i * 10), 40);
                }
            }
            if (reportOptions.value.dataset[1]) {
                addSectionTitle('Total de Aceitações por Mês', 50);
                for (let i = 0; i < months.length; i++) {
                    doc.setTextColor(0, 0, 0);
                    doc.text(`${months[i].slice(0, 3)}`, titleX - 40 + (i * 10), 60);
                    doc.text(`${props.data.requestsAccepted[0][i]}`, titleX - 39 + (i * 10), 70);
                }
            }
            if (reportOptions.value.dataset[2]) {
                addSectionTitle('Total de Rejeições por Mês', 80);
                for (let i = 0; i < months.length; i++) {
                    doc.setTextColor(0, 0, 0);
                    doc.text(`${months[i].slice(0, 3)}`, titleX - 40 + (i * 10), 90);
                    doc.text(`${props.data.requestsRejected[0][i]}`, titleX - 39 + (i * 10), 100);
                }
            }
        } else if (props.id === 2) {
            if (reportOptions.value.dataset[0]) {
                addSectionTitle('Itens mais Solicitados', 20);
                doc.setTextColor(0, 0, 0);
                doc.text(`${props.data.labels.mostItems[0]}`, 10, 30);
                doc.text(`${props.data.datasets.mostItemsTime[0]}`, 10, 40);
            }
            if (reportOptions.value.dataset[1]) {
                addSectionTitle('Usuários com Mais Solicitações', 50);
                doc.setTextColor(0, 0, 0);
                doc.text(`${props.data.labels.mostRequesters[0]}`, 83, 60);
                doc.text(`${props.data.datasets.mostRequestersTime[0]}`, 83, 70);
            }
        }
    } else if (reportPeriod.value === 'monthly') {
        if (props.id === 1) {
            addSectionTitle('Resumo Mensal', 20);
            doc.setTextColor(0, 0, 0);
            doc.setFont('times', 'bold');
            doc.text(`Total de Requisições`, 10, 30);
            doc.text(`Requisições Aceitas`, 83, 30);
            doc.text(`Requisições Recusadas`, 150, 30);
            doc.setFont('times', 'normal');
            for (let i = 0; i < selectedMonths.value.length; i++) {
                if (reportOptions.value.dataset[0]) {
                    doc.text(`${months[selectedMonths.value[i]]}: ${props.data.requests[1][selectedMonths.value[i]]}`, 10, 40 + (10 * i));
                }
                if (reportOptions.value.dataset[1]) {
                    doc.text(`${months[selectedMonths.value[i]]}: ${props.data.requestsAccepted[1][selectedMonths.value[i]]}`, 83, 40 + (10 * i));
                }
                if (reportOptions.value.dataset[2]) {
                    doc.text(`${months[selectedMonths.value[i]]}: ${props.data.requestsRejected[1][selectedMonths.value[i]]}`, 150, 40 + (10 * i));
                }
            }
        } else if (props.id === 2) {
            addSectionTitle('Resumo Mensal', 20);
            for (let i = 0; i < selectedMonths.value.length; i++) {
                if (reportOptions.value.dataset[0]) {
                    if (props.data.datasets.mostItemsTime[1][selectedMonths.value[i]] !== undefined) {
                        doc.setTextColor(0, 0, 0);
                        doc.text(`${props.data.labels.mostItems[1][selectedMonths.value[i]]}`, 10, 30 + (10 * i));
                        doc.text(`${months[selectedMonths.value[i]]}: ${props.data.datasets.mostItemsTime[1][selectedMonths.value[i]]}`, 10, 35 + (10 * i));
                    }
                }
                if (reportOptions.value.dataset[1]) {
                    if (props.data.datasets.mostRequestersTime[1][selectedMonths.value[i]] !== undefined) {
                        doc.setTextColor(0, 0, 0);
                        doc.text(`${props.data.labels.mostRequesters[1][selectedMonths.value[i]]}`, 83, 30 + (10 * i));
                        doc.text(`${months[selectedMonths.value[i]]}: ${props.data.datasets.mostRequestersTime[1][selectedMonths.value[i]]}`, 83, 35 + (10 * i));
                    }
                }
            }
        }
    }

    // Salvar o PDF
    doc.save('relatorio.pdf');
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
.form-check-label{
    font-size: 13px;
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
