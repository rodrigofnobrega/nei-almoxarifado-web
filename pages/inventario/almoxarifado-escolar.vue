<template>
    <ModalItemDetails v-if="filteredItemsSize > 0" :item_index="itemIndex" :item_route="currentRoute" :item_details="currentItem" />
    <ModalItemHistory v-if="filteredItemsSize > 0" :item_history="currentItem"/>
    <div style="margin-left: 0.7%;">
        <div class="d-flex justify-content-between aling-items-center">
            <span class="d-flex align-items-center table-searchbar">
            <IconsSearchGlass class="search-glass"/>
            <input v-model="searchInput" class="searchbar form-control" placeholder="Pesquisar"/>          
            </span>
            <div class="d-flex">
                <ButtonsNewItem />
			    <ButtonsFilter class="m-0 p-0"/>
			    <ButtonsConfigure/>
            </div>
        </div>
    <div class="row d-block">
        <TablesTable>
            <template v-slot:items>
            <tr v-if="1 > 0" v-for="item in filteredItems.slice(num, num1)" :key="item.index">
               <th class="border" scope="row"><p>{{ item.name }}</p></th>
               <th class="border">
                    <p v-if="item.sipacCode">{{ item.sipacCode }}</p>
                    <p v-else>nenhum</p>
               </th>
                <th class="border">
                    <p>{{ item.type }}</p>
                </th>
               <th class="border">
                <p>{{ item.quantity }}</p>
                </th>
               <th>
                <p>[ ]</p>
               </th>
               <th class="end">
                    <button class="table-btn btn btn-primary" @click="showDetails(item.index)" data-bs-toggle="modal" data-bs-target="#itemDetailing">
                        Detalhes
                    </button>
                    <button class="table-btn btn btn-primary" @click="showHistory(item.index)" data-bs-toggle="modal" data-bs-target="#itemHistory">
                        Histórico
                    </button>
                </th>
             </tr>
             <div v-else class="warning-text d-flex aling-items-center justify-content-center">
                 <p class="text-dark-emphasis fs-5 opacity-50">Inventário vazio.</p>
             </div>
            </template>
        </TablesTable>
        <nav v-if="filteredItemsSize > 0" aria-label="Page navigation" class="mt-0 d-flex justify-content-center align-items-center" style="position: sticky;">
            <ul class="pagination mt-5 justify-content-center">
                <li class="page-item">
                    <button class="page-link bg-primary text-light" :class="{'bg-dark-emphasis disabled': num <= 0 && num1 <= 15}" id="backPageBtn" @click="backPage"><span aria-hidden="true">&laquo;</span></button>
                </li>
                <li class="page-item" v-for="i in paginationSize" :key="i-1">
                    <button class="page-link text-light" @click="page(i-1)" :class="{'bg-primary': !pagesFocus[i-1], 'bg-secondary': pagesFocus[i-1]}">{{ i }}</button>
                </li>
                <li class="page-item">
                    <button class="page-link bg-primary text-light" :class="{'bg-dark-emphasis disabled': num >= filteredItemsSize-15 && num1 >= filteredItemsSize}" id="fowardPageBtn" @click="fowardPage"><span aria-hidden="true">&raquo;</span></button>
                </li>
            </ul>
        </nav>
    </div>
</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useStorageStore } from '../../stores/storage';
import { ref, computed, onMounted, inject } from 'vue';
import axios from 'axios';
import { getItems } from '~/services/items/itemsGET';
const store = useStorageStore();

/*REFATORAR CÓDIGO*/ 
const dados = await getItems();
const sort = async () => {
    let temp = null;
    let stop = true;
    do{
        stop = true;
        for(let i = 0; i < dados.length-1; i++){
            if(dados[i].id > dados[i+1].id){
                temp = dados[i+1];
                dados[i+1] = dados[i];
                dados[i] = temp;
                stop = false;
            }
        }
    } while(stop == false);
};
sort()

store.items = dados;

const setpageTitle = inject('setpageTitle');

const sendDataToParent = () => {
    const data = "Almoxarifado Escolar";
    setpageTitle(data);
};
sendDataToParent();


const items = computed(() => store.items.map((itemProxy, index) => {
    const item = {...itemProxy}
    item.index = index;
    return item
}));
const searchInput = ref("");

onMounted(async () => {  
    store.deleteMode = false,
    store.editMode = false
});

const filteredItems = computed(() => items.value.filter(item => item.name.includes(searchInput.value)));
const filteredItemsSize = computed(() => filteredItems.value.length);

const itemIndex = ref(0);
const currentItem = computed(() => store.items[itemIndex.value]);
const currentRoute = useRoute().fullPath.split('/')[2];

/*TODO: refatorar nos composables*/
const paginationSize = computed( () => (parseInt(filteredItemsSize.value/15.5)+1));
let pagesFocus = ref([true]);
for(let i = 0; i < paginationSize.value-1; i++){
    pagesFocus.value.push(false);
};
const num = ref(0);
const num1 = ref(15);
let count = 0;

const page = ((index) => {
    num.value = 15*index;
    num1.value = (15*index)+15;
    pagesFocus.value[count] = false;
    count = index;
    pagesFocus.value[count] = true;
});
const fowardPage = (() => {
    pagesFocus.value[count] = false;
    count++;
    pagesFocus.value[count] = true;
    num.value += 15;
    num1.value += 15;
    const fowardBtn = document.getElementById("fowardPageBtn");
    document.getElementById("backPageBtn").classList.remove("disabled");
    document.getElementById("backPageBtn").classList.remove("bg-dark-emphasis");
    if(num1.value >= filteredItemsSize.value){
        fowardBtn.classList.toggle("disabled");
        fowardBtn.classList.toggle("bg-dark-emphasis");
    }
});
const backPage = (() => {
    pagesFocus.value[count] = false;
    count--;
    pagesFocus.value[count] = true;
    num.value -= 15;
    num1.value -= 15;
    const backBtn = document.getElementById("backPageBtn");
    document.getElementById("fowardPageBtn").classList.remove("disabled");
    document.getElementById("fowardPageBtn").classList.remove("bg-dark-emphasis");
    if(num.value < 0){
        backBtn.classList.toggle('disabled');
        backBtn.classList.toggle("bg-dark-emphasis");
    }
});

const showDetails = (index) => {
    itemIndex.value = index;
}

const showHistory = (index) => {
    itemIndex.value = index;
}
</script>

<style scoped>
.search-glass{
    padding-left: 0px;
}
.container{
    margin-left: 0px; 
    padding: 0px;
}

th{
    padding: 16px 0 16px 0;
    text-decoration: none;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
p{
    padding: 0;
    margin: 0;
}
.action-btn{
    margin-right: 10px;
    border: none;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 1px ridge #1F69B1;
}
.table-searchbar{
    border: none;
    border-radius: 0px;
    border-bottom: 1px ridge #1F69B1;
    top: 70px;
    width: 200px;
}
.searchbar{
    border: none;
}
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
}
.end{
    position: relative;
    text-align: end;
    padding: 0;
}
.table-btn{
    font-size: 15px;
    opacity: 0%;
    margin-top: 8px;
    margin-right: 10px;
    padding: 5px 5px 5px 5px;
}
.mode-btn{
    margin: 0;
    z-index: 1000;
    display: none;
    position: absolute;
    margin-top: -28px;
    margin-left: 210px;
    opacity: 0%;
}
.warning-text{
    position: absolute;
    margin-top: 5%;
    margin-left: 35%;
}
tr:hover .mode-btn{
    display: block;
    opacity: 100%;
}

tr:hover .table-btn{
    opacity: 100%;
}
tr:hover p{
    opacity: 70%;
}
@media screen and (max-width: 1000px) {
    table {
        width: 70vw;
    }
    .col-title{
        font-size: 14px;
    }
    p{
        font-size: 12px;
    }
    .table-btn{
        font-size: 13px;
        opacity: 0%;
        margin-top: 11px;
        margin-right: 4px;
        padding: 3px 0px 3px 0px;
    }
}
@media screen and (max-width: 900px){
    .catalog-header{
        display: block !important;
        text-align: center;
    }
    .actions-buttons{
        justify-content: center;
        align-content: center;
    }
}
@media screen and (max-width: 820px) {
    .container{
        margin-left: 0px;
    }
    table {
        width: 50vw;
    }
    .col-title{
        font-size: 12px;
    }
    p{
        font-size: 11px;
    }
    .table-btn{
        font-size: 11px;
    }
}
</style>