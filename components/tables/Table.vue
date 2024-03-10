<template>
    <ModalItemRegister />
    <ModalItemDetails />
    <ModalItemHistory />
    <div class="catalog-header d-flex align-items-center">
        <h2>Almoxarifado Escolar</h2>
        <div class="actions-buttons d-flex">
            <button class="action-btn d-flex btn btn-outline-primary border-0" data-bs-toggle="modal" data-bs-target="#itemRegistration">
                Novo
                <IconsPlus class="mx-1" width="1.5em" height="1.5em"/>
            </button>
            <ButtonsFilter />
            <ButtonsConfigure />
        </div>
     </div>
    <hr>
     <div class="table-responsive mt-4">
         <table class="table table-hover">
           <thead>
            <tr>
                <th class="col-title py-2" scope="col">Nome</th>
                <th class="col-title py-2" scope="col">Código Sipac</th>
                <th class="col-title py-2" scope="col">Tipo Unitário</th>
                <th class="col-title py-2" scope="col">Quantidade</th>
                <th class="col-title py-2" scope="col">Última atualização</th>
                <th class="col-title end"></th>
            </tr>
           </thead>
           <tbody>
             <tr v-for="item in store.items" :key="item.name">
               <th scope="row"><p>{{ item.name }}</p></th>
               <th>
                    <p v-if="item.sipac">{{ item.sipac }}</p>
                    <p v-else>nenhum</p>
               </th>
                <th><p>{{ item.type }}</p></th>
               <th><p>{{ item.qtd }}</p></th>
               <th><p>{{ item.history[0]}}</p></th>
               <th class="end">
                    <button class="table-btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#itemDetailing">
                        Detalhes
                    </button>
                    <button class="table-btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#itemHistory">
                        Histórico
                    </button>
                </th>
             </tr>
           </tbody>
         </table>
     </div>
</template>

<script setup>
import { useStorageStore } from '../../stores/storage';
import { onMounted } from 'vue'; 
const store = useStorageStore();


onMounted(() => {
  const itemModals = document.getElementsByClassName("modal-header");
  for (let i = 1; i < itemModals.length; i++) {
    itemModals[i].classList.add("small");
  }
});

</script>
<style scoped>
table{
    width: 80vw;
}
h2{
    font-weight: 300;
    color: rgb(51,51,51, 0.8);
}
.catalog-header{
    justify-content: space-between;
}

.col-title{
    font-size: 18px;
    opacity: 80%;
    font-weight: 400;
    margin-top: 0;
}
th{
    padding: 16px 0 16px 0;
    text-decoration: none;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
p{
    padding: 0;
    margin: 0;
}
.action-btn{
    margin-right: 10px;
}
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
}
.end{
    position: relative;
    text-align: end;
    padding: 0;
}
.table-btn{
    font-size: 15px;
    opacity: 0%;
    margin-top: 8px;
    margin-right: 10px;
    padding: 5px 5px 5px 5px;
}
tr:hover .table-btn{
    opacity: 100%;
}
tr:hover p{
    opacity: 70%;
}
@media screen and (max-width: 1200px) {
    table {
        width: 75vw;
    }
}
@media screen and (max-width: 1000px) {
    table {
        width: 70vw;
    }
    .col-title{
        font-size: 14px;
    }
    p{
        font-size: 12px;
    }
    .table-btn{
        font-size: 13px;
        opacity: 0%;
        margin-top: 11px;
        margin-right: 4px;
        padding: 3px 0px 3px 0px;
    }
}
@media screen and (max-width: 900px){
    .catalog-header{
        display: block !important;
        text-align: center;
    }
    .actions-buttons{
        justify-content: center;
        align-content: center;
    }
}
@media screen and (max-width: 820px) {
    table {
        width: 50vw;
    }
    .col-title{
        font-size: 12px;
    }
    p{
        font-size: 11px;
    }
    .table-btn{
        font-size: 11px;
    }
}
</style>