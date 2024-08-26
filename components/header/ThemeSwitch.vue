<template>
    <div class="form-check mx-0 px-0 form-switch">
        <input @click="themeSwitch" v-model="isDark" class="form-check-input shadow-none mx-0" type="checkbox" role="switch" id="flexSwitchCheckDefault"> 
    </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import { useSettingsStore } from '../../stores/settings.ts';

const settingsStore = useSettingsStore();

const isDark = computed(() => {
    return settingsStore.layout == 2 ? true : false;
})
const themeSwitch = () => {
    isDark.value === false ? settingsStore.layout = 2 : settingsStore.layout = 0;
}
</script>

<style scoped>
.form-check{
    margin-right: -10px !important;
    padding-top: 8px;
    margin-bottom: -1px;
    height: 45px;
    transition: box-shadow 0.4s ease, border-bottom 0.4s ease-in-out;
}
.form-check-input{
    padding: 8px;
    margin-right: -10px;
}
.form-check:hover{
  border-bottom: solid 1px #FED51E;
  box-shadow: inset 0px -12px 15px -13px rgb(254, 213, 30, 0.7);
}
</style>    