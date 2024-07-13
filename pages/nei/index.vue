<template>
    <div class="d-block bg-fade">
        <div class="d-flex justify-content-center">
            <svg class="d-flex align-items-center bg-degrade mb-3" width="150" height="150">
                <image class="custom-logo" xlink:href="/logo.svg" width="145" height="145"/>
            </svg>
        </div>
        <div class="d-flex justify-content-center mb-2">
            <h1 class="homepage-title fw-bold">Nei Almoxarifado</h1>
        </div>
        <div class="d-flex justify-content-center mb-5">
            <h4 class="homepage-title text-center fw-medium opacity-75">Para fazer as solicitações de itens navegue<br> para a página 
                de <a class="text-decoration-none" href="/nei/catalogo">catálogo</a>, procure o item desejado e solicite. <br>Para acompanhar as suas solicitações basta navegar para a<br> página de <a class="text-decoration-none" href="/nei/catalogo">solicitações</a>.
            </h4>
        </div>
        <div class="search-section d-flex justify-content-center ms-3">
            <UtilsSearch class="mb-5"/>
        </div>
    </div>
    <ModalSearch />
</template>

<script setup>
definePageMeta({
    layout: 'client'
})

</script>

<style scoped>
.d-block{
    padding: 100px 0px 100px 0px;
}
.bg-degrade{
    border-radius: 40px 40px 40px 40px;
    background: linear-gradient(to bottom, rgb(11, 59, 105, 0.9) 10%, rgb(254, 213, 30, 0.9) 150%)  
}
.bg-fade { 
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.01), rgba(255, 255, 255, 1) 85%),
                radial-gradient(ellipse at top left, rgba(11, 59, 105, 0.5), transparent 50%),
                radial-gradient(ellipse at top right, rgba(11, 59, 105, 0.5), transparent 50%),
                radial-gradient(ellipse at center right, rgba(254, 213, 30, 0.8), transparent 50%),
                radial-gradient(ellipse at center left, rgba(254, 213, 30, 0.8), transparent 50%) !important;
}
</style>