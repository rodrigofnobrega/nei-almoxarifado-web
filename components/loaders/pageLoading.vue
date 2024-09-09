<template>
    <div :class="{'hide': !props.isLoading }" class="spinner-container position-fixed">
        <div class="spinner-border text-light-emphasis" role="status">
            <span class="visually-hidden">Carregando...</span>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useStorageStore } from '../../stores/storage';
const props = defineProps({
    isLoading: {
        type: Boolean,
        required: true
    }
})
</script>

<style scoped>
.hide{
    display: none !important;
}
.spinner-container{ 
    background-color: rgb(0, 0, 0, 0.4);    
    z-index: 10000;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center !important;
    align-items: center !important;
}
.spinner-border{
    padding: 50px; 
}
</style>
