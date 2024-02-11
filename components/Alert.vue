<template>
    <header>
        <div>TESTE</div>
        <button class="btn btn-primary" @click="store.increment">Incrementar</button>
        <button class="btn btn-primary" @click="store.decrement">Decrementar</button>
        <p>Contagem: {{ store.count }}</p>
        <p class="m-5 text-danger">Dobro da contagem: {{store.doubleCount}} </p>
    </header>
</template>

<script setup>
  import { useCounterStore } from '~/stores/counter.ts';
  const store = useCounterStore();
</script>