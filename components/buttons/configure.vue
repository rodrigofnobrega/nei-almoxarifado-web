<template>
    <div class="dropdown">
        <button @mouseover="toolTip = true" @mouseout="toolTip = false" @focusin="colorFocus" @focusout="colorUnfocus" class="filter-btn action-btn d-flex btn btn-outline-ligth mx-1 px-2 mt-1" data-bs-toggle="dropdown" data-bs-close="outside" data-bs-offset="0,2" aria-expanded="false">
            Mais ações
            <IconsSettings class="mx-1" width="1.5em" height="1.5em"/>
        </button>
        <ul class="dropdown-menu large-menu py-0">
            <li class="dropdown-item form-check d-flex py-2 justify-content-between align-items-center ps-2 pe-0">
                <label class="form-check-label" for="editCheck">habilitar edição</label>
                <input v-model="store.isEditionMode" @click="store.isEditionMode = !store.isEditionMode" class="form-check-input me-2" value="" id="editCheck" type="checkbox">
            </li>
            <li class="dropdown-item form-check d-flex py-2 justify-content-between align-items-center ps-2 pe-0 mb-0" style="padding-bottom: 4px;">
                <a type="button" class="text-decoration-none import-text" href="/catalogo/importar-tabelas">importar tabelas</a>
            </li>
        </ul>   
    </div>  
</template>

<script setup>
import { inject, onMounted} from 'vue';
import { useUser } from '../../stores/user';
import { useStorageStore } from '../../stores/storage';
import { postCreateItem } from '../../services/items/itemsPOST';
import * as XLSX from 'xlsx';


const toolTip = ref(false);
const store = useStorageStore();
const userStore = useUser();

const dropdownStates = ref([false, false, false, false]);
const toggleDropdown = (dropdown_id) => {
    
    dropdownStates.value[dropdown_id-1] = false
    dropdownStates.value[dropdown_id] = !dropdownStates.value[dropdown_id]
    dropdownStates.value[dropdown_id+1] = false
}

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const tableHeaders = jsonData[0];
        const tableData = jsonData.slice(1);
        for(let i = 0; i < tableData.length; i++){
            console.log(tableData[i][1], tableData[i][2], tableData[i][4] < 0 ? 0 : tableData[i][4])
            try{
                if(tableData[i][4] > 0){
                    let res = await postCreateItem(userStore, tableData[i][1], '', tableData[i][4], tableData[i][2]);
                }
            }catch(err){
                console.log(err)
            }
        }
    };
    reader.readAsArrayBuffer(file);
    store.isReloadItems = true;
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
    box-shadow: inset 0px -12px 15px -18px rgb(11, 59, 105, 0.7);
    color: rgb(0, 0, 0, 0.7); 
}
.btn-outline-ligth:hover{
    color: white; 
    background-color: #0B3B69; 
}
.form-check-input:active{
    background-color: #1F69B1 !important;
}
.form-check-input:checked{
    background-color: #1F69B1 !important;
}
.import-text{
    color: rgb(0, 0, 0, 0.9);
}
.dropdown-item:hover .import-text{
    color: white !important;
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
    .action-icon{
        width: 15px;
        height: 15px;
    }
    .dropdown-item{
        font-size: 11px;
    }
}
</style>