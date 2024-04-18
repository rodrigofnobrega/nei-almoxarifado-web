<template>
  <div id="content">
    <Header />
    <div class="d-flex"> 
      <div class="fluid-container">
        <NavbarNavSideBar /> 
      </div>
      <div class="main">
        <slot />
      </div> 
    </div>
    <div class="d-flex">
      <div class="flex-grow-1">
        <Footer />
      </div>
    </div>
  </div>
</template>
  

<style>
.main{
  height: 100%;
  width: 84vw;
  margin-left: 0%;
  margin-right: 0px;
  margin-top: 51px;
  margin-bottom: 3vw;
  padding-left: 0px;
} 
.fluid-container{
  position: static;
}
.teste{
  position: static;
}
@media screen and (max-width: 1199px){
  .main{  
      width: 82vw;
      margin-left: 1.1%;
    }
}
@media screen and (max-width: 1159px){
  .main{  
      width: 84vw;
      margin-left: -1%;
    }
}
@media screen and (max-width: 1050px){
  .main{
      width: 82vw;
      margin-left: -1%;
  }
}
@media screen and (max-width: 990px){
  .main{
    width: calc(80vw*0.99);
    margin-left: -0.6%;
  }
}

@media screen and (max-width: 818px){
  .main{
    width: calc(74vw*0.98);
    margin-left: 0.2%;
  }
}
</style>