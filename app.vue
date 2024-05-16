<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStorageStore } from './stores/storage';


const storage = useStorageStore();

onMounted(() => {
  const itemModals = document.getElementsByClassName("modal-header");
  for (let i = 1; i < itemModals.length; i++) {
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