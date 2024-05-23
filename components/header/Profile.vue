<template>
    <div class="d-flex profile align-items-center me-3">
          <div @mouseover="toolTip = true" @mouseout="toolTip = false" class="me-2 nav-item dropdown">
            <button class="svg-button bg-primary px-0" data-bs-toggle="dropdown" data-bs-offset="20,15" aria-expanded="false">
              <IconsBell with="16px" height="16px"/>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                1+
                <span class="visually-hidden">unread messages</span>
              </span>
            </button>
            <ul class="dropdown-menu py-2">
              <li class="dropdown-item">
                <div class="text-dark-emphasis d-flex align-items-center">
                  <IconsWarning class="me-2 notification-text"/>
                  <p class="notification-text m-0 p-0">Ferreira solicitou 20 esponjas bombril.
                  </p>
                  <IconsClose type="button" class="notification-text ms-2" width="22px" height="22px"/>
                </div>
                <span class="notification-text ms-0 opacity-75 text-dark-emphasis">Há 4h</span>
              </li>

              <li class="dropdown-item">
                <div class="text-dark-emphasis d-flex align-items-center">
                  <IconsWarning class="me-2 notification-text"/>
                  <p class="notification-text m-0 p-0">Ferreira solicitou 20 esponjas bombril.
                  </p>
                  <IconsClose class="notification-text ms-2" width="22px" height="22px"/>
                </div>
                <span class="notification-text ms-0 opacity-75 text-dark-emphasis">Há 4h</span>
              </li>

              <li class="dropdown-item">
                <div class="text-dark-emphasis d-flex align-items-center">
                  <IconsWarning class="me-2 notification-text"/>
                  <p class="notification-text m-0 p-0">Ferreira solicitou 20 esponjas bombril.
                  </p>
                  <IconsClose class="notification-text ms-2" width="22px" height="22px"/>
                </div>
                <span class="notification-text ms-0 opacity-75 text-dark-emphasis">Há 4h</span>
              </li>
              <li v-show="!isNotification" class="dropdown-item text-dark-emphasis" style="background-color: white;">Nenhuma notificação enviada.</li>
            </ul>
            <TooltipsRectangular class="pt-3" :toolTipState="toolTip" :toolTipText="'Notificações'"/>
          </div>
            <div class="nav-item dropdown">
              <button class="svg-button  d-flex bg-primary align-items-center" @click="rotate" data-bs-toggle="dropdown" data-bs-offset="10,10" data-bs-auto-close="inside" aria-expanded="false">
                <p class="profile-drop user-text text-light px-1 m-0 fw-light"> {{ user.username }} </p>
                <LoadersLoading class="small-loader text-light p-1"/>
                  <IconsDownArrow class="rotate-arrow" :style="{ transform: isRoted ? 'rotate(180deg)' : 'rotate(0deg)'}" width="24px" height="24px"/>
              </button>
              <ul class="dropdown-menu">
                <li class="dropdown-item info"> {{ user.name }} </li>
                <li><a class="dropdown-item py-1 ps-2 d-flex align-items-center justify-content-between" href="/perfil">
                  Perfil
                  <IconsProfile />
                </a></li>
                <li><a class="dropdown-item py-1 ps-2 d-flex align-items-center justify-content-between" href="/configuracoes">
                  Configurações
                  <IconsSettings />
                </a></li>  
                <li><button @click="logout()" class="exit-options py-1 ps-2 dropdown-item d-flex align-items-center justify-content-between">
                  Sair
                  <IconsExit />
                </button></li>
              </ul>
            </div>
        </div>
</template>

<script setup>
import { useUser } from '../../stores/user';
import { getUserByEmail } from '../../services/users/userGET';
import { ref } from 'vue';
const toolTip = ref(false)

const userStore = useUser();

const isNotification = ref(true)
const isRoted = ref(false);
const user = ref({username: '', name: ''});
getUsername()
function rotate(){
  isRoted.value = !isRoted.value;
}
function logout(){
  userStore.logout()
}
async function getUsername(){
  const res = await getUserByEmail(userStore, userStore.email); 
  user.value.username = res.name;
}

</script>

<style scoped>
.dropdown-menu{
  height: 172px;
  overflow-y: scroll;
}
.small-loader{
    width: 12px;
    height: 12px;
}
.rotate-arrow{
  transition: transform 0.3s ease-in-out;
}
.dropdown-menu{
  padding: 0;
}
.dropdown-item{
  font-size: 14px;
}
.rounded-pill{
  align-items: center;
  justify-content: center;
  display: flex !important;
  text-align: center !important;
  font-size: 11px;
  width: 17px;
  height: 17px;
  z-index: 2000;
}
.notification-text{
  font-weight: bold;
  font-size: 12px;
}
.svg-button{
    border: none;
    padding: 0;
    margin: 0;
    background: none;
}
.user-text {
    font-size: 20px;
}
.dropdown-item:hover .notification-text{
  color: white !important;
  font-weight: bold;
}
.svg-button:hover img{
  transition: filter 0.3s ease-in-out;
  filter: drop-shadow(0px 0px 7px rgba(254, 213, 30, 1));
}
.profile-drop:hover{
  transition: filter 0.3s ease-in;
  filter: drop-shadow(0px 0px 8px rgba(254, 213, 30, 1));
}
</style>