<template>
  <div class="container" style="margin-left: 0px;">
    <div class="d-flex">
      <div class="dashboard-section me-2 bg-light mb-4 pb-0 pt-0 rounded-3">
        <div class="section-title pt-2 mb-4 bg-light-background-header">
          <h5 class="header ps-2">Sumário</h5>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="px-3 ms-3  summary-text">
            Solicitações com status pendente
            <h5 class="d-flex align-items-center justify-content-between mt-1">{{ requestsByStatus.totalElements }}
              <IconsRequest class="mb-1" />
            </h5>
          </div>
          <div class="px-3 summary-text">
            Solicitações do mês aceitas
            <h5 class="d-flex align-items-center justify-content-between mt-0">{{acceptedRequests}}
              <IconsRequest />
            </h5>
          </div>
          <div class="px-3 summary-text">
            Solicitações do mês recusadas 
            <h5 class="d-flex align-items-center justify-content-between mt-1">{{ rejectedRequests }}
              <IconsRequest class="mb-1" />
            </h5>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="px-3 ms-3 summary-text">
            Quantidade total de itens
            <h5 class="d-flex align-items-center justify-content-between mt-1">{{ itemsQtd }}
              <IconsSpreadSheet class="mb-1"/>
            </h5>
          </div>
          <div class="px-3 summary-text">
            Quantidade total de itens cadastrados
            <h5 class="d-flex align-items-center justify-content-between mt-1">{{items.totalElements}}
              <IconsSpreadSheet class="mb-1 "/>
            </h5>
          </div>
          <div class="px-3 summary-text">
            Quantidade total de usuários
            <h5 class="d-flex align-items-center justify-content-between mt-1">{{users.totalElements}}
              <IconsLowProfile class="mb-1"/>
            </h5>
          </div>
        </div>
      </div>    
      <div class="dashboard-section users-management me-3 bg-light mb-4 pb-0 pt-0 rounded-3">
        <div class="section-title pt-2  bg-light-background-header">
          <h5 class="header ps-2">Gestão de Usuários</h5>
        </div>
        <div class="users-management-scroll">
          
          <TablesTable>
            <template v-slot:header>
              <tr>
                <th class="col-title py-2" scope="col">Usuário</th>
                <th class="col-title py-2" scope="col">Email</th>
                <th class="col-title py-2" scope="col">Encargo</th>
              </tr>
            </template>
            <template v-slot:content>
              <tr v-for="user in users.content" :key="user.id" @mouseover="isProfileBtn[user.id] = true" @mouseout="isProfileBtn[user.id] = false">
                <th class="text-start table-cell" scope="row">
                  <IconsPerfil class="me-3 opacity-75" width="30px" height="30px" />
                  {{ user.name }}
                </th>
                <th class="text-start table-cell" scope="row">
                  {{user.email}}
                </th>
                <th class="text-start table-cell" scope="row">
                  {{user.role}}
                </th>
                <th class="text-start table-cell" scope="row">
                  <div class="d-flex align-items-center justify-content-between position-sticky">
                    <NuxtLink :to="`/perfil?userId=${user.id}`" :route="`/perfil/${user.id}`" :class="{'d-none': !isProfileBtn[user.id]}" class="d-flex align-items-center profile-btn position-absolute btn btn-primary">
                      <IconsLowProfile class="me-1" width="16px" height="16px"/>
                      perfil
                    </NuxtLink>
                  </div>
                </th>
              </tr>
            </template>
          </TablesTable>
        </div>
      </div>
    </div>
    <div class="dashboard-section recent-records bg-light mb-4 pb-0 pt-0 rounded-3">
      <div class="section-title pt-2  bg-light-background-header">
        <h5 class="header ps-2">Movimentações mais recentes</h5>
      </div>
      <TablesTable>
        <template v-slot:header>
          <tr class="bg-light">
            <th class="col-title text-center py-2" scope="col">Usuário</th>
            <th class="col-title text-center py-2" scope="col">Tipo de movimentação</th>
            <th class="col-title text-center py-2" scope="col">Item</th>
            <th class="col-title text-center py-2" scope="col">Tipo unitário</th>
            <th class="col-title text-center py-2" scope="col">Quantidade</th>
            <th class="col-title text-center py-2" scope="col">Data e horário</th>
          </tr>
        </template>
        <template v-slot:content>
          <tr v-for="record in records.content" :key="record.id" class="text-center" @mouseover="isProfileBtnRecord[record.id] = true" @mouseout="isProfileBtnRecord[record.id] = false"> 
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-center justify-content-center">
                  <IconsPerfil class="me-3 mb-0 opacity-75" width="30px" height="30px" />
                  {{ record.user.name }}
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  {{ record.operation}}
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  {{ record.item.name }}
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  {{ record.item.type }}
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  {{ record.quantity}}
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  {{record.creationDate}}
                </div>
                <div class="d-flex align-items-center justify-content-between position-sticky">
                  <NuxtLink :to="`/registro?recordId=${record.id}`"  :route="`/registro/${record.id}`" :class="{'d-none': !isProfileBtnRecord[record.id]}" style="margin-right: 80px; margin-top: -25px !important;" class="d-flex align-items-center profile-btn record-btn position-absolute btn btn-primary">
                    <IconsRequest class="me-1" width="16px" height="16px"/>
                    registro
                  </NuxtLink>
                  <NuxtLink :to="`/perfil?userId=${record.user.id}`" :route="`/perfil/${record.user.id}`" :class="{'d-none': !isProfileBtnRecord[record.id]}" style="margin-top: -25px !important;" class="d-flex align-items-center profile-btn record-btn position-absolute btn btn-primary">
                      <IconsLowProfile class="me-1" width="16px" height="16px"/>
                      perfil
                  </NuxtLink>
                </div>
              </th>
            </tr>
        </template>
      </TablesTable>
    </div>    
    <div class="dashboard-section bg-light mb-4 pb-0 pt-0 rounded-3">
      <div class="section-title pt-2 mb-3 bg-light-background-header">
        <h5 class="pb-1 pt-0 ps-2">Gráfico de Solicitações de Itens</h5>
      </div>
      <DashboardBarChartItems />
    </div>  
    <div class="dashboard-section bg-light mb-4 pb-0 pt-0 rounded-3">
      <div class="section-title pt-2 mb-3 bg-light-background-header">
        <h5 class="header ps-2">Relatórios Gerais</h5>
      </div>
      <DashboardBarChartUtils />
    </div> 
    <div class="dashboard-section bg-light mb-4 pb-3 pt-0 rounded-3">
      <div class="section-title pt-2 mb-3 bg-light-background-header">
          <h5 class="header ps-2">Catálogos</h5>
        </div>
       <div class="dashboard-container container-fluid d-flex px-0 justify-content-center aligm-items-center">
          <CardsImageCard class="dashboard-viewcard">
            <template v-slot:image-cap>
              <img src="/almo.png" class="card-img-top" alt="...">
            </template>
            <template v-slot:body>
              <a href="/inventario/almoxarifado-escolar" class="fs-5 fw-medium stretched-link text-dark-emphasis">Almoxarifado Escolar</a>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </template>
          </CardsImageCard>
          <CardsImageCard class="dashboard-viewcard">
            <template v-slot:image-cap>
              <img src="/almo2.png" class="card-img-top" alt="...">
            </template>
            <template v-slot:body>
              <a href="/inventario/almoxarifado-escolar" class="fs-5 fw-medium stretched-link text-dark-emphasis">Almoxarifado Escolar</a>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </template>
          </CardsImageCard>
          <CardsImageCard class="dashboard-viewcard mb-0">
            <template v-slot:image-cap>
              <img src="/almo3.png" class="card-img-top" alt="...">
            </template>
            <template v-slot:body>
              <a href="/inventario/almoxarifado-escolar" class="fs-5 fw-medium stretched-link text-dark-emphasis">Almoxarifado Escolar</a>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </template>
          </CardsImageCard>
        </div>
    </div>
</div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import { getItems } from '../services/items/itemsGET.ts';
import { getRequests } from '../services/requests/requestsGET.ts';
import { getUsers } from '../services/users/userGET.ts';
import { getRecords } from '../services/record/recordGET.ts';
import { getRequestByStatus } from '../services/requests/requestsGET.ts';
import { useUser } from '../stores/user';

const isProfileBtnRecord = ref([])
const isProfileBtn = ref([])
const userStore = useUser();

const users = await getUsers(userStore, 0)
const records = await getRecords(userStore, 0, 'id,desc')
const requestsByStatus = await getRequestByStatus(userStore, 'pendente');

let data = new Date
let actualMonth = data.getMonth()+1
let acceptedRequests = 0;
let rejectedRequests = 0;
let requests = await getRequests(userStore, 0)
for(let i = 1; i < requests.totalPages; i++){
  for(let j = 0; j < requests.content.length; j++){
    if(requests.content[j].updatedDate.slice(5, 7) == actualMonth){
      if(requests.content[j].status == 'ACEITO'){
        acceptedRequests++
      }
      if(requests.content[j].status == 'RECUSADO'){
        rejectedRequests++
      }
    }
  }
  requests = await getRequests(userStore, i)
}

let items = await getItems(userStore, 0)
let itemsQtd = 0;
for(let i = 1; i < items.totalPages; i++){
  for(let j = 0; j < items.content.length; j++){
    itemsQtd += items.content[j].quantity
  }
  items = await getItems(userStore, 0)
}


const setpageTitle = inject('setpageTitle');

onMounted(() => {
})

const sendDataToParent = () => {
    const data = "Painel Geral";
    setpageTitle(data);
};
sendDataToParent();
</script>

<style scoped>
.users-management-scroll{
  position: static !important;
  text-wrap: nowrap !important;
  overflow-y: scroll !important;
  height: 85% !important;
}
.users-management{
  max-height: 270px !important;
  position: static !important;
  text-wrap: nowrap !important;
  overflow-y: scroll !important;
}
.recent-records{
  height: 317px;
  overflow-y: scroll;
}
.container{
  width: 100%;
	padding-left: 15px;
  flex-direction: column;
}
.record-btn{
  text-wrap: nowrap;
}
.dashboard-section{   
  width: 99%;
  padding-top: 10px;
  padding-bottom: 0px;
  padding-left: 0;
  padding-right: 0;
  border: 1px #D9D9D9 solid;
  box-shadow: 3px 3px 13px 0px rgb(0, 0, 0, 0.2);
}
.section-title{
  border-radius: 8px 8px 0px 0px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
}
h5{
    font-weight: 300;
    color: rgb(51,51,51, 0.8);
}
.summary-text{
  width: 50%;
  text-wrap: wrap;
  font-size: 14px;
  color: rgb(51,51,51, 0.8);
  border-left: 3px solid #FED51E;
}
.profile-btn{
  top: 0px;
  font-size: 12px;
  right: 50px !important;
}
.catalog-header{
    justify-content: space-between;
}
.col-title{
    font-size: 14px;
    color: rgb(51,51,51, 0.9);
    opacity: 80%;
    font-weight: 400;
    margin-top: 0;
}
.table-cell{
  font-size: 14px;
  font-weight: 400;
  color: rgb(51,51,51, 0.9);
}
.card-img-top{
    transition: opacity 0.5s ease-in-out;
    opacity: 85%;
}
.stretched-link{
  text-decoration: none;
}
.card:hover .stretched-link{
    color: white !important;
}
.card:hover .card-img-top{
    opacity: 100%;
}
@media screen and (max-width: 962px){
  .card-text{
    font-size: 14px !important;
  }
  .stretched-link{
    font-size: 16px !important;
  }
}
@media screen and (max-width: 812px){
  .dashboard-container{
    display: block !important;
  }
  .dashboard-viewcard{
    margin-bottom: 30px;
  }
}
</style>