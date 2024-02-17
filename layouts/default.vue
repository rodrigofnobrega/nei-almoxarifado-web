<template>
  <div id="content">
    <Header />
    <NavbarNavSideBar id="sidebar"/>  
    <div id="content-wrap">
      <slot />
    </div>
    <Footer />
  </div>
</template>


<style> 
  #content { 
    position: relative;
    min-height: 100vh;
  }

  #content-wrap { 
    padding-left: 3rem;
    padding-bottom: 12rem;
    padding-top: 9rem;  
  }
</style>
