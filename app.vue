<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const itemModals = document.getElementsByClassName("modal-header");
  for (let i = 1; i < itemModals.length; i++) {
    itemModals[i].classList.add("small");
  }
});



</script>