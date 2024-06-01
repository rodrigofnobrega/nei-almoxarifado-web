<template>
    <div class="container-fluid profile-container d-flex flex-column align-items-center">
  
      <div class="profile-header">
        <h2>Perfil do Usuário</h2>
      </div>
  
      <!-- Conteúdo do Perfil e Edição -->
      <div class="profile-content">
        <div class="profile-picture aspect-ratio">
          <div class="img-container">
            <img :src="user.profilePicture" class="img-top" alt="Foto de Perfil">
          </div>
          <input type="file" @change="uploadProfilePicture" ref="fileInput" hidden>
          <button @click="selectProfilePicture">Alterar Foto</button>
        </div>
  
        <!-- Detalhes do Perfil ou Edição -->
        <div class="profile-details">
          <!-- Visualização dos Detalhes -->
          <div v-if="!isEditing">
            <h3>{{ userData.name }}</h3>
            <p><strong>Email:</strong> {{ userData.email }}</p>
            <p><strong>Cargo:</strong> {{ userData.role }}</p>
          </div>
  
          <!-- Edição dos Detalhes -->
          <div v-else>
            <label>
              <strong>Nome:</strong>
              <input v-model="editData.name" type="text">
            </label>
            <label>
              <strong>Email:</strong>
              <input v-model="editData.email" type="email">
            </label>
            <label>
              <strong>Cargo:</strong>
              <input v-model="editData.role" type="text">
            </label>
          </div>
        </div>
      </div>
  
      <!-- Ações de Perfil -->
      <div class="profile-actions">
        <!-- Botões alternados com base no estado de edição -->
        <button v-if="!isEditing" @click="editProfile">Editar Perfil</button>
        <button v-if="isEditing" @click="saveProfile">Salvar</button>
        <button v-if="isEditing" @click="cancelEdit">Cancelar</button>
        <button @click="changePassword">Alterar Senha</button>
      </div>
  
      <!-- Histórico de Requisições -->
      <div class="profile-history">
        <h3>Histórico de Solicitações</h3>
        <ul>
          <li v-for="request in userRequests.content" :key="request.id">{{ request.description }} - {{ request.creationDate.slice(0,19) }}</li>
        </ul>
      </div>
  
      <!-- Postagens de Itens -->
      <div class="profile-posts">
        <h3>Postagens de Itens</h3>
        <ul>
          <li v-for="post in user.posts" :key="post.id">{{ post.description }} - {{ post.date }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  
  
<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserId } from '../services/users/userGET';
import { getRecordByEmail } from '../services/record/recordGET';
import { getRequestByUser } from '../services/requests/requestsGET';
import { useUser } from '../stores/user';
import { layouts } from 'chart.js';
definePageMeta({
  layout: 'profile'
})

const userStore = useUser();
const route = useRouter();
const userData = await getUserId(userStore, route.currentRoute._rawValue.query.userId)
const userRequests = await getRequestByUser(userStore, userData.id)
// Define o título da página

// Dados do usuário (mock)
const user = ref({
  name: 'Rodregue Ferreirinha',
  email: 'rodrag.ferro@escola.com',
  role: 'Administrador',
  profilePicture: 'https://via.placeholder.com/150',
  requests: [
    { id: 1, description: 'Requisição de canetas', date: '2023-05-01' },
    { id: 2, description: 'Requisição de papéis', date: '2023-06-15' },
    { id: 3, description: 'Requisição de pilotos', date: '2024-05-22' }
  ],
  posts: [
    { id: 1, description: 'Postagem de cadernos', date: '2023-05-10' },
    { id: 2, description: 'Postagem de livros', date: '2023-06-20' }
  ]
});

// Dados de edição do perfil
const editData = ref({ ...user.value });
const isEditing = ref(false); 

// Funções para upload da foto de perfil
const fileInput = ref(null);

const selectProfilePicture = () => {
  fileInput.value.click();
};

const uploadProfilePicture = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      user.value.profilePicture = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Funções para controle de edição do perfil (Novo)
const editProfile = () => {
  editData.value = { ...user.value };
  isEditing.value = true;
};

const saveProfile = () => {
  user.value = { ...editData.value };
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
};

// Placeholder para alterar senha
const changePassword = () => {
  console.log('Alterar Senha');
};
</script>

<style scoped>
.profile-container {
    max-width: 600px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    margin-top: 20px;
  }
  
  .profile-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .profile-content {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .profile-picture {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
  }
  
  .img-container {
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

  .img-top {
  width: 250%;
  height: auto;
  display: block;
}
  
  .profile-picture button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  
  .profile-picture button:hover {
    background-color: #0056b3;
  }
  
  .profile-details h3 {
    margin: 0;
  }
</style>