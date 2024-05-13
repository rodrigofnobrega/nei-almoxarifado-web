<template>
    <button class="justify-content-end action-btn d-flex btn btn-outline-primary mx-1 px-2" data-bs-toggle="modal" data-bs-target="#itemRegistration">
       Novo<IconsPlus class="mx-1" width="1.5em" height="1.5em"/>
    </button>
</template>

<style scoped>
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
}
@media screen and (max-width: 820px){
    .action-btn{
        font-size:  12px !important;
    }
}
</style>