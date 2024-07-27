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
.form-check{
    padding-top: 8px;
    margin-bottom: -1px;
    height: 45px;
    transition: box-shadow 0.4s ease, border-bottom 0.4s ease-in-out;
}
.form-check:hover{
  border-bottom: solid 1px #FED51E;
  box-shadow: inset 0px -12px 15px -13px rgb(254, 213, 30, 0.7);
}
</style>    