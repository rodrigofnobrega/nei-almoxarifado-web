<template>
    <ModalItemDetails :item_details="currentItem" />
    <ModalItemHistory :item_history="currentItem"/>
    <div class="row d-block">
        <TablesTable>
            <template v-slot:title>Almoxarifado Escolar</template>
            <template v-slot:items>
                <tr v-for="(item, index) in filteredItems" :key="index">
                    <th scope="row" :class="{'delete':  backgroundStyle, 'nmr': !backgroundStyle}"><p>{{ item.name }}</p></th>
                    <th :class="{'delete':  backgroundStyle, 'nmr': !backgroundStyle}">
                        <p v-if="item.sipac">{{ item.sipac }}</p>
                        <p v-else>nenhum</p>
                    </th>
                    <th :class="{'delete':  backgroundStyle, 'nmr': !backgroundStyle}">
                            
                        <p>{{ item.type }}</p>
                        <button v-if="backgroundStyle" @click="store.deleteItem()" class="btn delete-btn btn-dark-alert">Excluir</button>
                    </th>
                    <th :class="{'delete':  backgroundStyle, 'nmr': !backgroundStyle}"><p>{{ item.qtd }}</p></th>
                    <th :class="{'delete':  backgroundStyle, 'nmr': !backgroundStyle}"><p>{{ item.history[0] }}</p></th>
                    <th class="end" :class="{'delete':  backgroundStyle, 'nmr': !backgroundStyle}">
                        <button class="table-btn btn btn-primary" @click="showDetails(index)" data-bs-toggle="modal" data-bs-target="#itemDetailing">
                            Detalhes
                        </button>
                        <button class="table-btn btn btn-primary" @click="showHistory(index)" data-bs-toggle="modal" data-bs-target="#itemHistory">
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
import { ref, computed, onMounted } from 'vue';

const store = useStorageStore();
const items = ref(store.items); 

const backgroundStyle = computed(() => {
    return store.deleteMode;
});

onMounted(() => {
    store.deleteMode = false
})

const filteredItems = computed(() => items.value.filter(item => item.storage.includes("almoxarifado-escolar")));

const itemIndex = ref(0);
const currentItem = computed(() => filteredItems.value[itemIndex.value]);

const showDetails = (index) => {
    itemIndex.value = index;
}

const showHistory = (index) => {
    itemIndex.value = index;
}
</script>


<style scoped>
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
.delete-btn{
    margin: 0;
    z-index: 1000;
    display: none;
    position: fixed;
    margin-top: -28px;
    margin-left: 110px;
    opacity: 0%;
}
tr:hover .delete{
    background-color: rgb(255, 0, 0, 0.5);
}
tr:hover .delete-btn{
    display: block;
    opacity: 100%;
}
tr:hover .nmr{
    background-color: rgb(254, 213, 30, 0.4);
}
tr:hover .table-btn{
    opacity: 100%;
}
tr:hover p{
    opacity: 70%;
}
@media screen and (max-width: 1000px) {
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
}
@media screen and (max-width: 820px) {
    .container{
        margin-left: 0px;
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