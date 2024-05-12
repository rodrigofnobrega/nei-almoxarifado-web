<template>
    <ModalItemRegister />
    <div class="container col-12 rounded">
        <table class="table table-hover border">
          <thead>
           <tr class="">
               <th class="col-title py-2 border" scope="col">Nome</th>
               <th class="col-title py-2 border" scope="col">Código Sipac</th>
               <th class="col-title py-2 border" scope="col">Tipo Unitário</th>
               <th class=" col-title py-2 border" scope="col">Quantidade</th>
               <th class="col-title py-2" scope="col">Última atualização</th>
           </tr>
          </thead>
          <tbody>
           <slot name="items" />
          </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

</script>

<style scoped>
.container{
    margin-left: -1px;
    width: 100%;
    padding: 0;
    margin-right: 0px;
    margin-bottom: 0px;
}
table{
    margin-right: 0;
    padding-right: 0px;
    margin-bottom: 0px;
    width: 100%;
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

@media screen and (max-width: 1030px) {
    .col-title{
        font-size: 13px;
    }
    p{
        font-size: 12px;
    }
    .table-btn{
        font-size: 13px;
        opacity: 0%;
        margin-top: 8px;
        margin-right: 10px;
        padding: 5px 5px 5px 5px;
    }
}
@media screen and (max-width: 930px){
    .catalog-header{
        display: block !important;
        text-align: center;
    }
    .actions-buttons{
        justify-content: center;
        align-content: center;
    }
}
@media screen and (max-width: 910px) {
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