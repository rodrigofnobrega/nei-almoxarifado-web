<template>
  <div class="d-flex mb-3 justify-content-start align-items-center chart-filter">
    <div class="dropdown mx-2">
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dados
      </button>
      <ul class="dropdown-menu">
        <li @click="changeData('')" class="dropdown-item">Quantidade geral de itens solicitados</li>
        <li @click="changeData('items')" class="dropdown-item">Itens mais solicitados</li>
        <li @click="changeData('')" class="dropdown-item">Maiores solicitadores</li>
      </ul>
    </div>
    <div class="dropdown mx-2">
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Período</button>
      <ul class="dropdown-menu">
        <li @click="changeLabel('month', datasets.requests.requestsQtdMonth)" type="button" class="dropdown-item">Mês</li>
        <li @click="changeLabel('week', datasets.requests.requestdQtdWeek)" type="button" class="dropdown-item">Semanas (mês atual)</li>
      </ul>
    </div>
  </div>
  <div>
    <Bar class="chart-graph" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch, onUpdated, onBeforeUpdate } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
const isLoading = ref(false);
const labels = {
  month: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  week: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana']
};

const datasets = {
  requests: {
    requestsQtdMonth:[0, 0, 100, 200, 300, 200, 100, 0, 100, 200, 300, 0],
    requestdQtdWeek: [10, 10, 20, 30]
  },
  requestedItems: {
    requestedItemsMonth:['Luva', 'Vassoura', 'Fogão EletroLux', 'Teste', 'Teste', 'Teste', 'Teste', 'Teste', 'Teste', 'Teste', 'Teste', 'Teste'],
    requestedItemsWeek: ['Anduin', 'Malfurion', 20, 30]
  }
}
const chartData = ref({
  labels: labels.month,
  datasets: [
    {
      label: 'Quantidade Solicitada',
      backgroundColor: '#0B3B69',
      data: datasets.requests.requestsQtdMonth
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

const changeLabel = (labelType, dataType) => {
  chartData.value = {
    ...chartData.value,
    labels: labels[labelType],
    datasets: [
      {
        ...chartData.value.datasets[0],
        label: 'Teste', 
        data: dataType
      }
    ]
  };
};

</script>

<style scoped>
.chart-graph {
  height: 300px;
}
</style>
