<template>
    <div>
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
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
  import { ref } from 'vue';
  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );
  
  const chartData = ref({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: 'rgba(247, 121, 121, 0.5)',
        borderColor: '#f87979',
        borderWidth: 2,
        data: [40, 20, 12, 50, 10],
      },
      {
        label: 'Data Two',
        backgroundColor: 'rgba(122, 203, 249, 0.5)',
        borderColor: '#7acbf9',
        borderWidth: 2,
        data: [30, 25, 40, 35, 20],
      },
    ],
  });
  
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart Title',
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        footerColor: '#fff',
        displayColors: false,
        callbacks: {
          label: function (tooltipItem) {
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
          color: '#911',
          font: {
            size: 20,
            weight: 'bold',
          },
        },
        ticks: {
          color: '#911',
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values',
          color: '#191',
          font: {
            size: 20,
            weight: 'bold',
          },
        },
        ticks: {
          color: '#191',
          font: {
            size: 14,
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutBounce',
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const label = chartData.value.labels[elementIndex];
        const value = chartData.value.datasets[0].data[elementIndex];
        alert(`Label: ${label}, Value: ${value}`);
      }
    },
  });
  </script>
  
  <style scoped>
  /* Adicione seu estilo aqui, se necessário */
  </style>
  