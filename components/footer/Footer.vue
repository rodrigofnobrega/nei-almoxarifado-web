<script setup> </script>

<template>
<footer class="custom-footer bg-primary border-0 position-sticky text-center text-lg-start align-items-center">
  <section id="info">
    <div class="text-center text-md-start my-3 p-0">
       <div class="row d-flex m-0 ms-lg-2"> 
        <div class="col-md-6 col-lg-6 col-xl-6 d-flex flex-column justify-content-center text-start system"> 
          <h6 class="fw-bold "> Sistema de Gerenciamento de Almoxarifado </h6>
          <p>&copy; 2024 Núcleo de Educação da Infânica - CAp/UFRN. Licenciado sob <a class="text-warning" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br">CC BY-NC-SA</a></p>
	       </div>
         <div class="col-md-5 col-lg-5 col-xl-5 d-flex justify-content-center flex-column contact"> 
           <h6 class="fw-bold"> Contatos para suporte</h6>
           <p class="text-underline text-break">Email: suportealmoxarifado@nei.ufrn.br | Telefone: +55 84 9193-6261</p> 
          </div>
          <div class="d-none d-lg-flex col-md-1 col-lg-1 col-xl-1 justify-content-center align-items-center"> 
            <svg class="d-flex align-items-center bg-degrade" width="55" height="55">
                <image class="custom-logo" xlink:href="/logo.svg" width="50" height="50"/>
            </svg>
          </div>
       </div>
    </div>
  </section>
</footer>
</template>

<style scoped> 
p{
  font-size: 14px;
  margin: 0px;
}
.custom-footer {
  z-index: 1000;
  width: 100%;
  padding: 5px;
  color: white;
}
.bg-degrade{
    border-radius: 10px 10px 10px 10px;
    background: linear-gradient(to bottom, rgba(0, 73, 142, 0.9) 10%, rgb(254, 213, 30, 0.9) 150%)  
}
@media screen and (max-width: 852px){
  .system{
    text-align: center !important;
  }
  .contact{
    margin-top: 20px;
  }
}
</style>