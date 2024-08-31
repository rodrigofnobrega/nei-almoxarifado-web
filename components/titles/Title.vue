<template>
    <div class="page-title bg-light row d-block ms-0">
        <div class="catalog-header d-flex align-items-center justify-content-between">
            <h3 class="title-text mt-2">
                <LoadersLoading class="small-loader text-dark-emphasis p-1"/>
                    <slot name="titulo" />
            </h3>
            <div class="me-3 mb-2 route">
                <nav class="title-link" v-show="textLoading" aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li><a href="/">início</a></li>
                    <slot name="rota" />
                    </ol>
                </nav>
            </div>
            <LoadersLoading class="small-loader text-dark-emphasis p-1"/>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
const toolTip = ref(false);
const textLoading = ref(false);
onBeforeMount(() => {
    textLoading.value = true;
})
</script>


<style scoped>
.small-loader{
    width: 12px;
    height: 12px;
}
.route{
    position: relative;
    top: 15px !important;
}
.route-link{
    color: rgba(51, 51, 51, 1)
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
.route-link:hover{
  color: rgba(51, 51, 51, 0.6)
}
/* @media screen and (max-width: 650px){
    .title-text{
        padding-top: 10px;
        margin: 0px;
        display: flex !important;
        justify-content: center;
    }
    .route{
        padding-bottom: 1px !important;
        display: flex !important;
        margin-left: 17px;
        justify-content: center;
    }
    .catalog-header{
        display: block !important;
    }
}
@media screen and (max-width: 400px){
    .catalog-header{
        padding-right: 2px;
        padding-left: 2px;
    }
} */
</style>