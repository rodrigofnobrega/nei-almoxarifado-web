<template>
    <div>
      <p>Contagem: {{ store.count }}</p>
      <button @click="store.increment">Incrementar</button>
      <button @click="store.decrement">Decrementar</button>
      <p>Contagem: {{ store.count }}</p>
    </div>
</template>
  
<script setup>
  import { useCounterStore } from '~/stores/counter.ts';
  const store = useCounterStore();
</script>