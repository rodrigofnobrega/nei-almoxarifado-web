<template>
    <div id="content">
      <Header />
      <div class="d-flex"> 
        <div class="fluid-container">
          <NavbarNavSideBar /> 
        </div>
        <div class="main">
          <TitlesTitle />
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
    width: 100%;
    padding: 0;
    margin: 51px 0px 0px 0px;
  } 
  .fluid-container{
    position: static;
  }
  .teste{
    position: static;
  }
  
  
  </style>