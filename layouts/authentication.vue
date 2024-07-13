<template>
    <div class="authentication">
        <div class="block">
            <slot />
            <div class="d-flex align-items-center brand-box justify-content-center">
                <svg class="brand d-flex align-items-center mt-1 ms-1" width="60" height="60">
                    <image class="custom-logo" xlink:href="/logo.svg" width="55" height="55"/>
                </svg>
                <h4 class="fw-bold text-light mt-2">Nei Almoxarifado</h4>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
.authentication {
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
    background: rgba(0, 0, 0, 0.6);
    z-index: -1;
  }
}
.block {
    margin: 20px auto 0px auto;
    justify-content: center;         
    display: flex;              
}
.brand-box{
    bottom: 0;
    left: 0;
    position: fixed;
}
.bg-degrade{
    border-radius: 10px 10px 10px 10px;
    background: linear-gradient(to bottom, rgb(11, 59, 105, 0.9) 10%, rgb(254, 213, 30, 0.9) 150%)
   
}
</style>
