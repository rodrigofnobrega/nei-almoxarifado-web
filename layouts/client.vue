<template>
    <div id="content">
      <HeaderNeiHeader />
        <div class="d-flex pt-5"> 
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
#content{
  background-color: #f3f4f7;
}
.main{
  width: 100%;
  height: 100%;
}
</style>