<template>
    <div class="d-flex profile align-items-center me-3">
          <div @mouseover="toolTip = true" @mouseout="toolTip = false" class="me-2 nav-item dropdown">
            <button class="svg-button bg-primary px-0" data-bs-toggle="dropdown" data-bs-offset="20,15" aria-expanded="false">
              <IconsBell with="16px" height="16px"/>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{requests.content.length}}+
                <span class="visually-hidden">unread messages</span>
              </span>
            </button>
            <ul class="dropdown-menu notification-menu py-2">
              <li v-for="(request, index) in requests.content" :key="index" class="dropdown-item notification">
                <div class="text-dark-emphasis d-flex align-items-center">
                  <IconsWarning class="me-2 notification-text"/>
                  <p class="notification-text m-0 p-0">{{request.user.name}} solicitou {{ request.quantityRequested }} {{request.item.name}}.
                  </p>
                 </div>
                <span class="notification-text ms-0 opacity-75 text-dark-emphasis">Há {{ passedDate[index].month }} {{ passedDate[index].day }} {{ passedDate[index].hour }} {{ passedDate[index].minute }}</span>
              </li>
              <li v-show="!isNotification || requests.content.length === 0" class="mt-5 dropdown-item fs-6 text-dark-emphasis" style="background-color: white;">Nenhuma notificação enviada.</li>
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
              <li><NuxtLink class="dropdown-item py-1 ps-2 d-flex align-items-center justify-content-between" :to="`/perfil?userId=${userStore.id}`" :route="`/perfil/${userStore.id}`"">
                Perfil
                <IconsProfile />
              </NuxtLink></li>
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
import { useStorageStore } from '../../stores/storage';
import { getUserByEmail } from '../../services/users/userGET';
import { getRequestByStatus } from '../../services/requests/requestsGET';
import { onMounted, ref } from 'vue';
const toolTip = ref(false)

const actualDate = new Date;
const userStore = useUser();
const requests = await getRequestByStatus(userStore, 'pendente')

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
function toPositive(number) {
  return Math.abs(number);
}

let passedDate = [];

for (let i = 0; i < requests.content.length; i++) {
  passedDate[i] = {};

  const creationDate = new Date(requests.content[i].creationDate);

  let monthDiff = toPositive(actualDate.getMonth() - creationDate.getMonth());
  passedDate[i].month = monthDiff > 0 ? (monthDiff === 1 ? `${monthDiff} mês` : `${monthDiff} meses`) : '';

  let dayDiff = toPositive(actualDate.getDate() - creationDate.getDate());
  passedDate[i].day = dayDiff > 0 ? (dayDiff === 1 ? `${dayDiff} dia` : `${dayDiff} dias`) : '';

  let hourDiff = actualDate.getHours() - creationDate.getHours();
  let minuteDiff = actualDate.getMinutes() - creationDate.getMinutes();

  if (minuteDiff < 0) {
    minuteDiff += 60;
    hourDiff--; 
  }

  passedDate[i].hour = hourDiff > 0 ? (hourDiff === 1 ? `${hourDiff} hora` : `${hourDiff} horas`) : '';

  passedDate[i].minute = minuteDiff > 0 ? (minuteDiff === 1 ? `${minuteDiff} minuto` : `${minuteDiff} minutos`) : '';
}

</script>

<style scoped>
.not-close:active{
  transform: scale(1.30);
}
.notification-menu{
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
  font-weight: bold
}
.dropdown-item:hover{
  color: rgb(0, 0, 0, 0.8);
  background-color: rgb(254, 213, 30, 0.4) !important;
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