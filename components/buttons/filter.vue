<template>
    <div class="dropdown">
        <button @focusin="colorFocus" @focusout="colorUnfocus" class="action-btn d-flex btn btn-outline-ligth text-dark-emphasis mx-1 px-2" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outsite" aria-expanded="false">
            Filtro
            <IconsFilter class="mx-1" width="1.5em" height="1.5em"/>
        </button>
        <ul class="dropdown-menu large-menu">
            <li>
                <div class="vue-dropdown" @mouseover="toggleDropdown(0)" @mouseout="toggleDropdown(0)">
                    <div class="large-menu-btn d-flex justify-content-between btn d-flex align-items-center border-0" type="button">
                        Atualização
                        <IconsSort />
                    </div>
                    <ul class="vue-dropdown-menu" v-show="dropdownStates[0]">
                        <li class="small-menu">
                            <div @click="sendDataToParent('', false)" class="d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" type="button">
                                asc
                                <IconsUpArrow />
                            </div>
                            <div @click="sendDataToParent('', true)" class="d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" type="button">
                                dec
                                <IconsBottomArrow />
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="vue-dropdown" @mouseover="toggleDropdown(1)" @mouseout="toggleDropdown(1)">
                    <div  class="large-menu-btn d-flex justify-content-between btn d-flex align-items-center border-0" type="button">
                        Criação
                        <IconsClock />
                    </div>
                    <ul class="vue-dropdown-menu" v-show="dropdownStates[1]">
                        <li class="small-menu">
                            <div @click="sendDataToParent('id,asc', false)" class="d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" type="button">
                                asc
                                <IconsUpArrow />
                            </div>
                            <div @click="sendDataToParent('id,desc', false)" class="d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" type="button">
                                dec
                                <IconsBottomArrow />
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="vue-dropdown" @mouseover="toggleDropdown(2)" @mouseout="toggleDropdown(2)">
                    <div class="large-menu-btn d-flex justify-content-between btn d-flex align-items-center border-0" type="button">
                        Nome
                        <IconsNameSort />
                    </div>
                    <ul class="vue-dropdown-menu" v-show="dropdownStates[2]">
                        <li class="small-menu">
                            <div @click="sendDataToParent('name,asc', false)" class="d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" type="button">
                                asc
                                <IconsUpArrow />
                            </div>
                            <div @click="sendDataToParent('name,desc', false)" class="d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" type="button">
                                dec
                                <IconsBottomArrow />
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="vue-dropdown" @mouseover="toggleDropdown(3)" @mouseout="toggleDropdown(3)">
                    <div class="large-menu-btn d-flex justify-content-between btn d-flex align-items-center border-0" type="button">
                        Quantidade
                        <IconsQuantitySort />
                    </div>
                    <ul class="vue-dropdown-menu" v-show="dropdownStates[3]">
                        <li class="small-menu">
                            <div @click="sendDataToParent('quantity,asc', false)" class="d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" type="button">
                                asc
                                <IconsUpArrow />
                            </div>
                            <div @click="sendDataToParent('quantity,desc', false)" class="d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" type="button">
                                dec
                                <IconsBottomArrow />
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>   
    </div>  
</template>

<script setup>
import { inject } from 'vue';
import { getItems } from '../../services/items/itemsGET';
import { useUser } from '../../stores/user';

const dropdownStates = ref([false, false, false, false]);
const toggleDropdown = (dropdown_id) => {
    dropdownStates.value[dropdown_id] = !dropdownStates.value[dropdown_id]
}

const userStore = useUser();
const res = await getItems(userStore, 0)


const setItemsFilter = inject('setItemsFilter')
const sendDataToParent = (filter, isInverted) => {
    setItemsFilter(filter, isInverted)
}
</script>

<style scoped>
li{
    list-style-type: none;
}
.large-menu{
    width: 136px !important;
    min-width: 40px;
}
.small-menu{
    background-color: white;
    border-radius: 12px;
    border: 1px #D9D9D9 solid;
    position: absolute;
    margin-top: -55px;
    left: 127px;
    width: 65px;
    height: 65px;
    min-width: 40px;
}
.dropdown-item{
    width: 130px;
    padding: 0px;
}
.large-menu-btn{
    font-size: 14px;
}
.btn-transparent{
    font-size: 14px;
}
.action-btn{
    border: none;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 1px ridge #1F69B1;
}
.btn-transparent:hover{
    color: white;
    background-color: #FED51E;
}
.btn-outline-ligth:hover{
    color: white !important; 
    background-color: #0B3B69 !important; 
}
@media screen and (max-width: 820px){
    .action-btn{
        font-size: 12px !important;
    }
}
</style>