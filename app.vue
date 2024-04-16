<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useStorageStore } from './stores/storage';
import { onBeforeMount } from 'vue';
import  itemsJson  from '/static/items.json';
import fs from 'fs';

const store = useStorageStore();
if(process.server){
  try{
    const dados = await $fetch('/api/read-items');
    fs.writeFile('static/items.json', JSON.stringify(dados.body, null, 2), (err) => {});
    store.items = dados.body;
  } catch(err){};
}




</script>