<template>
    <div class="page-title bg-light row d-block ms-0">
        <div class="catalog-header d-flex align-items-center">
            <h3 class="mt-2"><slot name="titulo" /></h3>
            <div class="d-flex me-4 mt-2">
                <div class="toolTip d-flex justify-content-center align-items-center">
                    <IconsGrid @mouseover="tooltipTrigger(0)" @mouseout="tooltipTrigger(0)" class="mx-2 icons"/>
                    <p v-show="toolTips[0]" class="tooltipText position-fixed bg-dark-emphasis text-light rounded-3 p-2">Visualizações</p>
                </div>
                <div class="toolTip d-flex justify-content-center align-items-center">
                    <IconsSettings @mouseover="tooltipTrigger(1)" @mouseout="tooltipTrigger(1)" class="mx-2 icons"/>
                    <p v-show="toolTips[1]" class="tooltipText position-fixed bg-dark-emphasis text-light rounded-3 p-2">Configurações</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
let toolTips = ref([false, false]);

const tooltipTrigger = (id) => {
    toolTips.value[id] = !toolTips.value[id];
};
</script>


<style scoped>
.tooltipText{
    font-size: 13px;
    margin-top: 7.9%;
    margin-left: -2.7%;
    opacity: 75%;
    border: none;
}
.tooltipText::before{
    bottom: 99%;
    left: 56%;
    position: absolute;
    content: "";
    border: 12px solid transparent;
    border-bottom-color: #333333;
}

.icons{
    width: 25px;
    height: 25px;
}
.page-title{
	width: 100%;
	border-bottom: 1px ridge #D9D9D9;
	margin-bottom: 20px;
}
h3{
    font-weight: 300;
    color: rgb(51,51,51, 0.8);
}
.catalog-header{
    color: rgb(51,51,51, 0.8);
    justify-content: space-between;
}

@media screen and (max-width: 700px){
    .catalog-header{
        display: block !important;
        text-align: center;
    }
    .actions-buttons{
        justify-content: center;
        align-content: center;
    }
}
</style>