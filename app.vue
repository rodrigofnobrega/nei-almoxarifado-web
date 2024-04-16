<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useStorageStore } from './stores/storage';
import { onMounted } from 'vue';

const store = useStorageStore();
if(process.server){
  try{
    const dados = await $fetch('/api/read-items');
    store.items = dados.body;
  } catch(err){};
}
onMounted(() => {
  const itemModals = document.getElementsByClassName("modal-header");
  for (let i = 1; i < itemModals.length; i++) {
    itemModals[i].classList.add("small");
  }
});



</script>