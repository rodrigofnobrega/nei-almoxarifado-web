<script setup> </script>

<template>
<footer class="custom-footer bg-primary border-0 position-absolute text-center text-lg-start align-items-center">
  <section id="info">
    <div class="container text-center text-md-start my-3 p-0">
       <div class="row d-flex m-0 ms-lg-2"> 
        <div class="col-md-6 col-lg-6 col-xl-6 d-flex flex-column justify-content-center text-center "> 
          <h5 class="fw-bold "> Sistema de Gerenciament de Almoxarifado </h5>
          <p>&copy; 2024 Núcleo de Educação da Infânica - CAp/UFRN.<br> Licenciado sob <a class="text-warning" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br">CC BY-NC-SA</a></p>
	       </div>
         <div class="d-none d-lg-flex col-md-1 col-lg-1 col-xl-1 justify-content-center align-items-center"> 
           <a type="button" href="/"> <IconsLogo width="64" height="64" /></a>
         </div>
         <div class="col-md-6 col-lg-4 col-xl-5 text-center d-flex justify-content-center flex-column"> 
	        <h5 class="fw-bold"> Contatos </h5>
          <p class="text-underline text-break">Email: almoxarifado957@gmail.com <br> Telefone: +55 (84) 98768-4609</p> 
        </div>
       </div>
    </div>
  </section>
</footer>
</template>

<style scoped> 
p{
  margin: 0px;
}
.custom-footer {
  z-index: 1000;
  width: 100%;
  color: white;
}
/*<div class="container text-center text-md-start my-4">
      <div class="d-flex"> 
        <div class="col-md-8 col-lg-8 col-xl-6 d-flex flex-column justify-content-center text-start"> 
          <h5 class="fw-bold text-center"> Sistema de Gerenciament de Almoxarifado </h5>
          <p>&copy; 2024 Núcleo de Educação da Infânica - CAp/UFRN. Licenciado sob <a class="text-warning" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br">CC BY-NC-SA</a></p>
	       </div>
         <div class="d-flex justify-content-center align-items-center"> 
           <a href="/"> <IconsLogo width="63" height="64" /> </a>
         </div>
         <div class="ms-5 text-center d-flex justify-content-center flex-column"> 
	        <h5 class="fw-bold"> Contatos </h5>
          <p class="text-underline text-break">Email: almoxarifado957@gmail.com | Telefone: +55 (84) 98768-4609</p> 
        </div>
       </div>
    </div>*/
</style>
