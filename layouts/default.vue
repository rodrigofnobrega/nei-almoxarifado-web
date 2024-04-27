<template>
  <div id="content">
    <Header />
    <div class="d-flex"> 
      <div class="fluid-container">
        <NavbarNavSideBar /> 
      </div>
      <div class="main">
        <div class="main-title">
          <TitlesTitle>
            <template v-slot:titulo>
              {{ pageTitle }}
		        </template>
          </TitlesTitle>
        </div>
        <div class="main-content">
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
  
<script >
import { ref, provide, inject } from 'vue';


export default {
  setup() {
    const pageTitle = ref('');
    const pageOptions = ref();
    provide('setpageTitle', (data) => {
      pageTitle.value = data;
    });

    return {
      pageTitle,
    };
  },
};
</script>

<style>
.main{
  width: 100%;
  height: 100%;
}
.main-title{
  white-space: nowrap;
  padding: 0;
  margin: 51px 0px 0px 0px;
}
.main-content{
  width: 84vw;
  margin-left: 0.1%;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 3vw;
  padding-left: 0px;
} 
.fluid-container{
  position: static;
}
.action-btn{
    margin-right: 10px;
}
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
}
@media screen and (max-width: 1199px){
  .main-content{  
      width: 82vw;
      margin-left: 1.1%;
    }
}
@media screen and (max-width: 1159px){
  .main-content{  
      width: 84vw;
      margin-left: -1%;
    }
}
@media screen and (max-width: 1050px){
  .main-content{
      width: 82vw;
      margin-left: -1%;
  }
}
@media screen and (max-width: 990px){
  .main-content{
    width: calc(80vw*0.99);
    margin-left: -0.6%;
  }
}

@media screen and (max-width: 818px){
  .main-content{
    width: calc(74vw*0.98);
    margin-left: 0.2%;
  }
}
</style>