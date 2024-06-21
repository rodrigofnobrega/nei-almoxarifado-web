<template>
    <div id="content">
        <Header />
        <div class="main">
            <div class="main-content py-5 d-flex justify-content-center">
              <slot />
            </div>
        </div>
        <Footer />
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