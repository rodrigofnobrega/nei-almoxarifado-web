<template>
    <div id="content">
      <HeaderNeiHeader />
        <div class="d-flex bg-fade"> 
          <div class="main">
              <slot />
          </div> 
        </div>
        <div class="d-flex">
          <div class="flex-grow-1">
            <Footer class="teste"/>
          </div>
        </div>
    </div>
</template>

<style scoped>
#content{
  background-color: #f3f4f7 !important;
}
.main{
  width: 100%;
  height: 100%;
}

</style>