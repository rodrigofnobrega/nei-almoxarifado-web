<template>
<div class="row d-block" style="margin-left: 0px;">
    <div class="container-fluid d-flex justify-content-center aligm-items-center">
        <div class="card me-2 rounded-3" style="width: 34rem;">
          <img src="/almo.png" class="card-img-top" alt="...">
          <div class="card-body text-dark-emphasis">
            <a href="/inventario/almoxarifado-escolar" class="fs-5 stretched-link text-dark-emphasis" style="text-decoration: none;">Almoxarifado Escolar</a>
            <p class="card-text">Itens relacionados as práticas escolar de arte, desenho, escrita, gincana e quaisquer atividades escolar que necessitem de insumos para realização.</p>
          </div>
        </div>
        <div class="card mx-2 rounded-3" style="width: 34rem;">
          <img src="/almo2.png" class="card-img-top" alt="...">
          <div class="card-body text-dark-emphasis">
            <a href="/inventario/almoxarifado-funcionarios" class="fs-5 stretched-link text-dark-emphasis" style="text-decoration: none;">Almoxarifado Funcionários</a>
            <p class="card-text">Insumos para uso dos funcionários da limpeza, manuntenção e administração da instituição.</p>
          </div>
        </div>
        <div class="card mx-2 rounded-3" style="width: 34rem;">
          <img src="/almo3.png" class="card-img-top" alt="...">
          <div class="card-body text-dark-emphasis">
            <a href="/inventario/almoxarifado-escolar" class="fs-5 stretched-link text-dark-emphasis" style="text-decoration: none;">Almoxarifado Informático</a>
            <p class="card-text">Materiais que possuem relação com equipamentos e ferramentas de informática.</p>
          </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { inject } from 'vue';

const setpageTitle = inject('setpageTitle');

const sendDataToParent = () => {
    const data = "Inventário";
    setpageTitle(data);
};
sendDataToParent();
</script>

<style scoped>
.page-title{
	background-color: #F2F2F2;
	width: 87.6vw;
	border-bottom: 1px ridge #D9D9D9;
	margin-bottom: 20px;
}
h2{
    font-weight: 300;
    color: rgb(51,51,51, 0.8);
}

.catalog-header{
    justify-content: space-between;
}
.card{
    padding: 0px;
    transition: transform 0.4s ease-in-out;
}
.card-img-top{
    transition: opacity 0.4s ease-in-out;
    opacity: 90%;
}
.card-body{
    transition: background-color 0.2s ease-in-out;
}
.card:hover{
    transform: scale(1.04);
}
.card:hover .card-img-top{
    opacity: 100%;
}
.card:hover .card-body{
    background-color: #0B3B69;
    color: white !important;
}
.card:hover .stretched-link{
    color: white !important;
}
.action-btn{
    margin-right: 10px;
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
</style>