<template>
    <div class="container-fluid d-flex  col-1 justify-content-center">
        Configurações
    </div>

</template>

<script setup>
import { inject } from 'vue';

const setpageTitle = inject('setpageTitle');

const sendDataToParent = () => {
    const data = "Configurações";
    setpageTitle(data);
};
sendDataToParent();


</script>
