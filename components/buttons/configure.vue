<template>
    <div class="dropdown">
        <button @focusin="colorFocus" @focusout="colorUnfocus" class="action-btn d-flex btn btn-outline-ligth text-dark-emphasis mx-1 px-2" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outsite" aria-expanded="false">
            Configurações
            <IconsSettings class="mx-1" width="1.5em" height="1.5em"/>
        </button>
        <ul class="dropdown-menu">
            <li class="dropdown-item">
                <button class="btn btn-transparent border-0" type="button">Mais recentes</button>
            </li>
            <li class="dropdown-item">
                <button class="btn btn-transparent border-0" type="button">Mais antigos</button>
            </li>
            <li class="dropdown-item">
                <button class="btn btn-transparent border-0" type="button">Disponíveis</button>
            </li>
            <li class="dropdown-item">
                <button class="btn btn-transparent border-0" type="button">Indisponíveis</button>
            </li> 
        </ul>
    </div>  
</template>


<style scoped>
.dropdown-menu{
    width: 150px !important;
    min-width: 40px;
}
.dropdown-item{
    width: 150px;
    padding: 0px;
}

.action-btn{
    border: none;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 1px ridge #1F69B1;
}
.btn-outline-ligth:hover{
    color: white !important; 
    background-color: #0B3B69 !important; 
}
</style>