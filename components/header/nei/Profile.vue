<template>
    <div class="d-flex profile align-items-center me-3">
          <div class="nav-item dropdown">
            <button class="svg-button bg-primary px-2" data-bs-toggle="dropdown" data-bs-offset="20,15" aria-expanded="false">
                <IconsBell with="16px" height="16px"/>
            </button>
            <ul class="dropdown-menu py-2">
              <li class="dropdown-item text-dark-emphasis" style="background-color: white;">Nenhuma notificação enviada.</li>
            </ul>
          </div>
            <div class="nav-item dropdown">
              <button class="svg-button  d-flex bg-primary align-items-center" @click="rotate" data-bs-toggle="dropdown" data-bs-offset="10,10" data-bs-auto-close="inside" aria-expanded="false">
                  <p class="profile-drop user-text text-light px-1 m-0 fw-light"> {{ user.username }} </p>
                  <IconsDownArrow class="rotate-arrow" :style="{ transform: isRoted ? 'rotate(180deg)' : 'rotate(0deg)'}" width="24px" height="24px"/>
              </button>
              <ul class="dropdown-menu">
                <li class="dropdown-item info"> {{ user.name }} </li>
                <li><a class="dropdown-item py-1 ps-2 d-flex align-items-center justify-content-between" href="/nei/perfil">
                  Perfil
                  <IconsProfile />
                </a></li>
                <li><a class="dropdown-item py-1 ps-2 d-flex align-items-center justify-content-between" href="/nei/configuracoes">
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
import { useUser } from '../../../stores/user';
import { getUserByEmail } from '../../../services/users/userGET';

const userStore = useUser();
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

.rotate-arrow{
  transition: transform 0.3s ease-in-out;
}
.dropdown-menu{
  padding: 0;
}
.dropdown-item{
  font-size: 14px;
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
.svg-button:hover img{
  transition: filter 0.3s ease-in-out;
  filter: drop-shadow(0px 0px 7px rgba(254, 213, 30, 1));
}
.profile-drop:hover{
  transition: filter 0.3s ease-in;
  filter: drop-shadow(0px 0px 8px rgba(254, 213, 30, 1));
}
</style>