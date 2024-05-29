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
                <a :href="card.link" class="btn btn-primary">Dev Links</a>
                <a :href="card.link" class="btn btn-primary">Dev Links</a>
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
    image: 'https://via.placeholder.com/150',
    title: 'Dev Name 1',
    description: 'Dev Description 1',
    link: '#'
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Dev Name 2',
    description: 'Dev Description 2',
    link: '#'
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Dev Name 3',
    description: 'Dev Description 3',
    link: '#'
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Dev Name 4',
    description: 'Dev Description 4',
    link: '#'
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Dev Name 5',
    description: 'Dev Description 5',
    link: '#'
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Dev Name 6',
    description: 'Dev Description 6',
    link: '#'
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
