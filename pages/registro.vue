<template>
<ModalItemDetails v-if="recordsCache.length > 0" :item_index="recordIndex" :item_route="currentRoute" :item_details="currentItem" :item_qtd="itemQtd"/>
<div class="table-container d-block mt-2">
  <button class="d-none searching-btn" data-bs-toggle="modal" data-bs-target="#itemDetailing"></button>
  <div class="sub-catalog bg-light mb-4 ps-2 pe-2">
      <h6 class="sub-catalog-title ps-2 d-flex align-items-center opacity-75">
          <IconsInformation class="me-2"/>
          Descrição da página 
      </h6>
      <p class="sub-catalog-text opacity-75">Nesta página há todos os registros do sistema, sendo este de dois tipos de operações: CADASTRO e CONSUMO.</p>
  </div>   
  <div class="table-box bg-light row d-block">
      <div class="table-actions d-flex justify-content-between aling-items-center">
          <span class="d-flex ms-1 align-items-center table-searchbar">
              <IconsSearchGlass class="search-glass"/>
              <input v-model="searchInput" class="searchbar form-control bg-light" placeholder="Pesquisar"/>          
          </span>
          <div class="d-flex me-1">
              <ButtonsFilter />
          </div>
      </div>
      <TablesTable>
          <template v-slot:header>
              <tr>
                  <th class="col-title py-2 border" scope="col">Autor</th>
                  <th class="col-title py-2 border" scope="col">Operação</th>
                  <th class="col-title py-2 border" scope="col">Item</th>
                  <th class="col-title py-2 border" scope="col">Quantidade</th>
                  <th class="col-title py-2" scope="col">Data e horário </th>
              </tr>
          </template>
          <template v-slot:content>
          <tr v-if="true" v-for="record in loadRecords" :key="record.index" :data-index="record.index">
             <th class="border" scope="row">
                  <p>{{ record.user.name }}</p>
             </th>
             <th class="border">
                 <p>{{ record.operation }}</p>
              </th>
              <th class="border">
                  <p>{{ record.item.name }}</p>
              </th>
             <th class="border">
                 <p>{{ record.quantity }}</p>
              </th>
             <th class="">
                 <p>{{ record.creationDate.slice(0, 19) }}</p>
                 <div class="end position-sticky d-flex align-items-center">
                    <button class="d-flex align-items-center profile-btn  position-absolute table-btn btn btn-primary" :class="{'d-none': store.isMobile}" style="margin-top: -23px; right: 65px;" @click="showDetails(record.index, record.item.id)" data-bs-toggle="modal" data-bs-target="#itemDetailing">
                      <IconsSpreadSheet width="16px" height="16px"/>  
                      item
                    </button>
                    <NuxtLink :to="`/perfil?userId=${record.user.id}`" :route="`/perfil/${record.user.id}`" class="d-flex align-items-center profile-btn position-absolute btn btn-primary table-btn" :class="{'d-none': store.isMobile}" style="margin-top: -23px; right: 0px;">
                      <IconsLowProfile width="16px" height="16px"/>  
                      perfil
                    </NuxtLink>
                 </div>
             </th>
          </tr>
          <div v-else class="warning-text d-flex aling-items-center justify-content-center">
              <p class="text-dark-emphasis fs-5 opacity-50">Registro vazio.</p>
          </div>
          <div v-if="loadRecords.length == 0" class="search-empty position-absolute mt-5">
              <p class="text-dark-emphasis fs-5 opacity-50">Nenhum Resultado Encontrado.</p>
          </div>
      </template>
  </TablesTable>
  </div>
</div>
<nav v-if="recordsCache.length > 0" aria-label="Page navigation" class="pagination position-fixed">
  <ul class="pagination">
      <li class="page-item">
          <button class="page-link bg-primary text-light" :class="{'bg-dark-emphasis disabled': pagination == 0}" id="backPageBtn" @click="backPage"><span aria-hidden="true">&laquo;</span></button>
      </li>
      <li class="page-item" v-for="i in searchInput === '' ? totalPages : 0" :key="i-1">
          <button class="page-link text-light" @click="page(i-1)" :class="{'bg-primary': !pagesFocus[i-1], 'bg-secondary': pagesFocus[i-1]}">{{ i }}</button>
      </li>
      <li class="page-item">
          <button class="page-link bg-primary text-light" :class="{'bg-dark-emphasis disabled': pagination == totalPages-1 || searchInput !== ''}" id="fowardPageBtn" @click="fowardPage"><span aria-hidden="true">&raquo;</span></button>
      </li>
  </ul>
</nav>
</template>

<script setup>
import { useStorageStore } from '../../stores/storage.ts';
import { useSearch } from '../../stores/search.ts';
import { ref, computed, onMounted, onUpdated, inject } from 'vue';
import { getRecords } from '../../services/record/recordGET.ts';
import { useUser } from '../../stores/user.ts'
import { getItem } from '../services/items/itemsGET.ts';
/*SETANDO STORES*/
const userStore = useUser()
const store = useStorageStore();
const searchStore = useSearch();
/*VARIÁVEIS ÚTEIS PARA REQUISITAR OS ITENS E FILTRÁ-LOS*/ 
let pagination = ref(0); //paginação padrão
let invertedPagination = ref(0); //paginação invertida para filtro
let queryParams = ref({ 
  sort: 'id,desc', 
  isInverted: false
});
//Aqui faço a requisição em si, também possui parâmetros de filtros, sendo o padrão o de últimos atualizados(como está no banco de dados)
const sortedResponse = async (sort, isInverted, pagination, paginationInverted) => {
  if(isInverted){
      const res = await getRecords(userStore, paginationInverted, sort)
      return res
  } 
  const res = await getRecords(userStore, pagination, sort)
  return res
}; 
let response = await sortedResponse('', false, pagination.value, 0);
let totalPages = response.totalPages
invertedPagination.value = totalPages-1;


let recordsCache = ref([])
let indexCount = 0;
for(let i = 0; i < totalPages; i++){
  const res = await sortedResponse(queryParams.value.sort, false, pagination.value+i)
  res.content.map((record) => {
    record.index = indexCount;
      indexCount++;
      recordsCache.value.push(record)
  });
}
store.records = recordsCache.value;
async function reloadRecord(sort, isInverted, invertedPagination){
  let indexcount = 0;
  if(isInverted){
      for(let i = totalPages-1; i >= 0; i--){
          const res = await sortedResponse(sort, true, 0, i)    
          res.content.map((record) => {
            record.index = indexcount;
              recordsCache.value[indexcount] = record
              indexcount++;
          });
      }
      store.records = recordsCache.value;
      return 1
  }
  for(let i = 0; i < totalPages; i++){
      const res = await sortedResponse(sort, isInverted, i, invertedPagination)
      res.content.map((record) => {
        record.index = indexcount;
          recordsCache.value[indexcount] = record
          indexcount++;
      });
  }
  store.records = recordsCache.value;
  return 1;
};

const searchInput = ref("");
const loadRecords = computed(() => {
  let records = [];
  let page = 20*pagination.value
  let aux = page;
  let index = 0;
  let find = 0;
  if(searchInput.value != ''){
      do{
          if(store.records[index].item.name.includes(searchInput.value)){
            records.push(store.records[index])
             find++;
          }
          index++;
      } while(index < store.records.length)
      return records
  }
  do{
    records.push(store.records[aux])
      aux++;
  }while(aux < store.records.length && aux < 20*(pagination.value+1));
  return records
})
provide('setItemsFilter', (filter, inverted) => {
  queryParams.value.sort = filter
  queryParams.value.isInverted = inverted
  reloadRecord(queryParams.value.sort, queryParams.value.isInverted, invertedPagination.value)
});
//Variáveis que o front vai pegar em si
const recordIndex = ref(0);
const currentItem = computed(() => store.records[recordIndex.value].item);
const currentRoute = 'almoxarifado';
const itemQtd = ref(0);

const setpageTitle = inject('setpageTitle');
const sendDataToParent = () => {
  const data = "Registro";
  setpageTitle(data);
};
sendDataToParent();

const toolTip = ref([false, false, false, false])

/*CÓDIGO PARA PAGINAÇÃO EM SI E RENDERIZAÇÃO DOS ITENS*/
let pagesFocus = ref([true]);
for(let i = 0; i < totalPages; i++){
  pagesFocus.value.push(false);
};
let count = 0;

const page = (async (index) => {
  pagination.value = index;
  if(queryParams.value.isInverted){
      if(index < invertedPagination.value){
          invertedPagination.value = (totalPages-1)-index;
      }
      else if(index > invertedPagination.value){
          invertedPagination.value = (totalPages-1)-index;
      }
  }
  pagesFocus.value[count] = false;
  count = index;  
  pagesFocus.value[count] = true;
});
const fowardPage = (async () => {
  pagination.value++;
  if(queryParams.value.isInverted){
      invertedPagination.value--;
  }
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
  pagesFocus.value[count] = false;
  count--;
  pagesFocus.value[count] = true; 
  const backBtn = document.getElementById("backPageBtn");
  document.getElementById("fowardPageBtn").classList.remove("disabled");
  document.getElementById("fowardPageBtn").classList.remove("bg-dark-emphasis");
});
/*FUNÇÕES PARA OS BOTÕES DE DETALHE E HISTÓRICO*/
const showDetails = async (index, itemId) => {
  const res = await getItem(userStore, itemId);
  itemQtd.value = res.quantity
  recordIndex.value = index;
}

const showHistory = (index) => {
  recordIndex.value = index;
}

/*HOOKS PARA RESPONSIVIDADE E MODO MOBILE*/
onMounted(async () => {
  if(searchStore.itemSearch.searching){
      showDetails(searchStore.itemSearch.itemId);
      const searching = document.getElementsByClassName('searching-btn'); 
      searching[0].click()
      searchStore.itemSearch.searching = false;
  }
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
.col-title{
  font-size: 18px;
  opacity: 80%;
  font-weight: 400;
  margin-top: 0;
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
.profile-btn{
  border-radius: 4px;
  top: 0px;
  font-size: 12px;
  padding: 4px 3px 4px 3px;
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
  bottom: -1%; 
  display: flex !important;
  justify-content: space-around !important;
  z-index: 0;
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