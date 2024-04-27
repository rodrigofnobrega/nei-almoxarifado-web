<template>
    <div class="dropdown">
        <button @focusin="colorFocus" @focusout="colorUnfocus" class="action-btn d-flex btn btn-outline-ligth text-dark-emphasis mx-1 px-2" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outsite" aria-expanded="false">
            Ferramentas
            <IconsSettings class="mx-1" width="1.5em" height="1.5em"/>
        </button>
        <ul class="dropdown-menu">
            <li class="dropdown-item">
                <div class="form-check form-check-reverse d-flex justify-content-between">
                    <label class="form-check-label pe-1 text-align-center"  for="flexCheckDelete">Habilitar Exclusão</label>
                    <input @change="uptadeDeleteMode" class="form-check-input" type="checkbox" value="" id="flexCheckDelete">
                </div>
            </li>
            <li class="dropdown-item">
                <div class="form-check form-check-reverse d-flex justify-content-between">
                    <label class="form-check-label pe-1" for="flexCheckEdit">Habilitar Edição</label>
                    <input @change="updateEditMode" class="form-check-input" type="checkbox" value="" id="flexCheckEdit">
                </div>
            </li>
        </ul>
    </div>  
</template>

<script setup>
import { useStorageStore } from '../../stores/storage';
import { onMounted } from 'vue';
const store = useStorageStore();

onMounted(() => {
    const deleteInput = document.getElementById("flexCheckDelete");
});

const uptadeDeleteMode = () => {
    store.setDeleteMode();
};
const updateEditMode = () => {
    if(deleteInput.getAttribute('disabled', '') == true){
        deleteInput.removeAttribute('disabled')
    }
    document.getElementById("flexCheckDelete").setAttribute('disabled', '');
    store.setEditMode();
};
</script>

<style scoped>
.action-btn{
    margin-right: 10px;
    border: none;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 1px ridge #1F69B1;
}
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
}
.form-check-input{
    border: 1px solid rgb(0, 0, 0, 0.5);
}

.btn-outline-ligth:hover{
    color: white !important; 
    background-color: #0B3B69 !important; 
}
.form-check-input:checked{
    color: white;
    background-color: #1F69B1 !important;
}
</style>