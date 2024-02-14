<template>
    <div class="container-fluid d-flex justify-content-between align-items-center p-2 bg-primary">  
      <div class="d-flex align-items-center">
        <div class="logo">
          <a class="navbar-brand" href="/">
            <svg class="d-flex align-items-center" width="53" height="61">
              <image class="custom-logo" xlink:href="/logo.svg" width="53" height="58"/>
            </svg>
          </a>
        </div>
        <div class="d-flex search-bar bg-light mx-5">
          <form class="d-flex" role="search">
            <button class="search-button d-flex btn btn-outline-success align-items-center" type="submit" id="search-button">
              <IconsSearchGlass width="25px" height="25px"/>
            </button>
            <input class="form-control outline-warning" type="search" placeholder="Pesquisar" id="search-bar">
          </form>
        </div>
      </div>
      <div class="d-flex justify-content-end align-items-center">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"> 
        </div>
        <div class="d-flex profile align-items-center mx-3">
            <button class="svg-button bg-primary px-2">
                <img src="/bell.svg">
            </button>
            <button class="svg-button d-flex bg-primary align-items-center">
                <p class="user-text text-light fw-lighter pt-3 px-1">Usuário</p>
                <IconsDownArrow class="p-0 m-0"/>
            </button>
        </div>
      </div>    
    </div>
</template>



<style scoped>
.custom-logo{
    transition: transform 0.3s ease-in-out;
}
.form-control, .search-bar{
    border-radius: 7px;
    height: 31px;
}
.form-control{
    border-radius: 0px 7px 7px 0px;
}
.search-button{
    border-radius: 7px 0px 0px 7px;
}
.svg-button{
    border: none;
    padding: 0;
    margin: 0;
    background: none;
}
.user-text {
    font-size: 30px;
    font-weight: 100; /* 200 é o valor para a fonte ExtraLight da família Roboto */
}
.custom-logo:hover{
    transform: scale(1.07);
}
.form-control:focus{
    box-shadow: 0 0 0.7rem 0.29rem rgba(254 , 213, 30, 0.25);
}
.search-button:hover{
    border-radius: 7px 0px 0px 7px;
}
.svg-button:hover img{
    transition: filter 0.3s ease-in-out;
    filter: drop-shadow(0px 0px 5px rgba(254, 213, 30, 0.9));
}
</style>