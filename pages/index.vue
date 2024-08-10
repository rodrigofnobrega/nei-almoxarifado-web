<template>
  <div class="container-fluid" style="margin-left: 0px;">
    <div class="d-flex paralalel-section">
      <div class="dashboard-section me-2 bg-light mb-4 pb-0 pt-0 rounded-3">
        <div class="section-title pt-2 mb-4 bg-light-background-header">
          <h5 class="header ps-2 fw-bold">Sumário</h5>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="px-3 ms-3 summary-text">
            <p class="summary-text-re teste">Solicitações com status pendente</p>
            <h5 class="d-flex align-items-center justify-content-between mt-1">
              {{ requestsByStatus.totalElements || 0 }}
              <IconsRequest width="20px" height="20px" class="mb-1" />
            </h5>
          </div>
          <div class="px-3 summary-text">
            <p class="summary-text-re">Solicitações do mês aceitas</p>
            <h5 class="d-flex align-items-center justify-content-between mt-1">
              {{ acceptedRequests || 0 }}
              <IconsRequest width="20px" height="20px" class="mb-1" />
            </h5>
          </div>
          <div class="px-3 summary-text">
            <p class="summary-text-re">Solicitações do mês recusadas</p>
            <h5 class="d-flex align-items-center justify-content-between mt-1">
              {{ rejectedRequests || 0 }}
              <IconsRequest width="20px" height="20px" class="mb-1" />
            </h5>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="px-3 ms-3 summary-text">
            <p class="summary-text-re">Quantidade de itens cadastrados</p>
            <h5 class="d-flex align-items-center justify-content-between mt-1">
              {{ items.totalElements || 0 }}
              <IconsSpreadSheet width="20px" height="20px" class="mb-1 " />
            </h5>
          </div>
          <div class="px-3 summary-text">
            <p class="summary-text-re">Quantidade total de itens</p>
            <h5 class="d-flex align-items-center justify-content-between mt-1">
              {{ itemsQtd || 0 }}
              <IconsSpreadSheet width="20px" height="20px" class="mb-1" />
            </h5>
          </div>
          <div class="px-3 summary-text">
            <p class="summary-text-re">Quantidade total de usuários</p>
            <h5 class="d-flex align-items-center justify-content-between mt-1">
              {{ users.totalElements || 0 }}
              <IconsLowProfile width="20px" height="20px" class="mb-1" />
            </h5>
          </div>
        </div>
      </div>    
      <div class="dashboard-section users-management me-3 bg-light mb-4 pb-0 pt-0 rounded-3">
        <div class="section-title pt-2 bg-light-background-header">
          <h5 class="header ps-2 fw-bold">Gestão de Usuários</h5>
        </div>
        <div class="users-management-scroll">
          <TablesTable v-if="users.content && users.content.length">
            <template v-slot:header>
              <tr>
                <th class="col-title text-center py-2" scope="col">Usuário</th>
                <th class="col-title text-center py-2" scope="col">Email</th>
                <th class="col-title text-center py-2" scope="col">Encargo</th>
                <th class="col-title text-center py-2 justify-content-center" scope="col">Ações</th>
              </tr>
            </template>
            <template v-slot:content>
              <tr v-for="user in users.content" :key="user.id">
                <th class="text-center table-cell" scope="row">
                  <div class=" d-flex align-items-center justify-content-start">
                  <IconsPerfil class="me-3 opacity-75" width="30px" height="30px" />
                  {{ user.name }}
                  </div>
                </th>
                <th class="text-center table-cell align-cell" scope="row" style="padding-top: 11px;">
                  {{ user.email }}
                </th>
                <th class="text-center table-cell align-cell" scope="row" style="padding-top: 11px;">
                  {{ user.role === 'USER' ? 'USUÁRIO' : 'ADMIN'}}
                </th>
                <th class="text-center table-cell user-actions pt-2" scope="row" width="5%">
                  <div class="position-sticky d-flex justify-content-center">
                    <a title="Perfil" :href="`/perfil?userId=${user.id}`" :route="`/perfil/${user.id}`" class="ms-1 me-0 table-btn d-flex align-items-center justify-content-center btn btn-primary">
                      <IconsLowProfile width="16px" height="16px"/>
                    </a>
                  </div>
                </th>
              </tr>
            </template>
          </TablesTable>
          <div v-if="loadContent && users.content.length === 0" class="search-empty d-flex justify-content-center">
            <p class="text-dark-emphasis fs-5 opacity-50">Nenhum usuário encontrado</p>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard-section  overflow-x-visible recent-records bg-light mb-4 pb-0 pt-0 rounded-3">
      <div class="section-title pt-2  bg-light-background-header">
        <h5 class="header ps-2  fw-bold">Movimentações mais recentes</h5>
      </div>
      <TablesTable v-if="records.content && records.content.length">
        <template v-slot:header>
          <tr>
            <th class="col-title table-col text-center py-2" scope="col">Usuário</th>
            <th class="col-title table-col text-center py-2" scope="col">Movimentação</th>
            <th class="col-title table-col text-center py-2" scope="col">Item</th>
            <th class="col-title table-col text-center py-2" scope="col">Tipo unitário</th>
            <th class="col-title table-col text-center py-2" scope="col">Quantidade</th>
            <th class="col-title table-col text-center py-2" scope="col">Data e horário</th>
            <th class="col-title table-col text-center py-2" scope="col">Ações</th>
          </tr>
        </template>
        <template v-slot:content>
          <tr v-for="(record, index) in records.content" :key="record.id" class="text-center"> 
            <th class="table-cell mov-cell" scope="row">
              <div class="d-flex table-text align-items-center " style="padding-top: 0px;">
                <IconsPerfil class="me-3 mb-0 opacity-75" width="30px" height="30px" />
                {{ record.user.name }}
              </div>
            </th>
            <th class="table-cell mov-cell" scope="row">
              <div class="d-flex table-text align-items-end mt-1 justify-content-center">
                {{ record.operation }}
              </div>
            </th>
            <th class="table-cell mov-cell" scope="row">
              <div class="d-flex table-text align-items-end mt-1 justify-content-center">
                {{ record.item.name }}
              </div>
            </th>
            <th class="table-cell mov-cell" scope="row">
              <div class="d-flex table-text align-items-end mt-1 justify-content-center">
                {{ record.item.type }}
              </div>
            </th>
            <th class="table-cell mov-cell" scope="row">
              <div class="d-flex table-text align-items-end mt-1 justify-content-center">
                {{ record.quantity }}
              </div>
            </th>
            <th class="table-cell mov-cell" scope="row">
              <div class="d-flex table-text align-items-end mt-1 justify-content-center">
                {{ record.creationDate.slice(0, 19) }}
              </div>
            </th>
            <th class="table-cell mov-cell" scope="row">
              <div class="d-flex table-text justify-content-center">
                <button @click="showDetails(index, record.item.id)" title="Detalhes" :route="`/registro/${record.id}`" class="table-btn d-flex align-items-center justify-content-center btn btn-secondary">
                  <IconsSearchGlass width="16px" height="16px"/>
                </button>
                <a title="Perfil" :href="`/perfil?userId=${record.user.id}`" :route="`/perfil/${record.user.id}`" class="m-0 table-btn d-flex align-items-center justify-content-center btn btn-primary">
                  <IconsLowProfile width="16px" height="16px"/>
                </a>
              </div>
            </th>
          </tr>
        </template>
      </TablesTable>
      <div v-if="loadContent && records.content.length === 0" class="search-empty d-flex justify-content-center">
        <p class="text-dark-emphasis fs-5 opacity-50">Nenhuma movimentação</p>
      </div>
    </div>  
    <div class="dashboard-section bg-light mb-4 pb-0 pt-0 rounded-3">
      <DashboardBarChartItems />
    </div> 
    <div class="dashboard-section bg-light mb-4 pb-0 pt-0 rounded-3">
      <DashboardBarChartUtils />
    </div>
    <button id="modalToggle" data-bs-toggle="modal" data-bs-target="#itemDetailing" class="disabled d-none"></button>
    <ModalItemDetails v-if="currentItem" :item_index="itemIndex" :item_details="currentItem" />
    <Modal id="removeUser" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
      <template v-slot:header>
        <h6 class="header-title d-flex fw-medium justify-content-start align-items-center">Invalidar usuário</h6>
        <button class="btn btn-transparent text-light border-0 close-btn" type="button" data-bs-dismiss="modal">
          <IconsClose class="close ms-5" width="1.3em" height="1.3em"/>
        </button>
      </template>
      <template v-slot:body>
        <p class="fw-medium text-center">Como administrador você tem permissões especiais para desativar a conta de qualquer usuário comum, para melhor controle e gestão de quem tem acesso ao sistema.</p>
        <p class="fw-bold text-center">Deseja realmente desativar esta conta?</p>
      </template>
      <template v-slot:footer>
        <div class="container-fluid d-flex justify-content-end align-items-center">
          <button type="button" class="btn btn-light-alert inset-shadow text-light mx-1 fw-bold" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" @click="deleteAccount" class="btn btn-secondary inset-shadow text-light mx-1 fw-bold" data-bs-dismiss="modal">Desativar</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import { getItem, getItems } from '../services/items/itemsGET.ts';
import { getRequests } from '../services/requests/requestsGET.ts';
import { getUsers } from '../services/users/userGET.ts';
import { getRecords } from '../services/record/recordGET.ts';
import { getRequestByStatus } from '../services/requests/requestsGET.ts';
import { useUser } from '../stores/user';
import { useSearch } from '../stores/search.ts';
import { deleteUser } from '../services/users/userDELETE';
import { usePopupStore } from '../stores/popup.ts';

const setpageTitle = inject('setpageTitle');
const sendDataToParent = () => {
  const title = "Painel Geral";
  const route = `${useRoute().fullPath}`
  setpageTitle(title, route, 'home');
};
sendDataToParent();

const userStore = useUser();
const searchStore = useSearch();
const route = useRouter();
const popUpStore = usePopupStore();

const userRejectId = ref(0);
const users = ref({ content: [] }); // Inicializa com um objeto com array vazio
const records = ref({ content: [] }); // Inicializa com um objeto com array vazio
const requestsByStatus = ref({ totalElements: 0 });
const acceptedRequests = ref(0);
const rejectedRequests = ref(0);
const items = ref({ content: [] }); // Inicializa com um objeto com array vazio
const itemsQtd = ref(0);

const currentItem = ref(undefined);
const itemIndex = ref(0);
const isShowDetails = ref(false);

const loadContent = ref(false);

const fetchData = async () => {
  try {
    users.value = await getUsers(userStore, 0);
    records.value = await getRecords(userStore, 0, 'id,desc');
    requestsByStatus.value = await getRequestByStatus(userStore, 'pendente');
    
    let data = new Date();
    let actualMonth = data.getMonth() + 1;
    let requestsData = await getRequests(userStore, 0);
    for (let i = 1; i < requestsData.totalPages; i++) {
      for (let j = 0; j < requestsData.content.length; j++) {
        if (requestsData.content[j].updatedDate.slice(5, 7) == actualMonth) {
          if (requestsData.content[j].status == 'ACEITO') {
            acceptedRequests.value++;
          }
          if (requestsData.content[j].status == 'RECUSADO') {
            rejectedRequests.value++;
          }
        }
      }
      requestsData = await getRequests(userStore, i);
    }
    
    items.value = await getItems(userStore, 0);
    for (let i = 1; i < items.value.totalPages; i++) {
      for (let j = 0; j < items.value.content.length; j++) {
        itemsQtd.value += items.value.content[j].quantity;
      }
      items.value = await getItems(userStore, i);
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

onMounted(() => {
  fetchData().finally(() => {
    loadContent.value = true;
  });
});

const showDetails = async (index, itemId) => {
  const modalToggleDom = document.getElementById('modalToggle');
  itemIndex.value = index;
  try {
    currentItem.value = await getItem(userStore, itemId);
    modalToggleDom.click();
  } catch (err) {
    console.error(err);
  }
};

const deleteAccount = async () => {
  try {
    await deleteUser(userStore, userRejectId.value);
    popUpStore.throwPopup('Conta desativada com sucesso, atualize a página', 'blue');
  } catch (err) {
    popUpStore.throwPopup('ERRO: Algum problema interno do servidor ocorreu, contate o suporte', 'red');
  }
};
</script>

<style scoped>
.users-management-scroll{
  position: static !important;
  text-wrap: nowrap !important;
  overflow-y: scroll !important;
  max-height: 227px !important;
}
.users-management{
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
  text-overflow: ellipsis;
  font-size: 14px;
  color: rgb(51,51,51, 0.8);
  border-left: 3px solid #FED51E;
}
.table-btn{
    border-radius: 4px;
    top: 0px;
    font-size: 12px;
    padding: 4px 3px 4px 3px;
    z-index: 0;
    font-size: 13px;
    margin-right: 10px;
    margin-left: 10px;
}
.catalog-header{
    justify-content: space-between;
  }
.col-title{
  font-size: 14px;
  color: rgb(51,51,51, 0.9);
  opacity: 90%;
  font-weight: bold;
  margin-top: 0;
}
.table-cell{
  z-index: 1000 !important;
  font-size: 14px;
  font-weight: 400;
  color: rgb(51,51,51, 0.9);
}
.card-img-top{
  transition: opacity 0.5s ease-in-out;
  opacity: 85%;
}
.search-empty{
  margin-top: 7% !important;
  white-space: nowrap;
}
.close{
    position: relative;
    left: 20px;
}
.header-title{
    font-weight: 300;
    margin: -1px 0 -1px 0;
    padding: 0;
}
.user-disabled{
  background-color: rgb(229, 57, 53, 0.3);
}
.bg-warning-op80{
    opacity: 80%;
    background-color: rgba(254, 213, 30);
}
.bg-alert-op80{
  opacity: 80%;
  background-color: rgb(231, 15, 15);
}
.bg-secondary-op80{
    opacity: 80%;
    background-color: #0052a4;
}
.warning-box{
    border: solid 1px rgba(0, 0, 0, 0.3);
    color: black;
    font-size: 15px;
    border-radius: 7px;
    width: 280px;
    transition: width 0.3s ease-in-out, box-shadow 0.4s ease-in-out;
}
.bg-warning-op80:hover{
    box-shadow: 0px 0px 15px 4px rgb(160, 152, 2);
    width: 290px;
}
.bg-secondary-op80:hover{
    box-shadow: 0px 0px 15px 2px rgb(5, 64, 119);
    width: 290px;
}
.bg-alert-op80:hover{
  width: 290px;
  box-shadow: 0px 0px 15px 2px rgb(111, 7, 7);
}
.align-cell{
  padding-top: 12px !important;
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
tr:hover .disabled-account{
  display: none;
}
tr:hover .user-invalided{
  filter: blur(0px);
}
@media screen and (max-width: 1253px) {
  .summary-text-re{
    height: 60px;
  }
  .summary-text{
    height: 100px;
  }
  .users-management-scroll{
    max-height: 250px !important;
  }
}
@media screen and (max-width: 1040px){
  .paralalel-section{
    display: block !important;
  }
  .summary-text{
    font-size: 15px !important;
  }
  .users-management-scroll{
    max-height: 270px !important;
  }
  th{
    padding: 3px!important;
  }
  .table-cell, .summary-text{
    font-size: 13px !important;
  }
  .align-cell{
    padding-top: 7px !important;
  }
}
@media screen and (max-width: 962px){
  .table-cell, .summary-text{
    font-size: 12px;
  }
  .card-text{
    font-size: 14px !important;
  }
  .stretched-link{
    font-size: 16px !important;
  }
}
@media screen and (max-width: 854px){
  .table-cell, .summary-text{
    font-size: 14px;
  }
  .table-text{
    font-size: 12px;
  }
  th{
    padding: 8px !important;
  }
  .table-col{
    padding: 0px;
    font-size: 12px;
  }
}
@media screen and (max-width: 812px){
  .dashboard-container{
    display: block !important;
  }
  .dashboard-viewcard{
    margin-bottom: 30px;
  }
  .align-cell{
    padding-top: 12px !important;
  }
}   
@media screen and (max-width: 558px){

}
@media screen and (max-width: 435px){
  .summary-text{
    font-size: 12px;
  }
  th{
    padding: 3px !important;
  }
  .container{
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>