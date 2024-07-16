<template>
  <div :class="{layoutDefault: layoutBg === 0, alternativeLayout: layoutBg === 1, darkLayout: layoutBg === 2}">
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
.darkLayout [class*="secondary"] {
  background-color: #2980B9 !important; 
}
.darkLayout [class*="light-success"] {
  background-color: #27AE60 !important; 
}
.darkLayout [class*="dark-success"] {
  background-color: #1E8449 !important; 
}
.darkLayout [class*="light-alert"] {
  background-color: #E74C3C !important; 
}
.darkLayout [class*="dark-alert"] {
  background-color: #C0392B !important; 
}
.darkLayout [class*="warning"] {
  background-color: #F39C12 !important; 
}
.darkLayout [class*="light"] {
  background-color: #ECF0F1 !important; 
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
.darkLayout [class*="dark-emphasis"] {
  background-color: #34495E !important; 
}
.darkLayout [class*="new-gray"] {
  background-color: #566573 !important; 
}








.alternativeLayout .bg-primary{
  background-color: #2980B9 !important;
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