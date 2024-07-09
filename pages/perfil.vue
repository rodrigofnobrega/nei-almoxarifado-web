<template>
  <ModalSmallModal id="updatePasswordModal" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
    <template v-slot:header>
      <h6 class="header-title d-flex fw-medium justify-content-start align-items-center">Atualizar Senha</h6>
      <button class="btn btn-transparent text-light close-btn" type="button" data-bs-dismiss="modal">
        <IconsClose class="close ms-5 s-5" width="1.3em" height="1.3em"/>
      </button>
    </template>
    <template v-slot:body>
      <div class="container-fluid">
        <p>Digite sua senha atual para prosseguir</p>
        <label class="form-label" for="currentPassword">Senha atual:</label>
        <div class="d-flex justify-content-end">
          <input id="currentPassword" :class="handleUpdateBtn && currentPassword ? 'bg-light-emphasis' : 'bg-light'" class="form-control mb-2" :type="showPassword[0] ? 'text' : 'password'" v-model="currentPassword">
          <IconsOpenEye v-if="!showPassword[0]" @click="showPassword[0] = !showPassword[0]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
          <IconsCloseEye v-if="showPassword[0]" @click="showPassword[0] = !showPassword[0]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
        </div>
        <label v-if="handleUpdateBtn && currentPassword" class="form-label" for="newPassword">Nova senha:</label>
        <div v-if="handleUpdateBtn && currentPassword" id="newPassword" class="d-flex justify-content-end">
          <input :class="newPassword === currentPassword || newPassword && newPassword.length < 6 ? 'border-light-alert' : ''" class="form-control mb-2" :type="showPassword[1] ? 'text' : 'password'" v-model="newPassword">
          <IconsOpenEye v-if="!showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
          <IconsCloseEye v-if="showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
        </div>
        <p class="text-dark-alert fw-bold" v-if="newPassword && newPassword.length < 6">A senha deve possuir 6 caracteres ou mais.</p>
        <p class="text-dark-alert fw-bold" v-if="newPassword && newPassword === currentPassword">A nova senha deve ser diferente da atual.</p>

        <label v-if="handleUpdateBtn && currentPassword && newPassword != currentPassword && newPassword.length >= 6" class="form-label" for="confirmPassword">Confirmar senha:</label>
        <div v-if="handleUpdateBtn && currentPassword && newPassword != currentPassword && newPassword.length >= 6" class="d-flex justify-content-end">
          <input id="confirmPassword" :class="confirmPassword && newPassword != confirmPassword ? 'border-light-alert' : ''" class="form-control" :type="showPassword[2] ? 'text' : 'password'" v-model="confirmPassword">
          <IconsOpenEye v-if="!showPassword[2]" @click="showPassword[2] = !showPassword[2]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
          <IconsCloseEye v-if="showPassword[2]" @click="showPassword[2] = !showPassword[2]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
        </div>
        <p class="text-dark-alert fw-bold" v-if="newPassword && confirmPassword && newPassword != confirmPassword">Senhas não conferem.</p>
      </div>
    </template>
    <template v-slot:footer>
      <div class="container-fluid d-flex align-items-center justify-content-end">
        <button v-if="handleUpdateBtn && currentPassword && newPassword === confirmPassword && newPassword != currentPassword" @click="changePassword" class="btn btn-secondary me-2 text-light fw-bold px-1">Confirmar</button>
        <button @click="resetModal" class="btn btn-light-alert text-light fw-bold px-1" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </template>
  </ModalSmallModal>
  <div class="container-fluid profile-container d-flex">
    <div class="profile-sidebar bg-light rounded-3 d-flex flex-column align-items-center">
      <div class="profile-picture aspect-ratio">
        <div class="img-container">
          <img :src="user.profilePicture" class="img-top" alt="Foto de Perfil">
        </div>
        <input type="file" @change="uploadProfilePicture" ref="fileInput" hidden>
        <button @click="selectProfilePicture">Alterar Foto</button>
      </div>
      <div class="profile-details">
        <div>
          <h3>{{ userData.name }}</h3>
          <p><strong>Email:</strong> {{ userData.email }}</p>
          <p><strong>Cargo:</strong> {{ userData.role }}</p>
        </div>
      </div>
      <div class="profile-actions">
        <button data-bs-target="#updatePasswordModal" data-bs-toggle="modal">Alterar Senha</button>
      </div>
    </div>
    <div class="profile-main-content">
      <div class="profile-header">
        <h2>Informações do Usuário</h2>
      </div>
      
      <div class="profile-posts me-2 bg-light mb-4 pb-0 pt-0 rounded-3">
        <div class="history-title pt-2 bg-light-background-header">
          <h5 class="ms-3">Solicitações feitas</h5>
        </div>
        <div class="posts-table">
          <TablesTable>
            <template v-slot:header>
              <tr class="bg-light">
                <th class="col-title table-col text-center py-2" scope="col">Nome</th>
                <th class="col-title table-col text-center py-2" scope="col">Tipo</th>
                <th class="col-title table-col text-center py-2" scope="col">Sipac</th>
                <th class="col-title table-col text-center py-2" scope="col">Quantidade</th>
                <th class="col-title table-col text-center py-2" scope="col">Status</th>
                <th class="col-title table-col text-center py-2" scope="col">Data e horário</th>
              </tr>
            </template>
            <template v-slot:content>
              <tr v-if="userRequests.length > 0" v-for="request in userRequests" :key="request.id" class="text-center"> 
                <th class="table-cell mov-cell" scope="row">
                  <div class="d-flex table-text align-items-center justify-content-center" style="padding-top: 0px;">
                    {{ request.item.name || 'Nome não disponível' }}
                  </div>
                </th>
                <th class="table-cell mov-cell" scope="row">
                  <div class="d-flex table-text align-items-end mt-1 justify-content-center">
                    {{ request.item.type || 'Tipo não disponível' }}
                  </div>
                </th>
                <th class="table-cell mov-cell" scope="row">
                  <div class="d-flex table-text table-text align-items-end mt-1 justify-content-center">
                    {{ request.item.sipacCode ? request.item.sipacCode : 'nenhum' }}
                  </div>
                </th>
                <th class="table-cell mov-cell" scope="row">
                  <div class="d-flex table-text align-items-end mt-1 justify-content-center">
                    {{ request.quantityRequested }}
                  </div>
                </th>
                <th class="table-cell mov-cell" scope="row">
                  <div class="d-flex table-text align-items-center justify-content-center" style="padding-top: 0px;">
                    {{ request.status || 'Nome não disponível' }}
                  </div>
                </th>
                <th class="table-cell mov-cell" scope="row">
                  <div class="d-flex table-text align-items-end mt-1 justify-content-center">
                    {{ request.creationDate.slice(0, 19) }}
                  </div>
                </th>
              </tr>
              <tr v-else>
                <td colspan="5" class="text-center">Nenhum registro encontrado</td>
              </tr>
              </template>
            </TablesTable>
        </div>
      <p class="ms-2">{{userRequests.length}} de {{requestsTotalElements}}</p>
      </div>

      <div v-if="userRecords.length > 0" class="profile-posts me-2 bg-light mb-4 pb-0 pt-0 rounded-3">
        <div class="history-title pt-2 bg-light-background-header">
          <h5 class="ms-3">Itens cadastrados</h5>
        </div>
        <div class="posts-table">
          <TablesTable>
            <template v-slot:header>
              <tr class="bg-light">
                <th class="col-title table-col text-center py-2" scope="col">Nome</th>
                <th class="col-title table-col text-center py-2" scope="col">Tipo</th>
                <th class="col-title table-col text-center py-2" scope="col">Sipac</th>
                <th class="col-title table-col text-center py-2" scope="col">Quantidade</th>
                <th class="col-title table-col text-center py-2" scope="col">Data e horário</th>
              </tr>
            </template>
            <template v-slot:content>
              <tr v-if="userRecords.length > 0" v-for="post in userRecords" :key="post.id" class="text-center"> 
                <th class="table-cell mov-cell" scope="row">
                  <div class="d-flex table-text align-items-center justify-content-center" style="padding-top: 0px;">
                    {{ post.item.name || 'Nome não disponível' }}
                  </div>
                </th>
                <th class="table-cell mov-cell" scope="row">
                  <div class="d-flex table-text align-items-end mt-1 justify-content-center">
                    {{ post.item.type || 'Tipo não disponível' }}
                  </div>
                </th>
                <th class="table-cell mov-cell" scope="row">
                  <div class="d-flex table-text table-text align-items-end mt-1 justify-content-center">
                    {{ post.item.sipacCode ? post.item.sipacCode : 'nenhum' }}
                  </div>
                </th>
                <th class="table-cell mov-cell" scope="row">
                  <div class="d-flex table-text align-items-end mt-1 justify-content-center">
                    {{ post.quantity }}
                  </div>
                </th>
                <th class="table-cell mov-cell" scope="row">
                  <div class="d-flex table-text align-items-end mt-1 justify-content-center">
                    {{ post.creationDate.slice(0, 19) }}
                  </div>
                </th>
              </tr>
              <tr v-else>
                <td colspan="5" class="text-center">Nenhum registro encontrado</td>
              </tr>
              </template>
            </TablesTable>
        </div>
      <p class="ms-2">{{userRecords.length}} de {{recordsTotalElements}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { getUserId } from '../services/users/userGET';
import { getRecordByEmail } from '../services/record/recordGET';
import { getRequestByUser } from '../services/requests/requestsGET';
import { useUser } from '../stores/user';
import { usePopupStore } from '../stores/popup';
import { updatePasswordPUT } from '../services/users/userPUT';

definePageMeta({
  layout: 'profile'
});

const userStore = useUser();
const popUpStore = usePopupStore();
const route = useRouter();
const userData = await getUserId(userStore, route.currentRoute._rawValue.query.userId);
const userRequests = ref([]);
const userRecords = ref([]);
let currentPage = ref(0);

const requestsTotalPages = ref(0);
const requestsTotalElements = ref(0);
const recordTotalPages = ref(0);
const recordsTotalElements = ref(0);

const fetchRecords = async (page) => {
  if(userData.role === 'USER'){
    return 0;
  }
  const response = await getRecordByEmail(userStore, userData.email, page);

  recordTotalPages.value = response.totalPages;
  recordsTotalElements.value = response.totalElements
  userRecords.value = [...userRecords.value, ...response.content];
};
const fetchRequests = async (page) => {
  const response = await getRequestByUser(userStore, userData.id, page);

  requestsTotalPages.value = response.totalPages;
  requestsTotalElements.value = response.totalElements;
  userRequests.value = [...userRequests.value, ...response.content]
}

await fetchRequests(currentPage.value);
if(userStore.role === 'ADMIN'){
  await fetchRecords(currentPage.value);
}

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const handleUpdateBtn = ref(false);
const showPassword = ref([false, false, false]);

const resetModal = () => {
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  handleUpdateBtn.value = false;
  showPassword.value = [false, false, false];
};

const user = ref({
  profilePicture: 'https://via.placeholder.com/150',
});

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

const changePassword = async () => {
  if (newPassword.value === confirmPassword.value) {
    try {
      const res = await updatePasswordPUT(userStore, userStore.id, currentPassword.value, newPassword.value, confirmPassword.value);
      popUpStore.throwPopup("Senha atualizada com sucesso", "#0B3B69");
      resetModal();
    } catch (err) {
      popUpStore.throwPopup("Erro: A senha atual digitada está incorreta", "#B71C1C");
    }
  } else {
    popUpStore.throwPopup("Erro: Preencha os campos corretamente", "#B71C1C");
  }
};

// Define o título da página
const setpageTitle = inject('setpageTitle');
const sendDataToParent = () => {
  const title = "Perfil";
  const route = `${useRoute().fullPath.slice(0, 7)}`;
  setpageTitle(title, route);
};
sendDataToParent();

onMounted(async () => {
  const currentPassWordInput = document.getElementById('currentPassword');
  currentPassWordInput.addEventListener('focusout', () => {
    if (currentPassword.value) {
      handleUpdateBtn.value = true;
    }
  });
  const requestsTable = document.getElementsByClassName('posts-table')[0];
  requestsTable.addEventListener('scroll', async () => {
    if(userRequests.value.length < requestsTotalElements.value){
      const isBottom = requestsTable.scrollHeight - requestsTable.scrollTop === requestsTable.clientHeight;
      if (isBottom && currentPage.value < recordTotalPages.value - 1) {
        currentPage.value++;
        await fetchRequests(currentPage.value);
      }
    }
  });

  const postsTable = document.getElementsByClassName('posts-table')[1];
  postsTable.addEventListener('scroll', async () => {
    if(userRecords.value.length < recordsTotalElements.value){
      const isBottom = postsTable.scrollHeight - postsTable.scrollTop === postsTable.clientHeight;
      if (isBottom && currentPage.value < recordTotalPages.value - 1) {
        currentPage.value++;
        await fetchRecords(currentPage.value);
      }
    }
  });
});
</script>

<style scoped>
.profile-container {
  display: flex;
  height: 100vh;
}
.btn{
  font-size: 13px;
}
.profile-sidebar {
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-main-content {
  flex: 3;
  padding: 20px;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.posts-table{
  height: 200px !important;
  overflow-y: scroll;
}
.profile-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
}

.profile-actions button:hover {
  background-color: #0056b3;
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
.profile-history, .profile-posts{
  width: 99%;
  padding-top: 10px;
  padding-bottom: 0px;
  padding-left: 0;
  padding-right: 0;
  border: 1px #D9D9D9 solid;
  box-shadow: 3px 3px 13px 0px rgb(0, 0, 0, 0.2);
}
.profile-sidebar{
  border: 1px #D9D9D9 solid;
  box-shadow: 3px 3px 13px 0px rgb(0, 0, 0, 0.2);  
}
.history-title{
  border-radius: 8px 8px 0px 0px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
}
h5{
  font-weight: 300;
  color: rgb(51,51,51, 0.8);
}
.list-group{
  overflow-y: scroll;
  height: 200px;
}
.profile-history, .profile-posts {
  margin-top: 20px;
}

.profile-history h3, .profile-posts h3 {
  margin-bottom: 10px;
}


.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
}

.img-top {
  width: 100%;
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
.profile-details label {
  display: block;
  margin-bottom: 10px;
}
.list-group-item:hover{
  color: black;
  background-color: rgb(254, 213, 30, 0.4);
}
.header-title{
  font-weight: semibold;
  margin: -1px 0 -1px 0;
  padding: 0;
}
.modal-btn{
  border-radius: 10px;
}

</style>
