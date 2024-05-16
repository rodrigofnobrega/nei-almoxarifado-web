<template>
    <ModalItemDetails v-if="filteredItemsSize > 0" :item_index="itemIndex" :item_route="currentRoute" :item_details="currentItem" />
    <ModalItemHistory v-if="filteredItemsSize > 0" :item_history="currentItem"/>
<div class="table-container d-block mt-2">
    <div class="sub-catalog bg-light mb-4 ps-2 pe-2">
        <h6 class="sub-catalog-title ps-2 d-flex align-items-center opacity-75">
            <IconsInformation class="me-2"/>
            Descrição da Subpágina
        </h6>
        <p class="sub-catalog-text opacity-75">Esta organização de almoxarifado é destinada aos itens relacionados as atividades escolares do NEI, como giz de ceira, lápis e quaisquer material que possua uso no dia a dia dos alunos e professores.</p>
    </div>   
    <div class="table-box bg-light row d-block">
        <div class="table-actions d-flex justify-content-between aling-items-center">
            <span class="d-flex ms-1 align-items-center table-searchbar">
                <IconsSearchGlass class="search-glass"/>
                <input v-model="searchInput" class="searchbar form-control bg-light" placeholder="Pesquisar"/>          
            </span>
            <div class="d-flex me-1">
                <ButtonsNewItem />
                <ButtonsFilter class=" m-0 p-0"/>
                <ButtonsConfigure />
            </div>
        </div>
        <TablesTable>
            <template v-slot:items>
            <tr v-if="true" v-for="item in filteredItems" :key="item.index" :data-index="item.index">
               <th class="border" scope="row">
                    <p>{{ item.name }}</p>
               </th>
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
               <th class="">
                   <p>CADASTRO 2024-05-11 09:20:02 Luís Freitas</p>
                <div class="end position-sticky">
                    <button class="position-absolute table-btn btn btn-primary" :class="{'d-none': store.isMobile}" style="margin-top: -23px; right: 84px;" @click="showDetails(item.index)" data-bs-toggle="modal" data-bs-target="#itemDetailing">
                        Detalhes
                    </button>
                    <button class="position-absolute table-btn btn btn-primary" :class="{'d-none': store.isMobile}" style="margin-top: -23px; right: 13px;" @click="showHistory(item.index)" data-bs-toggle="modal" data-bs-target="#itemHistory">
                        Histórico
                    </button>
                 </div>
               </th>
            </tr>
            <div v-else class="warning-text d-flex aling-items-center justify-content-center">
                <p class="text-dark-emphasis fs-5 opacity-50">Inventário vazio.</p>
            </div>
            <div v-if="filteredItems == ''" class="search-empty position-absolute mt-5">
                <p class="text-dark-emphasis fs-5 opacity-50">Nenhum Resultado Encontrado.</p>
            </div>
        </template>
    </TablesTable>
    </div>
</div>
<nav v-if="filteredItemsSize > 0" aria-label="Page navigation" class="pagination position-fixed">
    <ul class="pagination">
        <li class="page-item">
            <button class="page-link bg-primary text-light" :class="{'bg-dark-emphasis disabled': pagination == 0}" id="backPageBtn" @click="backPage"><span aria-hidden="true">&laquo;</span></button>
        </li>
        <li class="page-item" v-for="i in res.totalPages" :key="i-1">
            <button class="page-link text-light" @click="page(i-1)" :class="{'bg-primary': !pagesFocus[i-1], 'bg-secondary': pagesFocus[i-1]}">{{ i }}</button>
        </li>
        <li class="page-item">
            <button class="page-link bg-primary text-light" :class="{'bg-dark-emphasis disabled': pagination == res.totalPages-1}" id="fowardPageBtn" @click="fowardPage"><span aria-hidden="true">&raquo;</span></button>
        </li>
    </ul>
</nav>
</template>

<script setup>
import { useStorageStore } from '../../stores/storage.ts';
import { ref, computed, onMounted, onUpdated ,inject } from 'vue';
import { getItems } from '../../services/items/itemsGET.ts';
import { getRecord } from '../../services/record/recordGET.ts';
import { useUser } from '../../stores/user.ts'
import { navigateTo } from 'nuxt/app';

const route = useRoute();
if(route.params.id !== 'almoxarifado'){
    navigateTo('/catalogo')
} 

const userStore = useUser()
const store = useStorageStore();
let pagination = ref(0);
/*REFATORAR CÓDIGO*/ 
let res = await getItems(userStore, pagination.value, '');
let invertedPagination = ref(res.totalPages-1)
if(res.status === 403){
    navigateTo("/login")
}
let queryParams = ref({
    sort: '', 
    isInverted: false
});

const sortedRes = async (sort, isInverted, paginationInverted) => {
    if(isInverted){
        res = await getItems(userStore, paginationInverted, sort)
        store.items = res.content
        return 1
    } 
    res = await getItems(userStore, pagination.value, sort)
    store.items = res.content
    return 1
}

provide('setItemsFilter', (filter, inverted) => {
    queryParams.value.sort = filter
    queryParams.value.isInverted = inverted
    sortedRes(queryParams.value.sort, inverted, invertedPagination.value)
})

store.items = res.content


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


const filteredItems = computed(() => items.value.filter(item => item.name.includes(searchInput.value)));
const filteredItemsSize = computed(() => filteredItems.value.length);

const itemIndex = ref(0);
const currentItem = computed(() => store.items[itemIndex.value]);
const currentRoute = useRoute().fullPath.split('/')[2];

/*TODO: refatorar nos composables*/
let pagesFocus = ref([true]);
for(let i = 0; i < res.totalPages; i++){
    pagesFocus.value.push(false);
};
let count = 0;

const page = (async (index) => {
    pagination.value = index;
    if(queryParams.value.isInverted){
        if(index < invertedPagination.value){
            invertedPagination.value = (res.totalPages-1)-index;
        }
        else if(index > invertedPagination.value){
            invertedPagination.value = (res.totalPages-1)-index;
        }
    }
    sortedRes(queryParams.value.sort, queryParams.value.isInverted, invertedPagination.value)
    pagesFocus.value[count] = false;
    count = index;  
    pagesFocus.value[count] = true;
});
const fowardPage = (async () => {
    pagination.value++;
    if(queryParams.value.isInverted){
        invertedPagination.value--;
    }
    sortedRes(queryParams.value.sort, queryParams.value.isInverted, invertedPagination.value)
    pagesFocus.value[count] = false;
    count++;
    pagesFocus.value[count] = true;
    const fowardBtn = document.getElementById("fowardPageBtn");
    document.getElementById("backPageBtn").classList.remove("disabled");
    document.getElementById("backPageBtn").classList.remove("bg-dark-emphasis");
});
const backPage = (async () => {
    pagination.value--;
    if(queryParams.value.isInverted){
        invertedPagination.value++;
    }
    sortedRes(queryParams.value.sort, queryParams.value.isInverted, invertedPagination.value)
    pagesFocus.value[count] = false;
    count--;
    pagesFocus.value[count] = true; 
    const backBtn = document.getElementById("backPageBtn");
    document.getElementById("fowardPageBtn").classList.remove("disabled");
    document.getElementById("fowardPageBtn").classList.remove("bg-dark-emphasis");
});

const showDetails = (index) => {
    itemIndex.value = index;
}

const showHistory = (index) => {
    itemIndex.value = index;
}
onMounted(async () => {  
    if(store.isMobile){
        const catalogTextElement = document.querySelector('.sub-catalog p')
        const textElements = document.querySelectorAll('tr p');
        const searchBar = document.querySelector('.searchbar');
        const searchBox = document.querySelector('.table-searchbar');
        const tableLines = document.querySelectorAll('tr');

        searchBox.style.fontSize = '8px';
        searchBar.style.width = '100%';
        searchBar.style.fontSize = '8px';
        catalogTextElement.style.fontSize = '8px';
        tableLines.forEach(element => {
            element.addEventListener('click', (() => {
                element.children[4].children[1].children[0].click()
            }))
        });
        textElements.forEach(element => element.style.fontSize = '7px');
    }
});
onUpdated(async () => {  
    if(store.isMobile){
        const catalogTextElement = document.querySelector('.sub-catalog p')
        const textElements = document.querySelectorAll('tr p');
        const searchBar = document.querySelector('.searchbar');
        const tableLines = document.querySelectorAll('tr');

        tableLines.forEach((element, index) => {
            element.addEventListener('click', (() => {
                element.children[4].children[1].children[0].click()
            }))
        });

        searchBar.style.width = '100%';
        searchBar.style.fontSize = '8px';
        catalogTextElement.style.fontSize = '8px';
        textElements.forEach(element => element.style.fontSize = '7px');
    }
});
</script>

<style scoped>
.container{
    width: 100%;
    display: block;
}
.table-container{
    margin-bottom: 149px;
    width: 100%;
    display: block !important;
}
.table-box{
    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
    width: 100%;
    margin: 0;
    overflow-x: scroll;
}
.table-actions{
    width: 100%;
}
.sub-catalog{
    border-radius: 13px;
    margin-top: -14px;
    padding-top: 10px;
    padding-bottom: 20px;
    margin-right: 20%;
    margin-left: 20%;
    border: 1px #D9D9D9 solid;
    box-shadow: 3px 3px 13px 0px rgb(0, 0, 0, 0.2);
}
.sub-catalog-text{
    padding: 0px 10px 0px 10px;
    font-size: 15px;
}
h6{
    font-weight: 400;
    color: rgb(51,51,51, 0.8);
}
th{
    background-color: white !important;
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
}
.search-glass{
    padding-left: 0px;
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
    text-align: end;
    padding: 0;
}
.table-btn{
    z-index: 3000;
    font-size: 13px;
    opacity: 0%;
    margin-top: 8px;
    margin-right: 10px;
    padding: 5px 5px 5px 5px;
}
.warning-text{
    position: absolute;
    margin-top: 5%;
    margin-left: 35%;
}
.search-empty{
    margin-top: 5%;
    display: flex;
    justify-content: center;
    margin-left: 30%;    
    margin-right: 30%;
    white-space: nowrap;
}
.pagination{
    bottom: 1%; 
    display: flex !important;
    justify-content: space-around !important;
    z-index: 4000;
}
tr:hover .table-btn{
    opacity: 100%;
}
tr:hover p{
    opacity: 50%;
}
tr:active{
    background-color: red !important;
}
/*RESPONSIVIDADE*/
@media screen and (max-width: 1030px) {
    th p, .sub-catalog p{
        font-size: 12px;
    }
}
@media screen and (max-width: 900px){
    .actions-buttons{
        justify-content: center;
        align-content: center;
    }
}
@media screen and (max-width: 851px) {
    .col-title{
        font-size: 12px;
    }
    th p, .sub-catalog p{
        font-size: 10px;
    }
    .table-searchbar, .searchbar{
        display: flex;
        font-size: 12px; 
    }
    .searchbar{
        width: 140px;
    }
    .table-searchbar{
        width: 170px;
    }
    .sub-catalog-title, .search-empty p{
        font-size: 14px;
    }
}
</style>