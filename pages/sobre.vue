<template>
  <div>
    <div class="descricao">
      <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, qui voluptate eligendi perspiciatis aut cum similique quas quibusdam delectus ea at expedita harum beatae dolor labore est tempore omnis doloremque.</h3>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum quidem quaerat maxime sequi pariatur quod ut enim veritatis, mollitia inventore ex voluptates asperiores atque beatae repudiandae laborum aspernatur veniam!</p>
      <br>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex ut in, aut, aspernatur nesciunt quo alias nam pariatur aperiam fugit, incidunt atque? Possimus officia, provident illum sunt rem tempora corrupti.</p>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-12 col-sm-6 col-md-4 mb-4" v-for="(card, index) in cards" :key="index">
          <div class="card card-hover-effect fixed-height-card d-flex flex-column" style="width: 100%;">

            <div class="card-img-container">
              <img :src="card.image" class="card-img-top" :alt="card.title">
            </div>

            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text flex-grow-1">{{ card.description }}</p>

              <div class="mt-auto links">
                <a :href="card.link1" class="btn btn-primary">GitHub</a>
                <a :href="card.link2" class="btn btn-primary">LinkedIn</a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { inject, ref } from 'vue';

// Define o titulo da página
const setpageTitle = inject('setpageTitle');
const sendDataToParent = () => {
    const data = "Sobre";
    setpageTitle(data);
};
sendDataToParent();

// Lista de objetos com dados dos cards
const cards = ref([
  {
    image: 'nei-almoxarifado-web\assets\img\foto_andriel.jpg',
    title: 'Andriel Vinícius',
    description: 'Contribuição no Front-End. Desenvolvedor da API no Back-End.',
    link1: 'http://github.com/leirdan',
    link2: 'https://www.linkedin.com/in/andriel-vinicius-b6a734256'
  },
  {
    image: 'nei-almoxarifado-web\assets\img\foto_caio.jpg',
    title: 'Caio Daniel',
    description: 'Desenvolvedor Front-End.',
    link1: '#',
    link2: '#'
  },
  {
    image: 'nei-almoxarifado-web\assets\img\foto_murilo.jpg',
    title: 'Murilo Costa',
    description: 'Desenvolvedor Front-End.',
    link1: 'https://github.com/Mulirous',
    link2: '#'
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Dev Name 4',
    description: 'Dev Description 4',
    link1: '#',
    link2: '#'
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Dev Name 5',
    description: 'Dev Description 5',
    link1: '#',
    link2: '#'
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Dev Name 6',
    description: 'Dev Description 6',
    link1: '#',
    link2: '#'
  }
]);
</script>

<style scoped>

.descricao {
  margin: 15px;
}

.card-hover-effect {
  transition: transform 0.3s ease-in-out;
  z-index: 1;
}
.card-hover-effect:hover {
  transform: scale(1.05);
  z-index: 2;
}

.btn {
  margin-right: 10px;
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
</style>
