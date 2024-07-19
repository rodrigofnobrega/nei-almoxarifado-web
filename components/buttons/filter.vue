<template>
    <div class="dropdown">
    <button @click.stop @mouseover="toolTip = true" @mouseout="toolTip = false" @focusin="colorFocus" @focusout="colorUnfocus" class="dropdown-principal filter-btn action-btn d-flex btn btn-outline-ligth mx-1 px-2"  data-bs-toggle="dropdown" data-bs-close="inside" data-bs-offset="0,2" aria-expanded="false">
            Filtro
            <IconsFilter class="mx-1" width="1.5em" height="1.5em"/>
        </button>
        <ul class="dropdown-menu large-menu">
            <li>
                <div class="vue-dropdown" @click="ClicktoggleDropdown(0)" @mouseover="toggleDropdown(0)" @mouseout="toggleDropdown(0)">
                    <div class="filter-btn large-menu-btn d-flex justify-content-between btn align-items-center border-0" type="button">
                        atualização
                        <IconsSort class="action-icon"/>    
                    </div>
                    <ul class="vue-dropdown-menu" v-show="dropdownStates[0]">
                        <li class="small-menu">
                            <div @click="sendDataToParent('', false)" class="filter-btn d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" style="border-radius: 10px 10px 0px 0px !important;" type="button">
                                asc 
                                <IconsUpArrow class="action-icon"/>
                            </div>
                            <div @click="sendDataToParent('', true)" class="filter-btn d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" style="border-radius: 0px 0px 10px 10px;" type="button">
                                dec
                                <IconsBottomArrow class="action-icon"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="vue-dropdown" @click="ClicktoggleDropdown(1)"  @mouseover="toggleDropdown(1)" @mouseout="toggleDropdown(1)">
                    <div  class="filter-btn large-menu-btn d-flex justify-content-between btn align-items-center border-0" type="button">
                        criação
                        <IconsClock class="action-icon"/>
                    </div>
                    <ul class="vue-dropdown-menu" v-show="dropdownStates[1]">
                        <li class="small-menu">
                            <div @click="sendDataToParent('id,asc', false)" class="filter-btn d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" style="border-radius: 10px 10px 0px 0px;" type="button">
                                asc
                                <IconsUpArrow class="action-icon"/>
                            </div>
                            <div @click="sendDataToParent('id,desc', false)" class="filter-btn d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" style="border-radius: 0px 0px 10px 10px;" type="button">
                                dec
                                <IconsBottomArrow class="action-icon"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="vue-dropdown"  @click="ClicktoggleDropdown(2)"  @mouseover="toggleDropdown(2)" @mouseout="toggleDropdown(2)">
                    <div class="filter-btn large-menu-btn d-flex justify-content-between btn align-items-center border-0" type="button">
                        nome
                        <IconsNameSort class="action-icon"/>
                    </div>
                    <ul class="vue-dropdown-menu" v-show="dropdownStates[2]">
                        <li class="small-menu">
                            <div @click="sendDataToParent('name,asc', false)" class="filter-btn d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" style="border-radius: 10px 10px 0px 0px;" type="button">
                                asc
                                <IconsUpArrow class="action-icon"/>
                            </div>
                            <div @click="sendDataToParent('name,desc', false)" class="filter-btn d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" style="border-radius: 0px 0px 10px 10px;" type="button">
                                dec
                                <IconsBottomArrow class="action-icon"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="vue-dropdown" @click="ClicktoggleDropdown(3)"  @mouseover="toggleDropdown(3)" @mouseout="toggleDropdown(3)">
                    <div class="filter-btn large-menu-btn d-flex justify-content-between btn align-items-center border-0" type="button">
                        quantidade
                        <IconsQuantitySort class="action-icon"/>
                    </div>
                    <ul class="vue-dropdown-menu" v-show="dropdownStates[3]">
                        <li class="small-menu">
                            <div @click="sendDataToParent('quantity,asc', false)" class="filter-btn d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" style="border-radius: 10px 10px 0px 0px;" type="button">
                                asc
                                <IconsUpArrow class="action-icon"/>
                            </div>
                            <div @click="sendDataToParent('quantity,desc', false)" class="filter-btn d-flex justify-content-between text-align-center align-items-center btn btn-transparent border-0" style="border-radius: 0px 0px 10px 10px;" type="button">
                                dec
                                <IconsBottomArrow class="action-icon"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>   
    </div>  
</template>

<script setup>
import { inject, onMounted} from 'vue';
import { useUser } from '../../stores/user';
import { useStorageStore } from '../../stores/storage';



const toolTip = ref(false);
const store = useStorageStore();

const dropdownStates = ref([false, false, false, false]);
const toggleDropdown = (dropdown_id) => {
    dropdownStates.value[dropdown_id-1] = false
    dropdownStates.value[dropdown_id] = !dropdownStates.value[dropdown_id]
    dropdownStates.value[dropdown_id+1] = false
}
const ClicktoggleDropdown = (dropdown_id) => {
    if(!store.isMobile){
        return 0
    }
    dropdownStates.value[dropdown_id-1] = false
    dropdownStates.value[dropdown_id] = !dropdownStates.value[dropdown_id]
    dropdownStates.value[dropdown_id+1] = false
}

const setItemsFilter = inject('setItemsFilter')
const sendDataToParent = (filter, isInverted) => {
    setItemsFilter(filter, isInverted)
}

onMounted(() => {
    if(store.isMobile){
        const btnText = document.querySelectorAll('.filter-btn');
        const dropdownToggle = document.querySelector('.dropdown-principal');
        dropdownToggle.removeAttribute('data-bs-auto-close')
        dropdownToggle.setAttribute('data-bs-auto-close', 'outside')
        btnText.forEach(element => element.style.fontSize = '9px');
    }
})
</script>

<style scoped>
li{
    list-style-type: none;
}
.large-menu{
    width: 136px;
    min-width: 40px;
}
.small-menu{
    background-color: white;
    border-radius: 12px;
    border: 1px #D9D9D9 solid;
    position: absolute;
    margin-top: -55px;
    left: 128px;
    width: 65px;
    height: 65px;
    min-width: 40px;
}

.dropdown-item{
    width: 130px;
    padding: 0px;
    font-size: 14px;
}
.large-menu-btn{
    font-size: 14px;
}
.btn-transparent{
    font-size: 14px;
}
.action-btn{
    font-weight: 500;
    font-size: 15px;
    border: none;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 1px ridge #1F69B1;
}
.btn-outline-ligth{
    box-shadow: inset 0px -12px 15px -18px rgb(11, 59, 105, 0.7);
    color: rgb(0, 0, 0, 0.7); 
}
.btn-outline-ligth:hover{
    color: white; 
    background-color: #0B3B69; 
}
.btn-transparent:hover{
    color: white;
    background-color: #FED51E;
}
.action-btn:hover{
    opacity: 90%;
}
@media screen and (max-width: 820px){
    .action-btn{
        font-size: 12px;
    }
    .filter-btn{
        font-size: 12px;
    }
    .large-menu{
        padding: 0;
        width: 100px !important;
    }
    .small-menu{
        width: 60px;
        margin-top: -40px;
        height: 50px;
        padding: 0;
        left: 128px;
    }
    .small-menu .filter-btn{
        margin-top: 0px;
        margin-bottom: -4px;  
    }
    .action-icon{
        width: 15px;
        height: 15px;
    }
}
</style>