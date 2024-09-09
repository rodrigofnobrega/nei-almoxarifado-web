<template>
    <div v-show="props.isLoading" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue';
const props = defineProps({
    isLoading: {
        type: Boolean,
        required: true
    }
})

const isLoading = ref(true);

onBeforeMount(() => {
  isLoading.value = false
})
</script>