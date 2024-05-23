<template>
  <ModalAlmoReport />
  <div class="d-flex mb-3 justify-content-between align-items-center chart-filter">
    <div class="dropdown mx-2">
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Período</button>
      <ul class="dropdown-menu">
        <li @click="changeLabel(-1)" type="button" class="dropdown-item">Todo período</li>
        <li>
          <div class="vue-dropdown" @mouseover="toggleDropdown" @mouseout="toggleDropdown">
              <div class="filter-btn dropdown-item large-menu-btn d-flex btn align-items-center border-0" type="button">
                  Mês (Escolha o mês)   
                </div>
              <ul class="vue-dropdown-menu" v-show="dropdownState">
                <li class="small-menu">
                  <div v-for="(month, index) in months" :key="index" @click="changeLabel(index + 1)" class="filter-btn d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" type="button">
                      {{ month.slice(0, 3) }}
                    </div>
                  </li>
              </ul>
          </div>
        </li>
      </ul>
      <button class="btn btn-primary mx-2" @click="toggleDataType">{{ currentDataTypeLabel }}</button>
    </div>
    <button class="btn btn-primary me-3" type="button" data-bs-toggle="modal" data-bs-target="#almoReport" ria-expanded="false">Relatório</button>
  </div>
  <div>
    <Bar class="chart-graph" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { useUser } from '../../stores/user.ts';
import { useStorageStore } from '../../stores/storage.ts';
import { getRequestByItem, getRequestByUser } from '../../services/requests/requestsGET.ts';
import { getItems } from '../../services/items/itemsGET.ts';
import { getUsers } from '../../services/users/userGET.ts';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const userStore = useUser();
const store = useStorageStore();

const dropdownState = ref(false);
const toggleDropdown = () => {
  dropdownState.value = !dropdownState.value;
};

const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const totalItems = await getItems(userStore);
const dataItems = [];
const dataItemsByMonth = Array.from({ length: 12 }, () => []);

for (let i = 1; i <= totalItems.totalElements; i++) {
  const req = await getRequestByItem(userStore, i);
  const reqData = req.content;
  if (reqData.length > 0) {
    const qtdRequestSum = reqData.reduce((sum, request) => sum + request.quantityRequested, 0);
    dataItems.push({
      itemName: reqData[0].item.name,
      qtdRequested: qtdRequestSum,
    });
    for (let k = 0; k < 12; k++) {
      const qtdRequestSumWeek = reqData.reduce((sum, request) => {
        const month = parseInt(request.creationDate.slice(5, 7), 10) - 1;
        if (month === k) {
          return sum + request.quantityRequested;
        }
        return sum;
      }, 0);
      dataItemsByMonth[k].push({ itemName: reqData[0].item.name, qtdRequested: qtdRequestSumWeek });
    }
  }
}

const totalUsers = await getUsers(userStore);
const dataUsers = [];
const dataUsersByMonth = Array.from({ length: 12 }, () => []);

for (let i = 1; i <= totalUsers.content.length; i++) {
  const req = await getRequestByUser(userStore, i);
  const reqData = req.content;
  if (reqData.length > 0) {
    const qtdRequestSum = reqData.reduce((sum, request) => sum + request.quantityRequested, 0);
    dataUsers.push({
      userName: reqData[0].user.name,
      qtdRequested: qtdRequestSum,
    });
    for (let k = 0; k < 12; k++) {
      const qtdRequestSumWeek = reqData.reduce((sum, request) => {
        const month = parseInt(request.creationDate.slice(5, 7), 10) - 1;
        if (month === k) {
          return sum + request.quantityRequested;
        }
        return sum;
      }, 0);
      dataUsersByMonth[k].push({ userName: reqData[0].user.name, qtdRequested: qtdRequestSumWeek });
    }
  }
}

const labels = {
  mostItems: [[], []],
  mostRequesters: [[], []],
};

const datasets = {
  mostItemsTime: [[], []],
  mostRequestersTime: [[], []],
};

const sortedDataItems = dataItems.filter(item => item.qtdRequested > 0).sort((a, b) => b.qtdRequested - a.qtdRequested);
const sortedDataUsers = dataUsers.filter(user => user.qtdRequested > 0).sort((a, b) => b.qtdRequested - a.qtdRequested);

for (let i = 0; i < 12; i++) {
  const sortedDataItemsByMonth = dataItemsByMonth[i].filter(item => item.qtdRequested > 0).sort((a, b) => b.qtdRequested - a.qtdRequested);
  const sortedDataUsersByMonth = dataUsersByMonth[i].filter(user => user.qtdRequested > 0).sort((a, b) => b.qtdRequested - a.qtdRequested);

  datasets.mostItemsTime[1][i] = sortedDataItemsByMonth.map(item => item.qtdRequested);
  labels.mostItems[1][i] = sortedDataItemsByMonth.map(item => item.itemName);

  datasets.mostRequestersTime[1][i] = sortedDataUsersByMonth.map(user => user.qtdRequested);
  labels.mostRequesters[1][i] = sortedDataUsersByMonth.map(user => user.userName);
}

labels.mostItems[0] = sortedDataItems.map(item => item.itemName);
datasets.mostItemsTime[0] = sortedDataItems.map(item => item.qtdRequested);

labels.mostRequesters[0] = sortedDataUsers.map(user => user.userName);
datasets.mostRequestersTime[0] = sortedDataUsers.map(user => user.qtdRequested);

const currentIndex = ref(0);
const currentLabelName = ref('Itens mais solicitados');
const currentDataType = ref('mostItems'); 
const currentDataTypeLabel = ref('Usuários com mais solicitações');

const chartData = ref({
  labels: labels[currentDataType.value][0],
  datasets: [
    {
      label: currentLabelName.value,
      backgroundColor: '#0B3B69',
      data: datasets[currentDataType.value + 'Time'][0],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
});

const changeLabel = (monthIndex) => {
  if (monthIndex === -1) {
    currentIndex.value = 0;
    chartData.value = {
      ...chartData.value,
      labels: labels[currentDataType.value][0],
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: datasets[currentDataType.value + 'Time'][0],
        },
      ],
    };
  } else {
    currentIndex.value = 1;
    chartData.value = {
      ...chartData.value,
      labels: labels[currentDataType.value][1][monthIndex - 1],
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: datasets[currentDataType.value + 'Time'][1][monthIndex - 1],
        },
      ],
    };
  }
};

const toggleDataType = () => {
  currentDataType.value = currentDataType.value === 'mostItems' ? 'mostRequesters' : 'mostItems';
  currentLabelName.value = currentDataType.value === 'mostItems' ? 'Itens mais solicitados' : 'Usuários mais solicitados';
  currentDataTypeLabel.value = currentDataType.value === 'mostItems' ? 'Usuários mais solicitados' : 'Itens mais solicitados';
  changeLabel(currentIndex.value ? currentIndex.value : -1);
};

onMounted(() => {
  /*
  if (store.isMobile) {
    const btnText = document.querySelectorAll('.filter-btn');
    const dropdownToggle = document.querySelector('.dropdown-principal');
    dropdownToggle.removeAttribute('data-bs-auto-close');
    dropdownToggle.setAttribute('data-bs-auto-close', 'outside');
    btnText.forEach(element => element.style.fontSize = '9px');
  }
  */
});
</script>




<style scoped>
.chart-graph {
  height: 300px;
}

li {
  list-style-type: none;
}

.large-menu {
  width: 136px;
  min-width: 40px;
}

.small-menu {
  background-color: white;
  border-radius: 12px;
  border: 1px #D9D9D9 solid;
  position: absolute;
  margin-top: -200px;
  left: 175px;
  width: 65px;
  height: 400px;
  min-width: 40px;
}

.btn-transparent {
  font-size: 14px;
}

.action-btn {
  border: none;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 1px ridge #1F69B1;
}

.btn-transparent:hover {
  color: white;
  background-color: #FED51E;
}

.btn-outline-ligth:hover {
  color: white !important; 
  background-color: #0B3B69 !important; 
}

@media screen and (max-width: 820px) {
  .action-btn {
    font-size: 12px;
  }

  .filter-btn {
    font-size: 12px;
  }

  .large-menu {
    padding: 0;
    width: 120px !important;
  }

  .small-menu {
    padding: 0;
    margin-top: -40px;
    height: 55px;
    left: 115px;
  }

  .action-icon {
    width: 15px;
    height: 15px;
  }
}
</style>
