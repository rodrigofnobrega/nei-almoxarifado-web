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

const storage = useStorageStore();
const popup = usePopupStore();
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
  const itemModals = document.getElementsByClassName("modal-header");
  for (let i = 1; i < itemModals.length; i++) {
    itemModals[i].classList.add("justify-content-between");
    itemModals[i].classList.add("small");
  }
  checkIfMobile()
});
function checkIfMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['iphone', 'android', 'blackberry', 'windows phone', 'iemobile'];
  storage.isMobile = mobileKeywords.some(keyword => userAgent.includes(keyword));
}


</script>
