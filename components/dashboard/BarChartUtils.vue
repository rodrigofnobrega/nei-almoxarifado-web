<template>
  <div class="d-flex mb-3 justify-content-start align-items-center chart-filter">
    <div class="dropdown mx-2">
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Período
      </button>
      <ul class="dropdown-menu">
        <li @click="changeData('mostItemsTime')" type="button" class="dropdown-item">Mensal</li>
        <li @click="changeData('mostRequestersTiem')" type="button" class="dropdown-item">Semanal</li>
      </ul>
    </div>
    <div class="dropdown mx-2">
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dados</button>
      <ul class="dropdown-menu">
        <li @click="changeLabel('mostItems')" type="button" class="dropdown-item">Itens mais solicitados</li>
        <li @click="changeLabel('mostRequesters')" type="button" class="dropdown-item">Pessoas com mais solicitações</li>
      </ul>
    </div>
  </div>
  <div>
    <Bar class="chart-graph" :data="chartData" :options="chartOptions" />
  </div>
</template>
  
<script setup>
import { ref, watch, onUpdated, onBeforeUpdate } from 'vue';
import { Bar, Chart } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  BarElement,
  CategoryScale,
  LinearScale
);

const labels = {
  mostItems: ['Folha A4', 'bombril', 'vassoura', 'esponja', 'desinfetante', 'grampos', 'canetas', 'cargas de piloto', 'pilotos', 'quadros', 'sacolas plásticas', 'papelão'],
  mostRequesters: ['Cláudio', 'Ana', 'Amauri', 'Fernando', 'Aluísio', 'Ferreira', 'César', 'Rômulo', 'Anastásia', 'Valdemiro', 'Ramiro', 'Marcos', 'Márcia']
};

const datasets = {
  mostItemsTime: [[300, 250, 220, 200, 160, 150, 140, 100, 80, 70, 50, 20], [330, 200, 120, 100, 90, 50, 40, 36, 32, 20, 10, 9, 3]],
  mostRequestersTiem: [[0, 0, 50, 100, 140, 100, 40, 0, 20, 10, 100, 0], [0, 0, 20, 50, 10, 10, 20, 0, 10, 5, 0, 0]],  
};

const currentData = ref([]);
const currentLabel = ref([]);
const currentIndex = ref(0);
const currentLabelName = ref('');
currentLabel.value = labels.mostItems;
currentData.value = datasets.mostItemsTime;
currentLabelName.value = 'Itens mais solicitados';
const chartData = ref({
  labels: currentLabel.value,
  datasets: [
    {
      label: currentLabelName.value,
      backgroundColor: '#0B3B69',
      data: currentData.value[currentIndex.value]
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
  }
});

const changeLabel = (labelType) => {
  if(labelType === 'mostItems'){
    currentIndex.value = 0;
    currentLabelName.value = 'Itens mais solicitados';
  } else if(labelType === 'mostRequesters'){
    currentIndex.value = 1;
    currentLabelName.value = 'Pessoas com mais solicitações';
  }
  currentLabel.value = labels[labelType]
  chartData.value = {
    ...chartData.value,
    labels: currentLabel.value,
    datasets: [
      {
        ...chartData.value.datasets[0],
        label: currentLabelName.value, 
        data: currentData.value[currentIndex.value]
      }
    ]
  }
};
  
  
const changeData = (dataType) => {
  if(dataType === 'mostItemsTime'){
    currentIndex.value = 0;
  } else if(dataType === 'mostRequestersTiem'){
    currentIndex.value = 1;
  };
  currentData.value = datasets[dataType];
  chartData.value = {
    ...chartData.value,
    labels: currentLabel.value,
    datasets: [
      {
        ...chartData.value.datasets[0],
        label: currentLabelName.value,
        data: currentData.value[currentIndex.value]
      }
    ]
  }
};
  
</script>

<style scoped>
.chart-graph {
  height: 300px;
}
</style>
  