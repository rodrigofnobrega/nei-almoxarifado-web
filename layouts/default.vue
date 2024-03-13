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
  
<script>


</script>
  
<style>
.main{
  width: 80vw;
  margin-top: 100px;
  margin-bottom: 15vw;
  padding-left: 15px;
} 
.fluid-container{
  position: static;
}
.teste{
  position: static;
}
@media screen and (max-width: 1200px){
    .main{
        width: 75vw;
    }
}
@media screen and (max-width: 900px){
  .container{
        width: 65vw;
    }
}
</style>