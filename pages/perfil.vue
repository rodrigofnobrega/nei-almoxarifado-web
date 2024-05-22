<template>
    <div class="container-fluid profile-container d-flex flex-column align-items-center">

      <div class="profile-header">
        <h2>Perfil do Usuário</h2>
      </div>

      <div class="profile-content">
        <div class="profile-picture">
          <img :src="user.profilePicture" alt="Foto de Perfil">
        </div>

        <div class="profile-details">
          <h3>{{ user.name }}</h3>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Cargo:</strong> {{ user.role }}</p>
        </div>
      </div>

      <div class="profile-actions">
        <button @click="editProfile">Editar Perfil</button>
        <button @click="changePassword">Alterar Senha</button>
      </div>

      <div class="profile-history">
        <h3>Histórico de Requisições</h3>
        <ul>
            <li v-for="request in user.requests" :key="request.id">{{ request.description }} - {{ request.date }}</li>
        </ul>
        </div>
    
        <div class="profile-posts">
            <h3>Postagens de Itens</h3>
            <ul>
                <li v-for="post in user.posts" :key="post.id">{{ post.description }} - {{ post.date }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';

const setpageTitle = inject('setpageTitle');

const sendDataToParent = () => {
  const data = "Perfil";
  setpageTitle(data);
};
sendDataToParent();

const user = ref({
  name: 'Rodregue Ferreirinha',
  email: 'rodrag.ferro@escola.com',
  role: 'Administrador',
  profilePicture: 'https://via.placeholder.com/150',
  requests: [
    { id: 1, description: 'Requisição de canetas', date: '2023-05-01' },
    { id: 2, description: 'Requisição de papéis', date: '2023-06-15' },
    { id: 3, description: 'Requisição de pilotos', date: '2024-05-22'}
  ],
  posts: [
    { id: 1, description: 'Postagem de cadernos', date: '2023-05-10' },
    { id: 2, description: 'Postagem de livros', date: '2023-06-20' }
  ]
});

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

const editProfile = () => {
  console.log('Editar Perfil');
};

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

.profile-picture img {
  border-radius: 50%;
  margin-bottom: 10px;
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

.profile-actions {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
}

.profile-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.profile-actions button:hover {
  background-color: #0056b3;
}

.profile-history, .profile-posts {
  width: 100%;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  background-color: #0B3B69;
}

.profile-history h3, .profile-posts h3 {
  margin-bottom: 10px;
  color:#f9f9f9;
}

.profile-history ul, .profile-posts ul {
  list-style-type: none;
  padding: 0;
}

.profile-history li, .profile-posts li {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f9f9f9
}
</style>