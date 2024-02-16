<template>
    <div class="nav-sidebar position-fixed offcanvas offcanvas-start show" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-body">
            <ul class="list-group-flush container d-block ">
                <div class="item-bg d-flex align-items-center">
                    <IconsHome />
                    <a class="text-decoration-none list-group-item" href="/" aria-current="true">Home</a>
                </div>
                <div class="item-bg d-flex align-items-center">
                    <IconsControl />
                    <a class="text-decoration-none list-group-item" href="/controle-de-acesso">Controle de Acesso</a>
                </div>
                <div class="item-bg d-flex align-items-center">
                    <IconsSpreadSheet />
                    <a class="text-decoration-none list-group-item" href="/inventario">Inventário</a>
                </div>
                <div class="item-bg d-flex align-items-center">
                    <IconsOrganizingTables />
                    <a class="text-decoration-none list-group-item" href="/configuracoes-de-inventario">Configurações de Inventário</a>
                </div>
                <div class="item-bg d-flex align-items-center">
                    <IconsDirectory />
                    <a class="text-decoration-none list-group-item" href="/registro">Registro</a>
                </div>
                <div class="item-bg d-flex align-items-center">
                    <IconsSettings width="1.7em" height="1.7em"/>
                    <a class="text-decoration-none list-group-item" href="/configuracoes">Configurações</a>
                </div>
                <div class="item-bg d-flex align-items-center">
                    <IconsInformation />
                    <a class="text-decoration-none list-group-item" href="/sobre">Sobre</a>
                </div>
            </ul>
        </div>
        <div class="offcanvas-footer d-flex align-items-center justify-content-end">
            <button class="btn bg-light-emphasis" type="button" id="sideBareColapse" style="width: 298px; border-radius: 0%; height: 55px;">Clique</button>
        </div>
    </div>
</template>

<style scoped>
.nav-sidebar{
    z-index: 0;
}
.list-group-flush{
    margin-left: -16px;
}
.list-group-item{
    width: 285px;
    margin-left: 7px;
}
.item-bg{
    margin-top: 15px;
    height: 52px;
}
.item-bg:hover{
    color: white;
    width: 275px;
    background: #0B3B69;
    border-radius: 17px;
}
</style>