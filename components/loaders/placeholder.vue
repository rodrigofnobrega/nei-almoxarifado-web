<template>
    <div v-show="isLoading">
        <p class="placeholder-glow">
            <span class="placeholder rounded-3 col-7"></span>
        </p>
    </div>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue';

const isLoading = ref(true);

onBeforeMount(() => {
  isLoading.value = false
})

</script>