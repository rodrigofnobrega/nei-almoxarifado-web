<template>
    <div v-show="isLoading" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue';

const isLoading = ref(true);

onBeforeMount(() => {
  isLoading.value = false
})
</script>