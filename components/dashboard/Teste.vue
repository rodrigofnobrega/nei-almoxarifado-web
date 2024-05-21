<template>
  <div class="d-flex mb-3 justify-content-start align-items-center chart-filter">
    <div class="dropdown mx-2">
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Período</button>
      <ul class="dropdown-menu">
        <li @click="changeLabel(0)" type="button" class="dropdown-item">Janeiro</li>
        <li @click="changeLabel(1)" type="button" class="dropdown-item">Fevereiro</li>
        <li @click="changeLabel(2)" type="button" class="dropdown-item">Março</li>
        <li @click="changeLabel(3)" type="button" class="dropdown-item">Abril</li>
        <li @click="changeLabel(4)" type="button" class="dropdown-item">Maio</li>
        <li @click="changeLabel(5)" type="button" class="dropdown-item">Junho</li>
        <li @click="changeLabel(6)" type="button" class="dropdown-item">Julho</li>
        <li @click="changeLabel(7)" type="button" class="dropdown-item">Agosto</li>
        <li @click="changeLabel(8)" type="button" class="dropdown-item">Setembro</li>
        <li @click="changeLabel(9)" type="button" class="dropdown-item">Outubro</li>
        <li @click="changeLabel(10)" type="button" class="dropdown-item">Novembro</li>
        <li @click="changeLabel(11)" type="button" class="dropdown-item">Dezembro</li>
      </ul>
    </div>
  </div>
  <div class="chart-container">
    <div class="chart-graph-wrapper" v-for="(data, index) in pieDataSets" :key="index">
      <Chart class="chart-graph" :data="data" :options="chartOptions" :type="'pie'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Chart } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  ArcElement, 
  CategoryScale,
  LinearScale,
  Filler 
);
const months = [
  'Janeiro', 
  'Fevereiro', 
  'Março', 
  'Abril', 
  'Maio', 
  'Junho', 
  'Julho', 
  'Agosto', 
  'Setembro', 
  'Outubro', 
  'Novembro', 
  'Dezembro'
];

const labels = [
              ['Papel A4', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'], 
              ['Papel A3', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'],
              ['Papel A2', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'],
              ['Papel A1', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'],
              ['Papel A0', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'],
              ['Papel A', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'],
              ['Papel A', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'],
              ['Papel A', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'],
              ['Papel A', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'],
              ['Papel A', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'],
              ['Papel A', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'],
              ['Papel A', 'Esponja', 'Desinfetante', 'Sacolas plásticas', 'Canetas', 'Carga de piloto'],
            ];

const datasets = [
  [100, 200, 300, 200, 100, 120],
  [600, 200, 300, 200, 100, 120],
  [400, 200, 300, 200, 100, 120],
  [800, 200, 300, 200, 100, 120],
  [300, 200, 300, 200, 100, 120],
  [1200, 200, 300, 200, 100, 120],
  [100, 200, 300, 200, 100, 120],
  [100, 200, 300, 200, 100, 120],
  [100, 200, 300, 200, 100, 120],
  [100, 200, 300, 200, 100, 120],
  [100, 200, 300, 200, 100, 120],
  [100, 200, 300, 200, 100, 120],
];

const pieDataSets = ref([
  {
    labels: labels[0],
    datasets: [
      {
        label: 'Itens mais usados de Janeiro',
        backgroundColor: ['#FED51E', '#0B3B69', '#1F69B1', '#9a0d6f', '#6f3b54', '#3b6f5e'],
        data: datasets[0]
      }
    ]
  },
]);

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: (ctx) => ctx.chart.data.datasets[0].label,
      position: 'top',
      padding: {
        top: 0,
        bottom: 6
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        padding: 5,
      }
    }
  }
});

const changeLabel = (index) => {
  pieDataSets.value = [{
    labels: labels[index],
    datasets: [
      {
        ...pieDataSets.value[0].datasets[0],
        label: `Itens mais usados de ${months[index]}`,
        data: datasets[index]
      }
    ]
  }];
};
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.chart-graph-wrapper {
  flex: 1 1 300px;
  max-width: 400px;
}

.chart-graph {
  height: 300px;
}
</style>
