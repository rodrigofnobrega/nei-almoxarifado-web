<template>
    <div class="dropdown">
        <button @focusin="colorFocus" @focusout="colorUnfocus" class="action-btn d-flex btn btn-outline-primary border-0" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outsite" aria-expanded="false">
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
</template>

<script>
export default{
    methods: {
        colorFocus(e){
            e.target.style.color = "white";
        },
        colorUnfocus(e){
            e.target.style.color = "rgb(51, 51, 51, 0.7)";
        }
    }
}
</script>

<style scoped>
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
}
</style>