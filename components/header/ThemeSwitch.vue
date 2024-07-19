<template>
    <div class="form-check form-switch">
        <input @click="themeSwitch" v-model="teste" class="form-check-input shadow-none" type="checkbox" role="switch" id="flexSwitchCheckDefault"> 
    </div>
</template>

<script setup>
import {ref} from 'vue';
import { useSettingsStore } from '../../stores/settings.ts';

const settingsStore = useSettingsStore();

const teste = ref(settingsStore.layout === 1 ? true : false);
const themeSwitch = () => {
    teste.value === false ? settingsStore.layout = 1 : settingsStore.layout = 0;
}
</script>

<style scoped>
.form-check-input{
    padding: 8px;
}

</style>    