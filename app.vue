<template>
  <div :class="
  {
    layoutDefault: layoutBg === 0, 
    darkLayout: layoutBg === 1, 
    alternativeLayout: layoutBg === 2, 
    lightLayout: layoutBg === 3,
    poppins: font === 0, 
    inter: font === 1, 
    montserrat: font === 2, 
    lora: font === 3, 
  }">
    <NuxtLayout>
      <Popup class="popUp" :isPopup="isPopup" :popupText="popupText" :popupBg="popupBg"/>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStorageStore } from './stores/storage';
import { usePopupStore } from './stores/popup';
import { useUser } from './stores/user';
import { navigateTo } from 'nuxt/app';
import { useSettingsStore } from './stores/settings';

const storage = useStorageStore();
const popup = usePopupStore();
const userStore = useUser();
const settingsStore = useSettingsStore();

const isPopup = computed(() => {
    return popup.popupActive
});
const popupText = computed(() => {
  return popup.message
});
const popupBg = computed(() => {
  return popup.bgColor
})
const layoutBg = computed(() => {
  return settingsStore.layout
})
const font = computed(() => {
  return settingsStore.tipography
})

onBeforeMount(() => {
  if(window.innerWidth <= 988){
    settingsStore.isMobile = true;
  } else{
    settingsStore.isMobile = false;
  }
})
onMounted(() => {
  checkIfMobile();
});
function checkIfMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['iphone', 'android', 'blackberry', 'windows phone', 'iemobile'];
  storage.isMobile = mobileKeywords.some(keyword => userAgent.includes(keyword));
}
</script>

<style>
.poppins{
  font-family: 'Poppins', sans-serif;
}
.inter{
  font-family: 'Inter', sans-serif !important;
}
.montserrat{
  font-family: 'Montserrat', sans-serif;
}
.lora{
  font-family: 'Lora', sans-serif;
}

.darkLayout .bg-primary{
  background-color: #020b15 !important;
}
.darkLayout .bg-light{
  background-color: #1A1A1A !important;
  border: solid 1px #333333 !important;
}
.darkLayout .modal-body{
  background-color: #1A1A1A !important;
  border: solid 1px #333333 !important;
}
.darkLayout .card-body{
  background-color: #1A1A1A !important;
  border: solid 1px #333333 !important;
}
.darkLayout .card-footer{
  background-color: #1A1A1A !important;
  border: solid 1px #333333 !important;
}
.darkLayout .modal-footer{
  background-color: #1A1A1A !important;
  border: solid 1px #333333 !important;
}
.darkLayout .modal-header{
  background-color: #020b15 !important;
  border: solid 1px #333333 !important;
}
.darkLayout input{
  color: rgb(255,255,255,0.8) !important;
  background-color: #1A1A1A;
  border: solid 1px #333333;
  border-left: none !important;
}
.darkLayout textarea{
  color: rgb(255,255,255,0.8) !important;
  background-color: #1A1A1A;
  border: solid 1px #333333;
  border-left: none !important;
}
.darkLayout input:focus{
  color: rgb(255,255,255,0.8) !important;
  background-color: #1A1A1A;
  border: solid 1px #333333;
}
.darkLayout label{
  color: rgb(255,255,255,0.8) !important;
  background-color: #1A1A1A !important;
}
.darkLayout .search-icon{
  border: 1px solid rgb(51, 51, 51, 1) !important; 
  border-right: none !important; 
}
.darkLayout input::placeholder{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout img{
  color: rgb(255,255,255,0.8) !important;
  background-color: #1A1A1A !important;
  border: solid 1px #333333 !important;
}
.darkLayout th{
  color: rgb(255,255,255,0.8) !important;
  background-color: #1A1A1A !important;
  border: solid 1px #333333 !important;
}
.darkLayout td{
  color: rgb(255,255,255,0.8) !important;
  background-color: #1A1A1A;
  border: solid 1px #333333 !important;
}
.darkLayout p{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout h3{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout h5{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout h6{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout li{
  background-color: #1A1A1A !important;
  border: solid 1px #333333 !important;
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout a{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout ul{
  background-color: #1A1A1A !important;
  border: solid 1px #333333 !important;
  border-bottom: none !important;
}
.darkLayout label{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout span{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout svg{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout .btn{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout .light-background{
  background-color: #1A1A1A !important;
  border: solid 1px #333333 !important;
}
.darkLayout .new-gray{
  background-color: #1A1A1A !important;
  border: solid 1px #333333 !important;
}
.darkLayout .bg-gray-light{
  background-color: #2f2e2e !important;
  border: solid 1px #333333 !important;
}
.darkLayout .bg-light-background-header{
  background-color: #2f2e2e !important;
  border: solid 1px #333333 !important;
}
.darkLayout .bg-light-emphasis{
  background-color: #2f2e2e !important;
  border: solid 1px #333333 !important;
}
.darkLayout [class*='dark']{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout [class*='dark-emphasis']{
  color: rgb(255,255,255,0.8) !important;
}
.darkLayout .bg-fade {
  background: black;
}
/*
.darkLayout [class*="primary"] {
  background-color: #2C3E50 !important; 
}
.darkLayout .bg-dark{
  background-color: #2C3E50 !important; 
}
.darkLayout .bg-light {
  background-color: #ECF0F1 !important; 
}
.darkLayout .bg-dark-emphasis {
  background-color: #34495E !important; 
}

.darkLayout [class*="light-alert"] {
  background-color: #E74C3C !important; 
}
.darkLayout [class*="warning"] {
  background-color: #F39C12 !important; 
}
.darkLayout [class*="light-emphasis"] {
  background-color: #BDC3C7 !important; 
}
.darkLayout [class*="light-background"] {
  background-color: #ECF0F1 !important; 
}
.darkLayout [class*="light-background-header"] {
  background-color: #D0D3D4 !important; 
}
.darkLayout [class*="gray-light"] {
  background-color: #AAB7B8 !important; 
}
.darkLayout [class*="new-gray"] {
  background-color: #566573 !important; 
}
 */ 

.alternativeLayout [class*="primary"] {
  background-color: #3e0d7a !important; /* Dark Slate Blue */
}
.alternativeLayout [class*="secondary"] {
  background-color: #1E90FF !important; /* Dodger Blue */
}
.alternativeLayout [class*="light-success"] {
  background-color: #008000 !important; /* Green */
}
.alternativeLayout [class*="light-alert"] {
  background-color: #FF6347 !important; /* Tomato */
}
.alternativeLayout [class*="dark-alert"] {
  background-color: #8B0000 !important; /* Dark Red */
}
.alternativeLayout [class*="warning"] {
  background-color: #FFD700 !important; /* Gold */
}
.alternativeLayout .bg-light {
  background-color: #FFFFFF !important; /* White */
}
.alternativeLayout .bg-dark {
  background-color: #2F4F4F !important; /* Dark Slate Gray */
}
.alternativeLayout [class*="light-emphasis"] {
  background-color: #D3D3D3 !important; /* Light Gray */
}
.alternativeLayout [class*="light-background"] {
  background-color: #808080 !important; /* Gray */
}
.alternativeLayout [class*="light-background-header"] {
  background-color: #C0C0C0 !important; /* Silver */
}
.alternativeLayout [class*="gray-light"] {
  background-color: #A9A9A9 !important; /* Dark Gray */
}
.alternativeLayout .bg-dark-emphasis {
  background-color: #333 !important; /* Dark */
}
.alternativeLayout [class*="new-gray"] {
  background-color: #778899 !important; /* Light Slate Gray */
}

.bg-fade {
  background: radial-gradient(ellipse at bottom left, rgba(11, 59, 105, 0.5), transparent 50%),
              radial-gradient(ellipse at bottom right, rgba(11, 59, 105, 0.5), transparent 50%),
              radial-gradient(ellipse at top left, rgba(11, 59, 105, 0.5), transparent 50%),
              radial-gradient(ellipse at top right, rgba(11, 59, 105, 0.5), transparent 50%),
              radial-gradient(ellipse at center left, rgba(255, 255, 255, 1), transparent 50%),
              radial-gradient(ellipse at center left, rgba(255, 255, 255, 1), transparent 50%);
}
</style>