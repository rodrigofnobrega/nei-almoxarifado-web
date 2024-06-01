<template>
    <div id="content">
      <HeaderNeiHeader />
        <div class="d-flex bg-fade pt-5"> 
          <div class="main pt-5">
            <div class="main-content d-flex justify-content-center">
              <slot />
            </div>
          </div> 
        </div>
        <div class="d-flex">
          <div class="flex-grow-1">
            <Footer />
          </div>
        </div>
    </div>
</template>

<style scoped>
.main{
  width: 100%;
  height: 100%;
}
.bg-fade { 
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.01), rgba(255, 255, 255, 1) 75%),
              radial-gradient(ellipse at top left, rgba(11, 59, 105, 0.5), transparent 50%),
              radial-gradient(ellipse at top right, rgba(11, 59, 105, 0.5), transparent 50%),
              radial-gradient(ellipse at center right, rgba(254, 213, 30, 0.8), transparent 50%),
              radial-gradient(ellipse at center left, rgba(254, 213, 30, 0.8), transparent 50%);
}



</style>