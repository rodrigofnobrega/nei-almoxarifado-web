<template>
    <div class="container d-block" style="margin-left: 10px;">
        <div class="catalog-header d-flex align-items-center">
        <h2>Almoxarifados</h2>
        <div class="d-flex">   
            <div class="dropdown">
                <button @focusin="colorFocus" @focusout="colorUnfocus" class="d-flex btn btn-outline-primary border-0 me-2" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outside" aria-expanded="false">
                    Filtro
                    <IconsFilter class="mx-1" width="1.5em" height="1.5em"/>
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais recentes</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais antigos</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Disponíveis</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Indisponíveis</button>
                    </li>
                </ul>
            </div>
            <div class="dropdown">
                <button @focusin="colorFocus" @focusout="colorUnfocus" class="d-flex btn btn-outline-primary border-0 me-2" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outsite" aria-expanded="false">
                    Configurações
                    <IconsSettings class="mx-1" width="1.5em" height="1.5em"/>
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais recentes</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais antigos</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Disponíveis</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Indisponíveis</button>
                    </li> 
                </ul>
            </div>  
        </div>
    </div>
    <hr>
    <div class="containerf-fluid d-flex justify-content-center aligm-items-center">
        <div class="card me-2 rounded-3" style="width: 34rem;">
          <img src="/almo.png" class="card-img-top" alt="...">
          <div class="card-body text-dark-emphasis">
            <a href="/inventario/almoxarifado-escolar" class="ts-1 stretched-link text-dark-emphasis" style="text-decoration: none;">Almoxarifado Escolar</a>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div class="card mx-2 rounded-3" style="width: 34rem;">
          <img src="/almo.png" class="card-img-top" alt="...">
          <div class="card-body text-dark-emphasis">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div class="card mx-2 rounded-3" style="width: 34rem;">
          <img src="/almo.png" class="card-img-top" alt="...">
          <div class="card-body text-dark-emphasis">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
    </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            isEditable: false
        }
    },
    methods: {
        editQuantity(){
            this.isEditable = !this.isEditable;
        },
        colorFocus(e){
            e.target.style.color = "white";
        },
        colorUnfocus(e){
            e.target.style.color = "rgb(51, 51, 51, 0.7)";
        }
    },
}

</script>

<style scoped>
h2{
    font-weight: 300;
    color: rgb(51,51,51, 0.8);
}
hr{
    width: 82vw;
}
.catalog-header{
    justify-content: space-between;
}
.card{
    padding: 0px;
    transition: transform 0.5s ease-in-out;
}
.card-img-top{
    transition: opacity 0.5s ease-in-out;
    opacity: 90%;
}
.card-body{
    transition: color, background-color 0.4s ease-in-out;
}
.card:hover{
    transform: scale(1.04);
}
.card:hover .card-img-top{
    opacity: 100%;
}
.card:hover .card-body{
    background-color: #0B3B69;
    color: white !important;
}
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
}

</style>