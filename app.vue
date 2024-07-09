<template>
  <div>
    <NuxtLayout>
      <Popup :isPopup="isPopup" :popupText="popupText" :popupBg="popupBg"/>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStorageStore } from './stores/storage';
import { usePopupStore } from './stores/popup';
import { useUser } from './stores/user';
import { navigateTo } from 'nuxt/app';

const storage = useStorageStore();
const popup = usePopupStore();
const userStore = useUser();
const isPopup = computed(() => {
          return popup.popupActive
      });
const popupText = computed(() => {
  return popup.message
});
const popupBg = computed(() => {
  return popup.bgColor
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
