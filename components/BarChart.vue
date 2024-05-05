<template>
    <bar-chart :data="data" :options="options"></bar-chart>
  </template>
  
  <script>
  import { Bar, mixins } from 'vue-chartjs'
  
  export default {
    extends: Bar,
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
  </script>
  