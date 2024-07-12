<template>
    <div class="authentication">
        <div class="block">
            <slot />
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
.authentication {
  width: 100%;
  height: 100%;
  background: url('../assets/img/nei.jpg') no-repeat center center;
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
    background: rgba(0, 0, 0, 0.75);
    z-index: -1;
  }
}
.block {
    margin: 20px auto 0px auto;
    justify-content: center;         
    display: flex;              
}
</style>
