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
    margin-top: 100px;
    margin-bottom: 10vw;
    padding-left: 15px;
  } 
  .fluid-container{
    position: static;
  }
  .teste{
    position: static;
  }
  </style>