<template>
    <button @focusin="colorFocus" @focusout="colorUnfocus" class="new-btn justify-content-end action-btn d-flex btn btn-outline-primary mx-1 px-2" data-bs-toggle="modal" data-bs-target="#itemRegistration" aria-expanded="false">
       Novo
       <IconsPlus class="mx-1" width="1.5em" height="1.5em"/>
    </button>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStorageStore } from '../../stores/storage';
const store = useStorageStore();
onMounted(() => {
    if(store.isMobile){
        const btnText = document.querySelector('.new-btn');
        btnText.style.fontSize = '9px';
    }

})

</script>

<style scoped>
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
}
@media screen and (max-width: 820px){
    .action-btn{
        font-size:  12px;
    }
}
</style>