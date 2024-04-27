<template>
  <div class="container col-1 d-block" style="margin-left: 170px;">
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
      <p>Sobre</p>
  </div>
</template>
<script setup>
import { inject } from 'vue';

const setpageTitle = inject('setpageTitle');

const sendDataToParent = () => {
    const data = "Inventário";
    setpageTitle(data);
};
sendDataToParent();
</script>
