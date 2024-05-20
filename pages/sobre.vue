<template>
  <div>
    
  </div>
</template>
<script setup>
import { inject } from 'vue';

const setpageTitle = inject('setpageTitle');
const sendDataToParent = () => {
    const data = "Sobre";
    setpageTitle(data);
};
sendDataToParent();
</script>
