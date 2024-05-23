<template>
  <div class="container" style="margin-left: 0px;">
    <div class="d-flex">
      <div class="dashboard-section me-2 bg-light mb-4 pb-0 pt-0 rounded-3">
        <div class="section-title pt-2 mb-4 bg-light-background-header">
          <h5 class="header ps-2">Sumário</h5>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="px-3 ms-3 summary-text">
            Quantidade de itens disponíveis
            <h5 class="mt-1">5000
              <IconsSpreadSheet style="margin-left: 60px !important;"/>
            </h5>
          </div>
          <div class="px-3 summary-text">
            Quantidade de solicitações 
            <h5 class="mt-1">4000
              <IconsSpreadSheet style="margin-left: 60px !important;"/>
            </h5>
          </div>
          <div class="px-3 summary-text">
            Quantidade de usuários cadastrados
            <h5 class="mt-1">3000
              <IconsSpreadSheet style="margin-left: 60px !important;"/>
            </h5>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="px-3 ms-3 summary-text">
            Itens cadastrados por este perfil
            <h5 class="mt-1">5000
              <IconsLowProfile style="margin-left: 60px !important;"/>
            </h5>
          </div>
          <div class="px-3 summary-text">
            Solicitações aceitas por este perfil
            <h5 class="mt-1">4000
              <IconsLowProfile style="margin-left: 60px !important;"/>
            </h5>
          </div>
          <div class="px-3 summary-text">
            Solicitações recusadas por este perfil
            <h5 class="mt-1">3000
              <IconsLowProfile style="margin-left: 60px !important;"/>
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
              <tr @mouseover="isProfileBtn = true" @mouseout="isProfileBtn = false">
                <th class="text-start table-cell" scope="row">
                  <IconsPerfil class="me-3 opacity-75" width="30px" height="30px" />
                  Ivano Cleudeson
                </th>
                <th class="text-start table-cell" scope="row">
                  ivanocleudson@gmail.com
                </th>
                <th class="text-start table-cell" scope="row">
                  Admin
                </th>
                <button :class="{'d-none': !isProfileBtn}" class="profile-btn position-absolute btn btn-primary">Ver perfil</button>
              </tr>
              <tr @mouseover="isProfileBtn = true" @mouseout="isProfileBtn = false">
                <th class="text-start table-cell" scope="row">
                  <IconsPerfil class="me-3 opacity-75" width="30px" height="30px" />
                  Ivano Cleudeson
                </th>
                <th class="text-start table-cell" scope="row">
                  ivanocleudson@gmail.com
                </th>
                <th class="text-start table-cell" scope="row">
                  Admin
                </th>
                <button :class="{'d-none': !isProfileBtn}" class="profile-btn position-absolute btn btn-primary">Ver perfil</button>
              </tr>
              <tr @mouseover="isProfileBtn = true" @mouseout="isProfileBtn = false">
                <th class="text-start table-cell" scope="row">
                  <IconsPerfil class="me-3 opacity-75" width="30px" height="30px" />
                  Ivano Cleudeson
                </th>
                <th class="text-start table-cell" scope="row">
                  ivanocleudson@gmail.com
                </th>
                <th class="text-start table-cell" scope="row">
                  Admin
                </th>
                <button :class="{'d-none': !isProfileBtn}" class="profile-btn position-absolute btn btn-primary">Ver perfil</button>
              </tr>
              <tr @mouseover="isProfileBtn = true" @mouseout="isProfileBtn = false">
                <th class="text-start table-cell" scope="row">
                  <IconsPerfil class="me-3 opacity-75" width="30px" height="30px" />
                  Ivano Cleudeson
                </th>
                <th class="text-start table-cell" scope="row">
                  ivanocleudson@gmail.com
                </th>
                <th class="text-start table-cell" scope="row">
                  Admin
                </th>
                <button :class="{'d-none': !isProfileBtn}" class="profile-btn position-absolute btn btn-primary">Ver perfil</button>
              </tr>
              <tr @mouseover="isProfileBtn = true" @mouseout="isProfileBtn = false">
                <th class="text-start table-cell" scope="row">
                  <IconsPerfil class="me-3 opacity-75" width="30px" height="30px" />
                  Ivano Cleudeson
                </th>
                <th class="text-start table-cell" scope="row">
                  ivanocleudson@gmail.com
                </th>
                <th class="text-start table-cell" scope="row">
                  Admin
                </th>
                <button :class="{'d-none': !isProfileBtn}" class="profile-btn position-absolute btn btn-primary">Ver perfil</button>
              </tr>
  
            </template>
          </TablesTable>
        </div>
      </div>
    </div>
    <div class="dashboard-section bg-light mb-4 pb-0 pt-0 rounded-3">
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
          <tr class="text-center">
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-center justify-content-center">
                  <IconsPerfil class="me-3 mb-0 opacity-75" width="30px" height="30px" />
                  Ivano Cleudeson
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Consumido
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Esponja bombril
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Unidade
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  20
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  20-03-2024 19h:29m
                </div>
              </th>
            </tr>
            <tr class="text-center">
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-center justify-content-center">
                  <IconsPerfil class="me-3 mb-0 opacity-75" width="30px" height="30px" />
                  Ivano Cleudeson
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Consumido
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Esponja bombril
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Unidade
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  20
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  20-03-2024 19h:29m
                </div>
              </th>
            </tr>
            <tr class="text-center">
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-center justify-content-center">
                  <IconsPerfil class="me-3 mb-0 opacity-75" width="30px" height="30px" />
                  Ivano Cleudeson
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Consumido
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Esponja bombril
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Unidade
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  20
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  20-03-2024 19h:29m
                </div>
              </th>
            </tr>
            <tr class="text-center">
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-center justify-content-center">
                  <IconsPerfil class="me-3 mb-0 opacity-75" width="30px" height="30px" />
                  Ivano Cleudeson
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Consumido
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Esponja bombril
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Unidade
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  20
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  20-03-2024 19h:29m
                </div>
              </th>
            </tr>
            <tr class="text-center">
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-center justify-content-center">
                  <IconsPerfil class="me-3 mb-0 opacity-75" width="30px" height="30px" />
                  Ivano Cleudeson
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Consumido
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Esponja bombril
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  Unidade
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  20
                </div>
              </th>
              <th class="table-cell" scope="row">
                <div class="d-flex align-items-end mt-1 justify-content-center">
                  20-03-2024 19h:29m
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
import { inject, ref } from 'vue';

const isProfileBtn = ref(false)


const setpageTitle = inject('setpageTitle');

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
.container{
  width: 100%;
	padding-left: 15px;
  flex-direction: column;
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
  right: 40px !important;
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