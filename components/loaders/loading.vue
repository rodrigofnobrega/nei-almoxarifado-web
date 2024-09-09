<template>
    <div v-if="isLoading" class="spinner-border p-1" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</template>

<script setup>
import {ref, onBeforeMount, onMounted} from 'vue';

const isLoading = ref(true);

onMounted(() => {
  isLoading.value = false
})
</script>