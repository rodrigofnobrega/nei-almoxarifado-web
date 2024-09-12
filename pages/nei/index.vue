<template>
    <div>
        <Head>
            <Title>NEI Almoxarifado | Início</Title>
            <Meta name="início" content="Página inicial"/>
        </Head>
	</div>
    <div class="d-block bg-fade">
        <div class="d-flex justify-content-center mx-0 px-0">
            <svg class="d-flex align-items-center bg-degrade mb-3" width="150" height="150">
                <image class="custom-logo" xlink:href="/logo.svg" width="145" height="145"/>
            </svg>
        </div>
        <div class="d-flex justify-content-center mb-2 mx-0 px-0">
            <h1 class="homepage-title fw-bold">Nei Almoxarifado</h1>
        </div>
        <div class="d-flex justify-content-center mb-5 homepage-text">
            <h4 class="homepage-title text-center fw-medium opacity-75">Para fazer as solicitações de itens navegue<br class="text-spacement"> para a página 
                de <a href="/nei/catalogo">catálogo</a>, procure o item desejado e solicite. <br>Para acompanhar as suas solicitações basta navegar para a<br> página de <a href="/nei/solicitacoes">solicitações</a>.
            </h4>
        </div>
        <div class="search-section d-flex justify-content-center mx-0 px-0">
            <UtilsSearch class="mb-5"/>
            <div class="search-bar d-flex mx-1">
                <button class="d-flex btn btn-light btn-search align-items-center ps-1" type="button" tabindex="-1" data-bs-target="#neiSearchModal" data-bs-toggle="modal">
                    <IconsSearchGlass class="mt-0" width="30" height="30"/>
                    <span class="ms-1 fs-5">Pesquisar</span>
              </button>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'client'
})

</script>

<style scoped>
.search-section{
    margin-left: 10px;
}
.btn-search{
    width: 600px;
    font-weight: 600;
    color: #494b50 !important;
    opacity: 100% !important;
}
.text{
    color: #494b50;
}
.search-bar{
    box-shadow: 1px 1px 12px 2px rgb(0, 0, 0, 0.2);
    border-radius: 5px;
    border: 1px solid rgba(120, 117, 117, 0.6);
}
.search-result{
    border: none;
    box-shadow: 1px 1px 12px 2px rgb(0, 0, 0, 0.2);
}
.d-block{
    padding: 120px 0px 100px 0px;
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
                radial-gradient(ellipse at center left, rgba(254, 213, 30, 0.8), transparent 50%);
}

@media screen and (min-height: 780px) {
    .bg-fade {
        height: 90vh;
    }
}

@media screen and (min-height: 848px) {
    .bg-fade {
        height: 91vh;
    }
}

@media screen and (max-width: 700px){
    .btn-search{
        width: 400px;
    }
    .search-section{
        margin-left: 0px;
    }
    .homepage-text{
        margin: 0px 10px 0px 10px;
    }
    .text-spacement{
        display: none;
    }
}
@media screen and (max-width: 430px){
    .btn-search{
        width: 300px;
    }
    .search-section{
        margin-left: 0px;
    }
    h4{
        font-size: 19px;
    }
}
</style>