<template>
    <ModalItemDetails />
    <ModalItemHistory />
    <div class="container d-block">
        <TablesTable>
            <template v-slot:title>Almoxarifado Escolar</template>
            <template v-slot:items>
             <tr v-for="item in items" :key="item.name">
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
            </template>
        </TablesTable>
    </div>
</template>

<script setup>
import { useStorageStore } from '../../stores/storage';
const store = useStorageStore();
const items = store.items.filter(item => item.storage.includes("almoxarifado-escolar"));
</script>


<style scoped>
.container{
    margin-left: 0px; 
    padding: 0px;
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
    .container{
        margin-left: 0px;
    }
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