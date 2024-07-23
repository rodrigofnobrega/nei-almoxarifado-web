<template>
    <div class="d-flex profile align-items-center me-3">
          <div class="me-2 nav-item dropdown">
            <button title="Notificações" class="svg-button bg-primary px-0" data-bs-toggle="dropdown" data-bs-offset="20,15" aria-expanded="false">
              <IconsBell with="16px" height="16px"/>
              <span v-if="requests.length > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{requests.length}}
                <span class="visually-hidden">unread messages</span>
              </span>
            </button>
            <ul class="dropdown-menu notification-menu py-2">
              <li v-for="(request, index) in requests" :key="index" @mouseenter="closeNot[index] = true" @mouseover="closeNot[index] = true" @mouseout="closeNot[index] = false" class="dropdown-item notification">
                <div class="text-dark-emphasis d-flex align-items-center">
                  <div>
                    <IconsClose v-if="request.status === 'RECUSADO'" width="20" height="20" class="me-2 text-dark-alert notification-text"/>
                    <IconsConfirm v-if="request.status === 'ACEITO'" width="20" height="20" class="me-2 text-light-success  notification-text"/>
                  </div>
                  <p class="notification-text m-0 p-0">
                    Solicitação de {{ request.quantityRequested }} "{{request.item.name}}"
                    {{ request.status === 'ACEITO' ? 'aceita' : 'recusada' }}
                  </p>
                 </div>
                <span  v-if="passedDate.length > 0" class="notification-text ms-0 opacity-75 text-dark-emphasis">Há {{ passedDate[index].month }} {{ passedDate[index].day }} {{ passedDate[index].hour }} {{ passedDate[index].minute }}</span>
                <!--
                <div v-if="closeNot[index] === true" class="d-flex justify-content-end align-items-end">
                  <IconsClose @mouseenter="closeNot[index] = true" @mouseover="closeNot[index] = true" @click="removeNot(index)" class="position-fixed mb-1" width="30" height="30"/>
                </div>-->
              </li>
                <li v-show="!isNotification || requests.length === 0" class="dropdown-item fs-6 text-dark-emphasis" style="background-color: white;">Nenhuma notificação enviada.</li>
            </ul>
          </div>
          <div class="nav-item dropdown">
            <button class="svg-button  d-flex bg-primary align-items-center" @click="rotate" data-bs-toggle="dropdown" data-bs-offset="10,10" data-bs-auto-close="inside" aria-expanded="false">
              <p class="profile-drop user-text text-light px-1 m-0 fw-light"> {{ user.username }} </p>
              <LoadersLoading class="small-loader text-light p-1"/>
                <IconsDownArrow class="rotate-arrow" :style="{ transform: isRoted ? 'rotate(180deg)' : 'rotate(0deg)'}" width="24px" height="24px"/>
            </button>
            <ul class="dropdown-menu py-0">
              <li>
                <a class="dropdown-item py-1 ps-2 d-flex align-items-center justify-content-between" :href="`/nei/perfil?userId=${userStore.id}`">
                Perfil 
                <IconsProfile />
                </a>
              </li>
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
import { useNotifications } from '../../../stores/notifications';
import { getUserByEmail } from '../../../services/users/userGET';
import { getRequestByStatus, getRequestByUser } from '../../../services/requests/requestsGET';
import { onMounted, ref } from 'vue';
const toolTip = ref(false)


const actualDate = new Date;
const userStore = useUser();
const pagination = ref(0);
const requests = ref([]);
const closeNot = ref([]);
const totalElements = ref(0);
const totalPages = ref(0);
function toPositive(number) {
  return Math.abs(number);
}

let passedDate = [];
const adjustTime = () => {
  for (let i = 0; i < requests.value.length; i++) {
    passedDate[i] = {};

    const creationDate = new Date(requests.value[i].creationDate);

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

    passedDate[i].hour = `${hourDiff} hora` ;

    passedDate[i].minute = minuteDiff > 0 ? (minuteDiff === 1 ? `${minuteDiff} minuto` : `${minuteDiff} minutos`) : '';
  } 
}

const loadNotifications = async () => {
  const res = await getRequestByUser(userStore, userStore.id, pagination.value);
  totalElements.value = res.totalElements;
  totalPages.value = res.totalPages;
  res.content.map((request) => {
    if((request.status === 'ACEITO' || request.status === 'RECUSADO')  && parseInt(request.updatedDate.slice(5,7))+2 >= actualDate.getMonth()){
      for(let i = 0; i < requests.value.length; i++){
        if(requests.value[i].id === request.id){
          return 0;
        }
      }
      requests.value.push(request)
    }
  })
  if(res.totalPages > 1){
    for(let i = 0; i < res.totalPages; i++){
      pagination.value++;
      const res = await getRequestByUser(userStore, userStore.id, pagination.value);
      res.content.map((request) => {
        if((request.status === 'ACEITO' || request.status === 'RECUSADO') && parseInt(request.updatedDate.slice(5,7))+2 >= actualDate.getMonth()){
          for(let i = 0; i < requests.value.length; i++){
            if(requests.value[i].id === request.id){
              return 0;
            }
          }
          if(((actualDate.getMonth()+1) - parseInt(request.updatedDate.slice(5, 7)) > 1)){
            return 1;
          }
          requests.value.push(request)
        }
      })
    }
  }
  adjustTime();
}

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

/*
const removeNot = (index) => {
  let nots = JSON.parse(localStorage.getItem("notifications"));
  nots.splice(index, 1);
  requests.value = nots;
  localStorage.setItem('notifications', JSON.stringify(nots));
  console.log(nots)
} */

onMounted(async() => {
  const res = await getRequestByUser(userStore, userStore.id, pagination.value);
  totalElements.value = res.totalElements;
  if(JSON.parse(localStorage.getItem('notifications')).length > 0){
    if(JSON.parse(localStorage.getItem('notifications-meta')).totalElements !== totalElements.value){
      await loadNotifications();
      return 1;
    }
    requests.value = JSON.parse(localStorage.getItem('notifications'));
    adjustTime();
  }else{
    await loadNotifications();
    localStorage.setItem('notifications', JSON.stringify(requests.value));
    localStorage.setItem('notifications-meta', JSON.stringify({totalElements: totalElements.value}));
  }
})

</script>

<style scoped>
.not-close:active{
  transform: scale(1.30);
}
.notification-menu{
  max-height: 160px;
  overflow-y: scroll;
}
.small-loader{
    width: 12px;
    height: 12px;
}
.rotate-arrow{
  transition: transform 0.3s ease-in-out;
}

.rounded-pill{
  align-items: center;
  justify-content: center;
  display: flex !important;
  text-align: center !important;
  font-size: 11px;
  width: 17px;
  height: 17px;
  z-index: 1000;
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
.dropdown-menu{
  padding: 0;
}
.dropdown-item{
  font-size: 14px;
}
.dropdown-item:hover .notification-text{
  font-weight: bold
}
.svg-button:hover img{
  transition: filter 0.3s ease-in-out;
  filter: drop-shadow(0px 0px 7px rgba(254, 213, 30, 1));
}
.profile-drop:hover{
  transition: filter 0.3s ease-in;
  filter: drop-shadow(0px 0px 8px rgba(254, 213, 30, 1));
}
@media screen and (max-width: 540px){
  .notification-menu{
    width: 80vw;
  }
  .notification-text{
    text-wrap: wrap;
  }
}
</style>