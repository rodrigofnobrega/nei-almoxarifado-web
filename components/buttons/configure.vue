<template>
    <TooltipsRectangular class="d-flex justify-content-start align-items-end ms-4 mt-2" :toolTipState="toolTip" :toolTipText="'Configurações de Página'"/>
    <div class="dropdown">
        <button @mouseover="toolTip = true" @mouseout="toolTip = false" @focusin="colorFocus" @focusout="colorUnfocus" class="filter-btn action-btn d-flex btn btn-outline-ligth text-dark-emphasis mx-1 px-2" data-bs-toggle="dropdown" data-bs-close="outside" data-bs-offset="0,2" aria-expanded="false">
            Mais ações
            <IconsSettings class="mx-1" width="1.5em" height="1.5em"/>
        </button>
        <ul class="dropdown-menu large-menu py-0">
            <li class="dropdown-item form-check d-flex py-2 justify-content-between align-items-center ps-2 pe-0">
                <label class="form-check-label" for="editCheck">habilitar edição</label>
                <input v-model="store.isEditionMode" @click="store.isEditionMode = !store.isEditionMode" class="form-check-input me-2" value="" id="editCheck" type="checkbox">
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


const setItemsFilter = inject('setItemsFilter')
const sendDataToParent = (filter, isInverted) => {
    setItemsFilter(filter, isInverted)
}

onMounted(() => {
    if(store.isMobile){
        const btnText = document.querySelectorAll('.filter-btn');
        btnText.forEach(element => element.style.fontSize = '9px');
    }
})
</script>

<style scoped>
.large-menu{
    height: 40px;
    width: 140px;
    min-width: 110px;
}
li{
    list-style-type: none;
}
.dropdown-item{
    font-size: 14px;
}
.form-check-input{
    border: 1px solid rgb(0, 0, 0, 0.3);
}
.dropdown-menu{
    border: 1px solid rgb(0, 0, 0, 0.3)
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
    color: white !important; 
    background-color: #0B3B69 !important; 
}
.form-check-input:active{
    background-color: #1F69B1 !important;
}
.form-check-input:checked{
    background-color: #1F69B1 !important;
}
.btn-transparent:hover{
    color: white;
    background-color: #FED51E;
}
@media screen and (max-width: 820px){
    .action-btn{
        font-size: 12px;
    }
    .filter-btn{
        font-size: 12px;
    }
    .action-icon{
        width: 15px;
        height: 15px;
    }
    .dropdown-item{
        font-size: 11px;
    }
}
</style>