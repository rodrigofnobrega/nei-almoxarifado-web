<template>
    <div class="catalog-header d-flex align-items-center">
        <h2>Almoxarifado Escolar</h2>
        <div class="d-flex">
            <button class="d-flex options-btn btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#scrollableModal">
                Novo
                <IconsPlus width="1.5em" height="1.5em"/>
            </button>
            <button class="d-flex options-btn btn btn-outline-primary">
                Filtro
                <IconsFilter width="1.5em" height="1.5em"/>
            </button>
            <button class="d-flex options-btn btn btn-outline-primary">
                Configurações
                <IconsSettings width="1.5em" height="1.5em"/>
            </button>
        </div>
    </div>
    <hr>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
            <tr>
                <th class="col-title" scope="col">Nome</th>
                <th class="col-title" scope="col">Código Sipac</th>
                <th class="col-title" scope="col">Status do item</th>
                <th class="col-title" scope="col">Quantidade</th>
                <th class="col-title" scope="col">Data</th>
                <th class="col-title end"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row"><p>Cartolina Amarela</p></th>
                <th><p>283492354</p></th>
                <th><p>Disponível</p></th>
                <th><p>2</p></th>
                <th><p>2</p></th>
                <th class="end">
                    <button class="table-btn btn btn-outline-primary">
                        Detalhes
                    </button>
                    <button class="table-btn btn btn-outline-primary">
                        Histórico
                    </button>
                    <button class="table-btn btn btn-outline-primary">
                        Adicionar
                    </button>
                    <button class="table-btn btn btn-outline-primary">
                        Remover
                    </button>
                </th>
            </tr>
        </tbody>
      </table>
    </div>
</template>

<style scoped>
table{
    width: 82vw;
}
h2{
    font-weight: 300;
}
hr{
    width: 82vw;
}
.catalog-header{
    justify-content: space-between;
}
.col-title{
    font-size: 18px;
    opacity: 80%;
    font-weight: 400;
    margin: 0;
}
th{
    text-decoration: none;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    padding-right: 25px;
}
p{
    padding-top: 13px;
    margin: 0;
}
.options-btn{
    text-align: center;
    margin-right: 20px;
    color: black;
}
.options-btn:hover{
    color: white;
}
.end{
    position: relative;
    padding-right: 0;
}
.table-btn{
    font-size: 15px;
    opacity: 0%;
    margin-top: 5px;
    margin-right: 10px;
    padding: 5px 5px 5px 5px
}
tr:hover .table-btn{
    opacity: 100%;
}
tr:hover p{
    opacity: 70%;
}
</style>