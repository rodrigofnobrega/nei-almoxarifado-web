<template>
  <div id="content">
    <Header />
    <div id="content-wrap">
    </div>
    <slot />
    <Footer />
  </div>
</template>

<style> 
  #content { 
    position: relative;
    min-height: 100vh;
  }

  #content-wrap { 
    padding-bottom: 13rem; 
  }
</style>
