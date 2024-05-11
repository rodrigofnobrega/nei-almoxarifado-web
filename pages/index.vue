<template>
<div class="container d-block" style="margin-left: 0px;">
  <h2>Gráfico e Métricas</h2>
   <div class="containerf-fluid d-flex justify-content-center aligm-items-center">
      <CardsImageCard >
        <template v-slot:image-cap>
          <img src="/almo.png" class="card-img-top" alt="...">
        </template>
        <template v-slot:body>
          <a href="/inventario/almoxarifado-escolar" class="fs-5 stretched-link text-dark-emphasis">Almoxarifado Escolar</a>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </template>
      </CardsImageCard>
      <CardsImageCard>
        <template v-slot:image-cap>
          <img src="/almo2.png" class="card-img-top" alt="...">
        </template>
        <template v-slot:body>
          <a href="/inventario/almoxarifado-escolar" class="fs-5 stretched-link text-dark-emphasis">Almoxarifado Escolar</a>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </template>
      </CardsImageCard>
      <CardsImageCard>
        <template v-slot:image-cap>
          <img src="/almo3.png" class="card-img-top" alt="...">
        </template>
        <template v-slot:body>
          <a href="/inventario/almoxarifado-escolar" class="fs-5 stretched-link text-dark-emphasis">Almoxarifado Escolar</a>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </template>
      </CardsImageCard>
    </div>
</div>
</template>

<script setup>
import { inject } from 'vue';

const setpageTitle = inject('setpageTitle');


const sendDataToParent = () => {
    const data = "Painel Geral";
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
</style>