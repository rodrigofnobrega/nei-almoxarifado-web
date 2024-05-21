<template>
  <div class="d-flex mb-3 justify-content-start align-items-center chart-filter">
    <div class="dropdown mx-2">
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Período</button>
      <ul class="dropdown-menu">
        <li @click="changeLabel('month')" type="button" class="dropdown-item">Mês</li>
        <li @click="changeLabel('week')" type="button" class="dropdown-item">Semanas (mês atual)</li>
      </ul>
    </div>
  </div>
  <div>
    <Bar class="chart-graph" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch, onUpdated, onBeforeUpdate } from 'vue';
import { Bar, Line, Chart } from 'vue-chartjs';
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

const labels = {
  month: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  week: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana']
};

const datasets = {
  available: [400, 400, 200, 300, 200, 150, 100, 50, 100, 200, 300, 200, 100],
  requests: [[0, 0, 100, 200, 300, 200, 100, 0, 100, 200, 300, 0], [10, 10, 20, 30]],
  requestsAccepted: [[0, 0, 50, 100, 140, 100, 40, 0, 20, 10, 100, 0], [10, 2, 3, 4]],
  requestsRejected: [[0, 0, 50, 100, 160, 100, 60, 0, 180, 190, 200, 0], [10, 8, 17, 26]]
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

const changeLabel = (labelType) => {
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
      ]
    }
  }
};

</script>

<style scoped>
.chart-graph {
  height: 300px;
}
</style>
