<template>
   <div>
    <button @mouseover="toolTip = true" @mouseout="toolTip = false" @focusin="colorFocus" @focusout="colorUnfocus" class="new-btn action-btn btn-outline-ligth text-dark-emphasis justify-content-end d-flex btn mx-1 px-2" data-bs-toggle="modal" data-bs-target="#itemRegistration" aria-expanded="false">
        Adicionar
        <IconsPlus class="mx-1" width="1.5em" height="1.5em"/>
    </button>   
    </div>  
</template>
<!--
<template>
    <TooltipsRectangular class="d-flex justify-content-center align-items-end ms-4 mt-2" :toolTipState="toolTip" :toolTipText="'Cadastro de Novos Itens'"/>    
    <button @mouseover="toolTip = true" @mouseout="toolTip = false" @focusin="colorFocus" @focusout="colorUnfocus" class="new-btn action-btn btn-outline-ligth text-dark-emphasis justify-content-end d-flex btn mx-1 px-2" data-bs-toggle="modal" data-bs-target="#itemRegistration" aria-expanded="false">
        Adicionar
        <IconsPlus class="mx-1" width="1.5em" height="1.5em"/>
    </button>
</template>
-->
<script setup>
import { onMounted } from 'vue';
import { useStorageStore } from '../../stores/storage';
const store = useStorageStore();
const toolTip = ref(false);
onMounted(() => {
    if(store.isMobile){
        const btnText = document.querySelector('.new-btn');
        btnText.style.fontSize = '9px';
    }

})

</script>

<style scoped>
.action-btn{
    height: 38px;
    font-weight: 500;
    font-size: 15px;
    border: none;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 1px ridge #388E3C;
}
.btn-outline-ligth{
    color: white !important; 
    background-color: #388E3C !important; 
}
.btn-transparent:hover{
    color: white;
    background-color: #FED51E;
}
.action-btn:hover{
    opacity: 90%;
}
@media screen and (max-width: 820px){
    .action-btn{
        font-size:  12px;
    }
}
</style>