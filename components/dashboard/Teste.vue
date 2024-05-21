<template>
  <div class="d-flex mb-3 justify-content-start align-items-center chart-filter">
    <div class="dropdown mx-2">
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dados
      </button>
      <ul class="dropdown-menu">
        <li class="dropdown-item">Quantidade geral de itens solicitados</li>
        <li class="dropdown-item">Itens mais solicitados</li>
        <li class="dropdown-item">Maiores solicitadores</li>
      </ul>
    </div>
    <div class="dropdown mx-2">
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Período</button>
      <ul class="dropdown-menu">
        <li @click="changeLabel('month')" type="button" class="dropdown-item">Mês</li>
        <li @click="changeLabel('week')" type="button" class="dropdown-item">Semanas (mês atual)</li>
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

const labels = {
  month: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  week: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana']
};

const datasets = {
  month: [0, 0, 100, 200, 300, 200, 100, 0, 100, 200, 300, 0],
  week: [0, 10, 20, 30],
  lineMonth: [50, 150, 250, 200, 300, 250, 150, 100, 200, 300, 400, 100],
  lineWeek: [5, 15, 25, 35],
  pieMonth: [300, 50, 100, 150, 200, 250],
  pieWeek: [75, 25, 50, 100]
};

const pieDataSets = ref([
  {
    labels: ['Arapuca', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5', 'Categoria 6'],
    datasets: [
      {
        label: 'Itens mais usados de ',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF'],
        data: datasets.pieMonth
      }
    ]
  },
  {
    labels: ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5', 'Categoria 6'],
    datasets: [
      {
        label: 'Distribuição de Categorias',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF'],
        data: datasets.pieMonth
      }
    ]
  },
  {
    labels: ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5', 'Categoria 6'],
    datasets: [
      {
        label: 'Distribuição de Categorias',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF'],
        data: datasets.pieMonth
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

const changeLabel = (labelType) => {
  barLineData.value = {
    ...barLineData.value,
    labels: labels[labelType],
    datasets: [
      {
        ...barLineData.value.datasets[0],
        data: datasets[labelType]
      },
      {
        ...barLineData.value.datasets[1],
        data: labelType === 'month' ? datasets.lineMonth : datasets.lineWeek
      }
    ]
  };

  pieDataSets.value = pieDataSets.value.map((data) => ({
    ...data,
    datasets: [
      {
        ...data.datasets[0],
        data: labelType === 'month' ? datasets.pieMonth : datasets.pieWeek
      }
    ]
  }));
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
  height: 200px;
}
</style>
