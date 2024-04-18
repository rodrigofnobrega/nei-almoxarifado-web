<template>
    <button class="justify-content-end action-btn d-flex btn btn-outline-primary mx-1 px-2" data-bs-toggle="modal" data-bs-target="#itemRegistration">
       Novo<IconsPlus class="mx-1" width="1.5em" height="1.5em"/>
    </button>
</template>

<style scoped>
.action-btn{
    margin-right: 10px;
    border: none;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 1px ridge #0B3B69;
}
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
}
</style>