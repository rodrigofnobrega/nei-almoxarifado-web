<template>
    <div class="conteiner-fluid d-flex p-2 bg-primary justify-content-start align-items-center">  
      <div class="logo">
        <svg class="d-flex align-items-center" width="53" height="61">
            <a class="navbar-brand" href="/">
                <image class="custom-logo" xlink:href="/logo.svg" width="53" height="58"/>
            </a>
        </svg>
      </div>
      <div class="d-flex search-bar bg-light mx-5">
          <form class="d-flex" role="search" height="10px">
              <button class="search-button d-flex btn btn-outline-success align-items-center" type="submit" id="search-buttom">
                  <IconsSearchGlass width="25px" height="25px"/>
              </button>
              <input class="form-control outline-warning" type="search" placeholder="Pesquisar" id="search-bar">
          </form>
      </div>
    </div>
</template>



<style scoped>
.custom-logo{
    transition: transform 0.3s ease-in-out;
}
.custom-logo:hover{
    transform: scale(1.07);
}
.form-control, .search-bar{
    border-radius: 7px;
    height: 32px;
}
.form-control{
    border-radius: 0px 7px 7px 0px;
}
.search-button{
    border-radius: 0px 0px 0px 0px;
}
</style>