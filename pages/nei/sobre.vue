<template>
  <div class="container-fluid">
    <div class="description-container">
      <h1 class="d-flex description-title justify-content-center ">Sistema de Gerenciamento de Almoxarifado NEI</h1>
      <br>
      <p>Este sistema foi projetado para a gestão e organização eficiente dos itens do almoxarifado do 
        Núcleo de Educação da Infância (NEI) - CAp/UFRN, garantindo o controle preciso da entrada e saída de materiais. 
        Desenvolvido por estudantes do curso de 
        <a href="https://www.metropoledigital.ufrn.br/portal/">Bacharelado em Tecnologia da Informação</a>
        da Universidade Federal do Rio Grande do Norte 
        <a href="https://www.ufrn.br/">UFRN</a>, de forma totalmente voluntária e de acordo com as normas da instituição
        . O sistema reflete um compromisso com a inovação e a excelência acadêmica, 
        oferecendo uma solução robusta e prática para as necessidades de gerenciamento do NEI.</p>

      <br>
    </div>
    <div class="my-5 description-container">
      <h1 class="d-flex description-title justify-content-center ">Documentação e Guia de Uso</h1>
      <br>
      <p>O sistema consiste em 4 funções principais: organização e cadastro dos itens do almoxarifado, 
        controle do acesso a estes itens por meio das solicitações feitas pelo sistema, registros das operações pertinentes realizadas para fins de auditoria 
      e funcionalidades de análise gráfica, geração de relatórios e outras por meio dos dados obtidos pelo uso do sistema.  </p>
      <br>
    </div>
    <h2 class="d-flex mb-5 justify-content-center">Desenvolvedores</h2>
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-sm-6 col-md-4 mb-4" v-for="(card, index) in cards" :key="index">
        <div class="card bg-light card-hover-effect fixed-height-card d-flex align-items-center flex-column" style="width: 100%;">
          <a type="button" :href="`mailto:${card.email}`" class="mailto-btn btn btn-primary">Enviar email</a>
          <div class="card-img-container mt-5">
            <img :src="card.image" class="card-img-top" :alt="card.title">
          </div>
          <div class="card-body d-flex flex-column" style="width: 100%;">
            <h5 class="card-title d-flex justify-content-center">{{ card.title }}</h5>
            <p class="card-text flex-grow-1 text-center">{{ card.description }}</p>
            <div class="mt-auto links d-flex justify-content-center align-items-center">
              <a :href="card.link1" class="btn btn-dark btn-links p-1 d-flex align-items-center" target="_blank">GitHub
                <img class="ms-1" src="/github.svg" width="16" height="16">
              </a>
              <a :href="card.link2" class="btn btn-primary btn-links p-1 d-flex align-items-center" target="_blank">LinkedIn
                <img class="ms-1" src="/linkedin.png" width="18" height="15">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { setPageLayout } from 'nuxt/app';
import { ref } from 'vue';
definePageMeta({
    layout: 'client'
})

// Define o titulo da página
  // Lista de objetos com dados dos cards
  const cards = ref([
  {
    image: '/foto_andriel.jpg',
    title: 'Andriel Vinicius',
    description: 'Contribuição no Front-End. Desenvolvedor da API no Back-End.',
    email: 'andrielvinnicius@gmail.com',
    link1: 'https://github.com/leirdan',
    link2: 'https://www.linkedin.com/in/andriel-vinicius-b6a734256/'
  },
  {
    image: '/foto_caio.jpg',
    title: 'Caio Daniel',
    description: 'Desenvolvedor Front-End.',
    email: 'caiodanielfonseca@gmail.com',
    link1: 'https://github.com/Caio2a7',
    link2: 'https://www.linkedin.com/in/caio-daniel-1b8951269/'
  },
  {
    image: '/foto_murilo.jpg',
    title: 'Murilo Costa',
    description: 'Desenvolvedor Front-End.',
    email: 'muriloalimacosta@hotmail.com',
    link1: 'https://github.com/Mulirous',
    link2: 'https://www.linkedin.com/in/murilo-antonio-lima-da-costa-687b51273/'
  },
  {
    image: '/foto_rodrigo.jpg',
    title: 'Rodrigo Ferreira',
    description: 'Desenvolvedor Back-End e Front-End.',
    email: 'rodrigofnobrega1@gmail.com',
    link1: 'https://www.github.com/rodrigofnobrega',
    link2: 'https://www.linkedin.com/in/rodrigo-ferreira-da-n%C3%B3brega-509116305/'
  },
  {
    image: '/foto_clezio.jpg',
    title: 'Clézio',
    description: 'Gestão do time.',
    email: 'cleziorsjunior@gmail.com',
    link1: 'https://github.com/cleziojr',
    link2: 'https://www.linkedin.com/in/cl%C3%A9zio-rog%C3%A9rio-550b17288'
  },
]);
</script>

<style scoped>
.container-fluid{
  padding-top: 100px;
  padding-bottom: 100px;
}
.description-container {
  margin: 15px;
}
.card-hover-effect {
  border-radius: 20px;
  background: transparent;
  border: 1px solid rgb(0, 0, 0, 0.4);
  transition: transform 0.3s ease-in-out;
  z-index: 1;
}
.card-hover-effect:hover {
  transform: scale(1.03);
  z-index: 2;
}
.btn-links {
  font-weight: bold;
  font-size: 12px;
  margin-right: 10px;
}
.mailto-btn{
  color: transparent !important;
  border-radius: 0;
  padding: 0px 10px 0 10px;
  height: 0;
  transition: height 0.5s ease-in-out;
  position: absolute;
}
.card-hover-effect:hover .mailto-btn {
  color: white !important;
  height: 37px;
  padding-top: 4px;
  transition: height 0.5s ease-in-out;
}
.card-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;
  width: 200px;
  height: 200px; 
  margin: 0 auto 10px;
  margin-top: 10px;
}

.card-img-top {
  width: 100%;
  height: auto;
  display: block;
}

.fixed-height-card {
  min-height: 420px; 
  display: flex;
  flex-direction: column;
}

.card-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-text {
  flex-grow: 1;
}
@media screen and (max-width: 859px){
  .description-title{
    text-align: center;
  }
}
</style>
