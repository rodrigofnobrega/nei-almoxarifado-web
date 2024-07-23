<template>
  <Modal id="updatePasswordModal" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
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
        <label v-if="currentPassword" class="form-label" for="newPassword">Nova senha:</label>
        <div v-if="currentPassword" id="newPassword" class="d-flex justify-content-end">
          <input :class="newPassword === currentPassword || newPassword && newPassword.length < 6 ? 'border-light-alert' : ''" class="form-control mb-2" :type="showPassword[1] ? 'text' : 'password'" v-model="newPassword">
          <IconsOpenEye v-if="!showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
          <IconsCloseEye v-if="showPassword[1]" @click="showPassword[1] = !showPassword[1]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
        </div>
        <p class="text-dark-alert fw-bold" v-if="newPassword && newPassword.length < 6">A senha deve possuir 6 caracteres ou mais.</p>
        <p class="text-dark-alert fw-bold" v-if="newPassword && newPassword === currentPassword">A nova senha deve ser diferente da atual.</p>

        <label v-if="currentPassword && newPassword != currentPassword && newPassword.length >= 6" class="form-label" for="confirmPassword">Confirmar senha:</label>
        <div v-if="currentPassword && newPassword != currentPassword && newPassword.length >= 6" class="d-flex justify-content-end">
          <input id="confirmPassword" :class="confirmPassword && newPassword != confirmPassword ? 'border-light-alert' : ''" class="form-control" :type="showPassword[2] ? 'text' : 'password'" v-model="confirmPassword">
          <IconsOpenEye v-if="!showPassword[2]" @click="showPassword[2] = !showPassword[2]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
          <IconsCloseEye v-if="showPassword[2]" @click="showPassword[2] = !showPassword[2]" class="position-absolute me-2 text-light-emphasis" width="25" height="40"/>
        </div>
        <p class="text-dark-alert fw-bold" v-if="newPassword && confirmPassword && newPassword != confirmPassword">Senhas não conferem.</p>
      </div>
    </template>
    <template v-slot:footer>
      <div class="container-fluid d-flex align-items-center justify-content-end">
        <button v-if="currentPassword && newPassword === confirmPassword && newPassword != currentPassword" @click="changePassword" class="btn btn-secondary me-2 text-light fw-bold px-1">Confirmar</button>
        <button @click="resetModal" class="btn btn-light-alert text-light fw-bold px-1" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </template>
  </Modal>

  <Modal id="deleteAccount" tabindex="-1" data-bs-backdrop="true" aria-labelledby="scrollableModalLabel" aria-hidden="true">
    <template v-slot:header>
      <h6 class="header-title d-flex fw-medium justify-content-start align-items-center">Confirmar exclusão de conta</h6>
        <button class="btn btn-transparent text-light border-0 close-btn" type="button" data-bs-dismiss="modal">
            <IconsClose class="close ms-5" width="1.3em" height="1.3em"/>
        </button>
    </template>
    <template v-slot:body>
      <p class="fw-medium text-center">Ao excluir você não terá mais acesso ao sistema por meio dela, porém seus dados ainda ficarão
         disponíveis para os administradores como históricos e registros.</p>
         <p class="fw-bold text-center">Deseja realmente desativar a sua conta?</p>
    </template>
    <template v-slot:footer>
      <div class="container-fluid d-flex justify-content-end align-items-center">
                <button type="button" class="btn btn-light-alert inset-shadow text-light mx-1 fw-bold" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" @click="deleteAccount" class="btn btn-light-success inset-shadow text-light mx-1 fw-bold" data-bs-dismiss="modal">Confirmar</button>
            </div>
    </template>
  </Modal>

  <div class="container-fluid profile-container">
    <div class="profile-sidebar bg-light rounded-3 flex-column align-items-center">
      <div class="d-flex justify-content-center mb-4 bg-light-background-header history-title">
          <h5 class="text-center mt-2 fw-bold">Informações do perfil</h5>
      </div>
      <div class="profile-picture aspect-ratio">
        <div class="img-container">
          <img :src="user.profilePicture" class="img-top" alt="Foto de Perfil">
        </div>
        <input type="file" @change="uploadProfilePicture" ref="fileInput" hidden>
        <!--<button @click="selectProfilePicture">Alterar Foto</button>-->
      </div>
      <div class="profile-details">
        <div>
          <h3 class="text-center mb-4">{{ userData.name }}</h3>
          <p class="mt-3"><strong>Email:</strong> {{ userData.email }}</p>
          <p class="mt-3"><strong>Encargo:</strong> {{ userData.role === 'ADMIN' ? 'Administrador' : 'Usuário' }}</p>
          <p class="mt-3"><strong>Status da conta:</strong> {{ userData.active ? 'Ativa' : 'Desativada' }}</p>
        </div>
      </div>
      <div class="profile-actions mt-5">
        <button v-if="userStore.id == route.currentRoute._rawValue.query.userId" data-bs-target="#updatePasswordModal" data-bs-toggle="modal" class="btn btn-secondary">Alterar Senha</button>
        <button v-if="userStore.id == route.currentRoute._rawValue.query.userId" data-bs-target="#deleteAccount" data-bs-toggle="modal" class="btn fs-6 btn-light-alert">Excluir Conta</button>
      </div>
    </div>
    <div class="profile-main-content overflow-x-scroll">
      <div class="profile-posts me-2 bg-light mb-4 mt-0 pb-0 pt-0 rounded-3">
        <div class="history-title pt-2 bg-light-background-header">
          <h5 class="ms-3 fw-bold">Histórico de Solicitações</h5>
        </div>
        <div class="posts-table">
          <TablesTable>
            <template v-slot:header>
              <tr class="bg-light">
                <th class="col-title table-col fw-bold text-center py-2" scope="col">Nome</th>
                <th class="col-title table-col fw-bold text-center py-2" scope="col">Tipo</th>
                <th class="col-title table-col fw-bold text-center py-2" scope="col">Sipac</th>
                <th class="col-title table-col fw-bold text-center py-2" scope="col">Quantidade</th>
                <th class="col-title table-col fw-bold text-center py-2" scope="col">Status</th>
                <th class="col-title table-col fw-bold text-center py-2" scope="col">Data e horário</th>
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
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { getUserId } from '../services/users/userGET';
import { getRequestByUser } from '../services/requests/requestsGET';
import { useUser } from '../stores/user';
import { usePopupStore } from '../stores/popup';
import { updatePasswordPUT } from '../services/users/userPUT';
import { deleteUser } from '../services/users/userDELETE';

definePageMeta({
  layout: 'client'
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


const fetchRequests = async (page) => {
  const response = await getRequestByUser(userStore, userData.id, page);

  requestsTotalPages.value = response.totalPages;
  requestsTotalElements.value = response.totalElements;
  userRequests.value = [...userRequests.value, ...response.content]
}

await fetchRequests(currentPage.value);


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

const deleteAccount = async () => {
  const res = await deleteUser(userStore, userStore.id);
}

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
      if (isBottom && currentPage.value < requestsTotalPages.value - 1) {
        currentPage.value++;
        await fetchRequests(currentPage.value);
      }
    }
  });
});
</script>

<style scoped>
.profile-container {
  display: flex;
  margin-top: 90px;
  margin-bottom: 100px;
}
h3{
  color: rgb(51,51,51, 0.9);
}
.profile-sidebar {
  flex: 1;
  margin-bottom: 23px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.profile-details, .profile-actions{
  padding: 0px 20px 0px 20px;
}

.profile-main-content {
  flex: 3;
  padding: 0px 20px 0px 20px;
  margin-top: 0px !important;
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
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
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
.close{
    position: relative;
    left: 20px;
}
.header-title{
    font-weight: 300;
    margin: -1px 0 -1px 0;
    padding: 0;
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
@media screen and (max-width: 834px){
  .profile-container{
    display: block;
  }
}
</style>
