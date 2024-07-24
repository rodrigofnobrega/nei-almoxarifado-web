<template>
  <div :class="{layoutDefault: layoutBg === 0, darkLayout: layoutBg === 1, alternativeLayout: layoutBg === 2, lightLayout: layoutBg === 3}">
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
  color: #F39C12 !important; 
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