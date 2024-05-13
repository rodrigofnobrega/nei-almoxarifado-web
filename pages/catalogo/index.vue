<template>
<div class="container" style="margin-left: 0px;"> 
    <div class="background-canvas bg-light mb-4 rounded-3 ps-2 pe-2">
       <div class="container-fluid d-flex px-0 justify-content-center aligm-items-center">
          <CardsImageCard>
            <template v-slot:image-cap>
              <img src="/almo.png" class="card-img-top" alt="...">
            </template>
            <template v-slot:body>
              <a href="/catalogo/almoxarifado" class="fs-5 stretched-link text-dark-emphasis">Almoxarifado Escolar</a>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </template>
          </CardsImageCard>
          <CardsImageCard>
            <template v-slot:image-cap>
              <img src="/almo2.png" class="card-img-top" alt="...">
            </template>
            <template v-slot:body>
              <a href="/catalogo/almoxarifado-escolar" class="fs-5 stretched-link text-dark-emphasis">Almoxarifado Escolar</a>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </template>
          </CardsImageCard>
          <CardsImageCard>
            <template v-slot:image-cap>
              <img src="/almo3.png" class="card-img-top" alt="...">
            </template>
            <template v-slot:body>
              <a href="/catalogo/almoxarifado-escolar" class="fs-5 stretched-link text-dark-emphasis">Almoxarifado Escolar</a>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </template>
          </CardsImageCard>
        </div>
    </div>
</div>
</template>

<script setup>
import { inject } from 'vue';

const setpageTitle = inject('setpageTitle');


const sendDataToParent = () => {
    const data = "Catálogos";
    setpageTitle(data);
};
sendDataToParent();
</script>

<style scoped>
.container{
  padding: 0;
  margin-right: 0px;
  flex-direction: column;
  margin-bottom: 100px;
}
.background-canvas{
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px #D9D9D9 solid;
  box-shadow: 6px 6px 20px 0px rgb(0, 0, 0, 0.2);
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