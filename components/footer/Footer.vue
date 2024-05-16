<script setup> </script>

<template>
<footer class="custom-footer position-absolute border-top text-center text-lg-start align-items-center">
  <section id="info">
    <div class="container text-center text-md-start mt-5">
       <div class="row"> 
        <div class="col-md-7 col-lg-7 col-xl-8 d-flex flex-column "> 
          <h5 class="fw-bold"> Núcleo de Educação da Infânica - CAp/UFRN </h5>
	        <p> Sistema de Gerenciamento de Almoxarifado </p>
          <p> Encargo Administrativo </p>
	       </div>
         <div class="col-md-4 col-lg-3 col-xl-3"> 
	        <h5 class="fw-bold"> Contatos </h5>
	        <p> Telefone: +55 (84) 98768-4609 </p>
          <p class="text-underline text-break"> almoxarifado957@gmail.com </p> 
        </div>
	      <div class="d-none d-lg-block col-md-1 col-lg-1 col-xl-1"> 
	        <a href="/"> <IconsLogo width="63" height="64" /> </a>
	      </div>
       </div>
    </div>
  </section>
</footer>
</template>

<script setup>
const store = useStorageStore();

</script>

<style scoped> 
.custom-footer {
  z-index: 5000;
  width: 100%;
  background-color: #0b3b69;
  color: white;
}

</style>
