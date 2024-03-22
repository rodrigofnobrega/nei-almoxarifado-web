<template>
    <div class="dropdown">
        <button @focusin="colorFocus" @focusout="colorUnfocus" class="action-btn d-flex btn btn-light text-dark-emphasis border-0" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outsite" aria-expanded="false">
            Ferramentas
            <IconsSettings class="mx-1" width="1.5em" height="1.5em"/>
        </button>
        <ul class="dropdown-menu">
            <li class="dropdown-item">
                <div class="form-check form-check-reverse">
                    <label class="form-check-label pe-1"  for="flexCheckDefault">Habilitar Exclusão</label>
                    <input @change="uptadeDeleteMode" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                </div>
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

<script setup>
import { computed, watch } from 'vue';
import { useStorageStore } from '../../stores/storage';
const store = useStorageStore();
const uptadeDeleteMode = () => {
    store.setDeleteMode();
};
</script>

<style scoped>
.form-check-input{
    border: 1px solid rgb(0, 0, 0, 0.5);
}

.btn-light:hover{
    color: white !important; 
    background-color: #0B3B69 !important; 
}
.form-check-input:checked{
    color: white;
    background-color: #1F69B1 !important;
}
</style>