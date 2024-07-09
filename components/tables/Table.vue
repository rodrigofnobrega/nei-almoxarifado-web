<template>
    <ModalItemRegister />
    <div class="container col-12 rounded">
        <table class="table table-hover border">
          <thead>
            <slot name="header" />
          </thead>
          <tbody>
           <slot name="content" />
          </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStorageStore } from '../../stores/storage';

const store = useStorageStore();
onMounted(() => {
    if(store.isMobile){
        const columnTitles = document.querySelectorAll('.col-title');
        columnTitles.forEach(element => element.style.fontSize = '8px')
    }

})

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