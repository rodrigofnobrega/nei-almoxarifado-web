<template>
    <div class="page-title bg-light row d-block ms-0">
        <div class="catalog-header d-flex align-items-center">
            <h3 class="mt-2">
                <LoadersLoading class="small-loader text-dark-emphasis p-1"/>
                <slot name="titulo" />
            </h3>
            <div class="d-block">
                <p @mouseover="toolTip = true" @mouseout="toolTip = false">Teste</p>
                <TooltipsRectangular :toolTipState="toolTip" :toolTipText="'Teste'"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const toolTip = ref(false);

</script>


<style scoped>
.small-loader{
    width: 12px;
    height: 12px;
}
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


</style>