<template>
    <div id="authentication">
        <div class="d-block bg-dark-transparent">
            <div class="d-flex justify-content-center align-items-center">
                <slot />
            </div>
            <div class="d-flex align-items-center justify-content-center brand-box">
                <svg class="brand d-flex align-items-center mt-1 ms-1" width="60" height="60">
                    <image class="custom-logo" xlink:href="/logo.svg" width="55" height="55"/>
                </svg>
                <h4 class="fw-bold text-light mt-2">Nei Almoxarifado</h4>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const authContainer = document.getElementById("authentication");
    if(window.innerHeight <= 450){
        authContainer.style.height = '200%';
    }
    window.addEventListener('resize', () => {
        if(window.innerHeight <= 450){
            authContainer.style.height = '200%';
        } else{
            authContainer.style.height = '108%';
        }
    })
})


</script>

<style scoped>
#authentication {
  width: 100%;
  height: 100%;
  background: url('../assets/img/nei.png') no-repeat center center;
  background-size: cover;
  position: absolute;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
.bg-dark-transparent{
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
}
.block {
    margin: 20px auto 0px auto;
    justify-content: center;         
    display: flex;              
}
.brand-box{
    bottom: 0;
    left: 0;
    position: absolute;
}
.bg-degrade{
    border-radius: 10px 10px 10px 10px;
    background: linear-gradient(to bottom, rgb(11, 59, 105, 0.9) 10%, rgb(254, 213, 30, 0.9) 150%)
   
}
@media screen and (max-width: 680px){
    .brand-box{
        right: 0;
    }
}
</style>
