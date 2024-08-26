<template>
  <ModalAlmoReport :id="1" :data="datasets"/>
  <div class="graph-header d-flex align-items-end justify-content-between section-title pt-2  bg-light-background-header">
        <h5 class="ps-2 fw-bold">Gráfico da quantidade de itens solicitados</h5>
          <div class="dropdown mb-1 mx-2 d-flex">
            <button class="d-flex align-items-center graph-btn btn btn-outline-secondary fw-bold px-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <IconsTimer class="me-1" width="20px" height="20px"/>
              Período
            </button>
            <button class="d-flex align-items-center ms-2 graph-btn btn btn-outline-primary px-2 fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#almoReport1" ria-expanded="false">
              <IconsRequest class="me-1" width="20px" height="20px"/>
              Relatório
            </button>
            <ul class="dropdown-menu large-menu p-0">
              <li @click="changeLabel('month')" type="button" class="dropdown-item fw-bold">
                anual
              </li>
              <li>
                <div class="vue-dropdown" @click="ClicktoggleDropdown" @mouseover="toggleDropdown" @mouseout="toggleDropdown">
                    <div class="filter-btn dropdown-item large-menu-btn fw-bold d-flex btn align-items-center border-0" type="button">
                        mensal   
                    </div>
                    <ul class="vue-dropdown-menu" v-show="dropdownState">
                        <li class="small-menu">
                          <div v-for="(month, index) in labels.month" :key="index" @click="changeLabel('week', index)" class="filter-btn d-flex fw-bold justify-content-between text-align-center align-items-center btn btn-transparent border-0" type="button">
                            {{ month.slice(0,3) }}
                          </div>
                        </li>
                    </ul>
                </div>
              </li>
            </ul>
      </div>
  </div>
  <div class="d-flex justify-content-end position-absolute me-3 mt-3 fw-bold opacity-75" style="right: 2%;">
    <p>Período: {{ monthSelected === -1 ? 'anual' : `${labels.month[monthSelected]}` }}</p>
  </div>
  <div>
    <div class="d-flex justify-content-center z-5 loader">
      <LoadersLoading class="position-absolute graph-loader p-5"/>
    </div>
    <Bar v-if="chartData.datasets[0].data.reduce((acc, current) => acc+current) > 0" class="chart-graph " :data="chartData" :options="chartOptions" />
    <div v-else class="d-flex justify-content-center mb-5">
      <p class="fw-bold fs-5 opacity-75 py-5 my-5">Nenhum dado encontrado</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
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
const req = await getRequests(userStore);

const data = req.content.map((request) => {
  return {date:request.creationDate.slice(0,10),  qtd: request.quantityRequested, status: request.status}
})



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
      label: 'Itens solicitados',
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
      labels: {
        font: {
          size: (context) => {
            const width = context.chart.width;
            if (width > 1000) return 14;
            if (width > 600) return 12;
            return 10;
          }
        }
      }
    }
  },
});

let monthSelected = -1;
const changeLabel = (labelType, index) => {
  currentLabel.value = labels[labelType]
  if(labelType === 'month'){
    monthSelected = -1
    currentIndex.value = 0;
    chartData.value = {
      ...chartData.value,
      labels: currentLabel.value,
      
      datasets: [
        {
          ...chartData.value.datasets[0], 
          type: 'bar',
          label: 'Itens solicitados',
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
    monthSelected = index
    currentIndex.value = 1;
    chartData.value = {
      ...chartData.value,
      labels: currentLabel.value,
      datasets: [
        {
          ...chartData.value.datasets[0], 
          type: 'bar',
          label: 'Itens solicitados',
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
</script>

<style scoped>
.graph-loader{
  margin-top: 100px !important;
  height: 100px;
}
h5{
    font-weight: 300;
    color: rgb(51,51,51, 0.8);
}
.section-title{
  border-radius: 8px 8px 0px 0px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
}
.graph-btn{
  color: rgb(0, 0, 0, 0.7);
  padding: 5px;
  font-size: 13px;
}
.chart-graph {
  height: 350px;
}
li{
    list-style-type: none;
}
.large-menu{
    width: 136px !important;
    min-width: 40px;
}
.small-menu{
    background-color: white;
    border-radius: 12px;
    border: 1px #D9D9D9 solid;
    position: absolute;
    margin-top: -200px;
    left: -55px;
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

.dropdown-item{
  font-size: 14px;
}
.btn-outline-secondary:hover{
  color: white;
}
.btn-transparent:hover {
  color: white !important; 
  background-color: #0B3B69 !important; 
}

.btn-outline-ligth:hover {
  color: white !important; 
  background-color: #0B3B69 !important; 
}

@media screen and (max-width: 820px){
    .action-btn{
        font-size: 12px;
    }
    .large-menu{
        padding: 0;
        width: 120px !important;
    }
    .action-icon{
        width: 15px;
        height: 15px;
    }
}
@media screen and (max-width: 500px){
  .graph-header{
    display: block !important;
  }
}
</style>
