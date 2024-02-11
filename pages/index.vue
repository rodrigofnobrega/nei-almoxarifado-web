<template>
    <div>
      <Alert />
      <button @click="store.increment">Incrementar</button>
      <button @click="store.decrement">Decrementar</button>
      <p>Contagem: {{ store.count }}</p>
    </div>
</template>
  
<script setup>
  import { useCounterStore } from '~/stores/counter.ts';
  const store = useCounterStore();
  const response = await $fetch('/api/hello');
  console.log(response);
  const { data: products } = await useFetch('/api/products', {
    

  });
  console.log(toRaw(products.value));
</script>