<template>
  <ModalAlmoReport :id="2" :data="{
    datasets: {
      mostItemsTime: [datasets.mostItemsTime[0].slice(0, 15), datasets.mostItemsTime[1].slice(0, 15)], 
      mostRequestersTime: [datasets.mostRequestersTime[0].slice(0, 15), datasets.mostRequestersTime[1].slice(0, 15)]
    }, 
    labels: {
      mostItems: [labels.mostItems[0].slice(0, 15), labels.mostItems[1].slice(0, 15)], 
      mostRequesters: [labels.mostRequesters[0].slice(0, 15), labels.mostRequesters[1].slice(0, 15)]
      }}"/>
  <div class="graph-header d-flex align-items-end justify-content-between section-title pt-2 mb-3 bg-light-background-header">
        <h5 class="ps-2">Gráfico dos mais solicitados</h5>
        <div class="dropdown mb-1 mx-2 d-flex">
            <button class="d-flex align-items-center graph-btn btn btn-transparent " @click="toggleDataType">{{ currentDataTypeLabel }}</button>
            <button class="d-flex align-items-center graph-btn btn btn-transparent dropdown-toggle mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <IconsTimer class="me-1" width="20px" height="20px"/>
              Período
            </button>
            <ul class="dropdown-menu">
              <li @click="changeLabel(-1)" type="button" class="dropdown-item">Todo período</li>
              <li>
                <div class="vue-dropdown" @mouseover="toggleDropdown" @mouseout="toggleDropdown">
                    <div class="filter-btn dropdown-item large-menu-btn d-flex btn align-items-center border-0" type="button">
                        Mês  
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
            <button class="d-flex align-items-center graph-btn btn btn-transparent me-3" type="button" data-bs-toggle="modal" data-bs-target="#almoReport2" ria-expanded="false">
              <IconsRequest class="me-1" width="20px" height="20px"/>
              Relatório
            </button>
        </div>
  </div>
  <div>
    <div class="d-flex justify-content-center z-5">
      <LoadersLoading class="position-absolute p-5 mt-5"/>
    </div>
    <Chart :type="'pie'" class="chart-graph" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { useUser } from '../../stores/user.ts';
import { useStorageStore } from '../../stores/storage.ts';
import { getRequestByItem, getRequestByUser, getRequests } from '../../services/requests/requestsGET.ts';
import { getItems } from '../../services/items/itemsGET.ts';
import { getUsers } from '../../services/users/userGET.ts';
import { Chart } from 'vue-chartjs';
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
  ArcElement,
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
  ArcElement, 
  LineElement
);

const userStore = useUser();
const store = useStorageStore();

const dropdownState = ref(false);
const toggleDropdown = () => {
  dropdownState.value = !dropdownState.value;
};

const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const labels = {
  mostItems: [[], []],
  mostRequesters: [[], []],
};

const datasets = {
  mostItemsTime: [[], []],
  mostRequestersTime: [[], []],
};


let dataItems = [];
const dataItemsByMonth = Array.from({ length: 12 }, () => []);

let count = 0;
let allRequests = await getRequests(userStore, count);
const itemsName = [];
const itemsNameByMonth = [[],[],[],[],[],[],[],[],[],[],[],[]];
do{
    for(let i = 0; i < allRequests.content.length; i++){
      itemsName.push(allRequests.content[i].item.name)
      const creationMonth = parseInt(allRequests.content[i].creationDate.slice(5, 7), 10) - 1;
      if (creationMonth >= 0 && creationMonth < 12){
        itemsNameByMonth[creationMonth].push(allRequests.content[i].item.name)
      }
    }
    const frequencyMap = itemsName.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    const resultArray = Object.keys(frequencyMap).map(key => ({
      name: key,
      qtd: frequencyMap[key]
    }));
    dataItems = resultArray.sort((a, b) => b.qtd - a.qtd)
    for(let j = 0; j < 12; j++){
      if(itemsNameByMonth[j].length > 0){
        const frequencyMap = itemsNameByMonth[j].reduce((acc, item) => {
          acc[item] = (acc[item] || 0) + 1;
          return acc;
        }, {});
        const resultArray = Object.keys(frequencyMap).map(key => ({
          name: key,
          qtd: frequencyMap[key]
        }));
        dataItemsByMonth[j] = resultArray.sort((a, b) => b.qtd - a.qtd)
        labels.mostItems[1][j] = dataItemsByMonth[j].map(item => item.name); 
        datasets.mostItemsTime[1][j] = dataItemsByMonth[j].map(item => item.qtd);
      }
    }
    labels.mostItems[0] = dataItems.map(item => item.name);
    datasets.mostItemsTime[0] = dataItems.map(item => item.qtd);
    count++;
    allRequests = await getRequests(userStore, count);
}while(count < allRequests.totalPages)

let dataUsers = [];
const dataUsersByMonth = Array.from({ length: 12 }, () => []);

count = 0;
allRequests = await getRequests(userStore, count);
const usersName = [];
const usersNameByMonth = [[],[],[],[],[],[],[],[],[],[],[],[]];
do{
    for(let i = 0; i < allRequests.content.length; i++){
      usersName.push(allRequests.content[i].user.name);
      const creationMonth = parseInt(allRequests.content[i].creationDate.slice(5, 7), 10) - 1;
      if (creationMonth >= 0 && creationMonth < 12){
        usersNameByMonth[creationMonth].push(allRequests.content[i].user.name)
      }
    }
    const frequencyMap = usersName.reduce((acc, user) => {
      acc[user] = (acc[user] || 0) + 1;
      return acc;
    }, {});
    const resultArray = Object.keys(frequencyMap).map(key => ({
      name: key,
      qtd: frequencyMap[key]
    }));
    dataUsers = resultArray.sort((a, b) => b.qtd - a.qtd)
    for(let j = 0; j < 12; j++){
      if(usersNameByMonth[j].length > 0){
        const frequencyMap = usersName.reduce((acc, item) => {
          acc[item] = (acc[item] || 0) + 1;
          return acc;
        }, {});
        const resultArray = Object.keys(frequencyMap).map(key => ({
          name: key,
          qtd: frequencyMap[key]
        }));
        usersNameByMonth[j] = resultArray.sort((a, b) => b.qtd - a.qtd)
        labels.mostRequesters[1][j] = usersNameByMonth[j].map(item => item.name); 
        datasets.mostRequestersTime[1][j] = usersNameByMonth[j].map(item => item.qtd);
      }
    }
    labels.mostRequesters[0] = dataUsers.map(item => item.name);
    datasets.mostRequestersTime[0] = dataUsers.map(item => item.qtd);
    count++;
    allRequests = await getRequests(userStore, count);
}while(count < allRequests.totalPages)

const currentIndex = ref(0);
const currentLabelName = ref('Itens mais solicitados');
const currentDataType = ref('mostItems'); 
const currentDataTypeLabel = ref('Usuários com mais solicitações');

const chartData = ref({
  labels: labels[currentDataType.value][0].slice(0, 15),
  datasets: [
    {
      label: currentLabelName.value,
      backgroundColor: [
        "#4D0000", "#590000", "#650000", "#710800", "#7D1300",
        "#881D00", "#942800", "#A23500", "#AF4400", "#BB5801",
        "#C76D05", "#D4870F", "#E0A21A", "#EBC334", "#FED51E"
      ],
      data: datasets[currentDataType.value + 'Time'][0].slice(0, 15),
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
      labels: labels[currentDataType.value][0].slice(0, 15),
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: datasets[currentDataType.value + 'Time'][0].slice(0, 15),
        },
      ],
    };
  } else {
    currentIndex.value = 1;
    chartData.value = {
      ...chartData.value,
      labels: labels[currentDataType.value][1][monthIndex - 1] === undefined ? [] : labels[currentDataType.value][1][monthIndex - 1].slice(0, 15),
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: datasets[currentDataType.value + 'Time'][1][monthIndex - 1] === undefined ? [] : datasets[currentDataType.value + 'Time'][1][monthIndex - 1].slice(0, 15),
        },
      ],
    }
  }
};

const toggleDataType = () => {
  currentDataType.value = currentDataType.value === 'mostItems' ? 'mostRequesters' : 'mostItems';
  currentLabelName.value = currentDataType.value === 'mostItems' ? 'Itens mais solicitados' : 'Usuários com mais solicitações';
  currentDataTypeLabel.value = currentDataType.value === 'mostItems' ? 'Usuários com mais solicitações' : 'Itens mais solicitados';
  changeLabel(currentIndex.value ? currentIndex.value : -1);
};

onMounted(async () => {
  /*
  if (store.isMobile) {
    const btnText = document.querySelectorAll('.filter-btn');
    const dropdownToggle = document.querySelector('.dropdown-principal');
    dropdownToggle. removeAttribute('data-bs-auto-close');
    dropdownToggle.setAttribute('data-bs-auto-close', 'outside');
    btnText.forEach(element => element.style.fontSize = '9px');
  }
  */
});
</script>




<style scoped>
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
  border-radius: 20px;
  font-size: 13px;
}
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
  left: -55px;
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
  color: white !important; 
  background-color: #0B3B69 !important; 
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
@media screen and (max-width: 500px){
  .graph-header{
    display: block !important;
  }
}
</style>