<template>
  <ModalAlmoReport />
  <div class="d-flex mb-3 justify-content-between align-items-center chart-filter">
    <div class="dropdown mx-2">
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Período</button>
      <ul class="dropdown-menu">
        <li @click="changeLabel('month')" type="button" class="dropdown-item">Mensal</li>
        <li>
          <div class="vue-dropdown" @click="ClicktoggleDropdown" @mouseover="toggleDropdown" @mouseout="toggleDropdown">
              <div class="filter-btn dropdown-item large-menu-btn d-flex btn align-items-center border-0" type="button">
                  Semanal(Escolha o mês)   
              </div>
              <ul class="vue-dropdown-menu" v-show="dropdownState">
                  <li class="small-menu">
                    <div v-for="(month, index) in labels.month" :key="index" @click="changeLabel('week', index)" class="filter-btn d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" type="button">
                      {{ month.slice(0,3) }}
                    </div>
                  </li>
              </ul>
          </div>
        </li>
      </ul>
    </div>
    <button class="btn btn-primary me-3" type="button" data-bs-toggle="modal" data-bs-target="#almoReport" ria-expanded="false">Relatório</button>
  </div>
  <div>
    <Bar class="chart-graph" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUser } from '../../stores/user.ts';
import { useStorageStore } from '../../stores/storage.ts';
import { getRequests } from '../../services/requests/requestsGET.ts';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  CategoryScale,
  LinearScale
);

const userStore = useUser();
const store = useStorageStore();

const dropdownState = ref(false);
const toggleDropdown = (dropdown_id) => {
    dropdownState.value = !dropdownState.value
}

const ClicktoggleDropdown = (dropdown_id) => {
    if(!store.isMobile){
        return 0
    }
    dropdownState.value = !dropdownState.value
}

onMounted(() => {
  /*
  if(store.isMobile){
      const btnText = document.querySelectorAll('.filter-btn');
      const dropdownToggle = document.querySelector('.dropdown-principal');
      dropdownToggle.removeAttribute('data-bs-auto-close')
      dropdownToggle.setAttribute('data-bs-auto-close', 'outside')
      btnText.forEach(element => element.style.fontSize = '9px');
  }
  */
})

const req = await getRequests(userStore);

const data = req.content.map((request) => {
  return {date:request.creationDate.slice(0,10),  qtd: request.quantityRequested, status: request.status}
})

const qtdRequestedByMonths = [];
const qtdRequestsAcceptByMonths = [];
const qtdRequestsRejectByMonths = [];

const qtdRequestedByWeeks = [
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const qtdRequestsAcceptByWeeks = [
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const qtdRequestsRejectByWeeks = [
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
                              [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
for(let i = 1; i <= 12; i++){
  let requestsSum = 0;
  let requestsAcceptedSum = 0;
  let requestsRejectedSum = 0;
  
  for(let j = 0; j < data.length; j++){
    if(data[j].date.slice(5, 7) == i){
      requestsSum += data[j].qtd
      let dayOfMonth = parseInt(data[j].date.slice(8, 11))
      if (dayOfMonth <= 7) {
        qtdRequestedByWeeks[i-1][0] += data[j].qtd;
      } else if (dayOfMonth > 7 && dayOfMonth <= 14) {
        qtdRequestedByWeeks[i-1][1] += data[j].qtd;
      } else if (dayOfMonth > 14 && dayOfMonth <= 21) {
        qtdRequestedByWeeks[i-1][2] += data[j].qtd;
      } else if (dayOfMonth > 21 && dayOfMonth <= 31) {
        qtdRequestedByWeeks[i-1][3] += data[j].qtd;
      }
    }
    if(data[j].date.slice(5, 7) == i && data[j].status === "ACEITO"){
      requestsAcceptedSum += data[j].qtd
      let dayOfMonth = parseInt(data[j].date.slice(8, 11))
      if (dayOfMonth <= 7) {
        qtdRequestsAcceptByWeeks[i-1][0] += data[j].qtd;
      } else if (dayOfMonth > 7 && dayOfMonth <= 14) {
        qtdRequestsAcceptByWeeks[i-1][1] += data[j].qtd;
      } else if (dayOfMonth > 14 && dayOfMonth <= 21) {
        qtdRequestsAcceptByWeeks[i-1][2] += data[j].qtd;
      } else if (dayOfMonth > 21 && dayOfMonth <= 31) {
        qtdRequestsAcceptByWeeks[i-1][3] += data[j].qtd;
      }
    }
    if(data[j].date.slice(5, 7) == i && data[j].status === "RECUSADO"){
      requestsRejectedSum += data[j].qtd
      let dayOfMonth = parseInt(data[j].date.slice(8, 11))
      if (dayOfMonth <= 7) {
        qtdRequestsRejectByWeeks[i-1][0] += data[j].qtd;
      } else if (dayOfMonth > 7 && dayOfMonth <= 14) {
        qtdRequestsRejectByWeeks[i-1][1] += data[j].qtd;
      } else if (dayOfMonth > 14 && dayOfMonth <= 21) {
        qtdRequestsRejectByWeeks[i-1][2] += data[j].qtd;
      } else if (dayOfMonth > 21 && dayOfMonth <= 31) {
        qtdRequestsRejectByWeeks[i-1][3] += data[j].qtd;
      }
    }
  }
  qtdRequestedByMonths.push(requestsSum)
  qtdRequestsAcceptByMonths.push(requestsAcceptedSum)
  qtdRequestsRejectByMonths.push(requestsRejectedSum);
};

const labels = {
  month: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  week: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana']
};

const datasets = {
  available: [400, 400, 200, 300, 200, 150, 100, 50, 100, 200, 300, 200, 100],
  requests: [qtdRequestedByMonths, qtdRequestedByWeeks],
  requestsAccepted: [qtdRequestsAcceptByMonths, qtdRequestsAcceptByWeeks],
  requestsRejected: [qtdRequestsRejectByMonths, qtdRequestsRejectByWeeks]
};

const currentData = ref([]);
const currentLabel = ref([]);
const currentIndex = ref(0);
const currentLabelName = ref('');
currentLabel.value = labels.month;
currentData.value = datasets.requests;
currentLabelName.value = 'Quantidade Solicitada';
const chartData = ref({
  labels: currentLabel.value,
  datasets: [
    {
      type: 'bar',
      label: 'Solicitações',
      backgroundColor: '#0B3B69',
      data: datasets.requests[currentIndex.value]
    },
    {
      type: 'bar',
      label: 'Solicitações aceitas',
      backgroundColor: '#388E3C',
      data: datasets.requestsAccepted[currentIndex.value]
    },
    {
      type: 'bar',
      label: 'Solicitações recusadas',
      backgroundColor: '#B71C1C',
      data: datasets.requestsRejected[currentIndex.value]
    },
    {
      type: 'line',
      label: 'Quantidade disponível',
      backgroundColor: '#1F69B1',
      borderColor: '#1F69B1',
      pointBackgroundColor: '#1F69B1',
      pointBorderColor: '#1F69B1',
      data: datasets.available
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    }
  },
});

const changeLabel = (labelType, index) => {
  currentLabel.value = labels[labelType]
  if(labelType === 'month'){
    currentIndex.value = 0;
    chartData.value = {
      ...chartData.value,
      labels: currentLabel.value,
      
      datasets: [
        {
          ...chartData.value.datasets[0], 
          type: 'bar',
          label: 'Solicitações',
          backgroundColor: '#0B3B69',
          data: datasets.requests[currentIndex.value]
        },
        {
          ...chartData.value.datasets[1],
          type: 'bar',
          label: 'Solicitações aceitas',
          backgroundColor: '#388E3C',
          data: datasets.requestsAccepted[currentIndex.value]
        },
        {
          ...chartData.value.datasets[2],
          type: 'bar',
          label: 'Solicitações recusadas',
          backgroundColor: '#B71C1C',
          data: datasets.requestsRejected[currentIndex.value]
        },
        {
            ...chartData.value.datasets[3],
            type: 'line',
            label: 'Quantidade disponível',
            backgroundColor: '#1F69B1',
            borderColor: '#1F69B1',
            pointBackgroundColor: '#1F69B1',
            pointBorderColor: '#1F69B1',
            data: datasets.available
        },
      ]
    }
  } else if(labelType === 'week'){
    currentIndex.value = 1;
    chartData.value = {
      ...chartData.value,
      labels: currentLabel.value,
      datasets: [
        {
          ...chartData.value.datasets[0], 
          type: 'bar',
          label: 'Solicitações',
          backgroundColor: '#0B3B69',
          data: datasets.requests[currentIndex.value][index]
        },
        {
          ...chartData.value.datasets[1],
          type: 'bar',
          label: 'Solicitações aceitas',
          backgroundColor: '#388E3C',
          data: datasets.requestsAccepted[currentIndex.value][index]
        },
        {
          ...chartData.value.datasets[2],
          type: 'bar',
          label: 'Solicitações recusadas',
          backgroundColor: '#B71C1C',
          data: datasets.requestsRejected[currentIndex.value][index]
        },
      ]
    }
  }
};

</script>

<style scoped>
.chart-graph {
  height: 300px;
}

li{
    list-style-type: none;
}
.large-menu{
    width: 136px;
    min-width: 40px;
}
.small-menu{
    background-color: white;
    border-radius: 12px;
    border: 1px #D9D9D9 solid;
    position: absolute;
    margin-top: -200px;
    left: 200px;
    width: 65px;
    height: 400px;
    min-width: 40px;
}
.btn-transparent{
    font-size: 14px;
}
.action-btn{
    border: none;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 1px ridge #1F69B1;
}
.btn-transparent:hover{
    color: white;
    background-color: #FED51E;
}
.btn-outline-ligth:hover{
    color: white !important; 
    background-color: #0B3B69 !important; 
}
@media screen and (max-width: 820px){
    .action-btn{
        font-size: 12px;
    }
    .filter-btn{
        font-size: 12px;
    }
    .large-menu{
        padding: 0;
        width: 120px !important;
    }
    .small-menu{
        padding: 0;
        margin-top: -40px;
        height: 55px;
        left: 115px;
    }
    .action-icon{
        width: 15px;
        height: 15px;
    }
}
</style>
