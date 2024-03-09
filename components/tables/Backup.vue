<template>
    <ModalItemRegister />
    <ModalItemDetails />
    <ModalItemHistory />
    <div class="catalog-header d-flex align-items-center">
        <h2>Almoxarifado Escolar</h2>
        <div class="d-flex">
            <button class="d-flex btn btn-outline-primary border-0 me-2" data-bs-toggle="modal" data-bs-target="#itemRegistration">
                Novo
                <IconsPlus class="mx-1" width="1.5em" height="1.5em"/>
            </button>
            <div class="dropdown">
                <button @focusin="colorFocus" @focusout="colorUnfocus" class="d-flex btn btn-outline-primary border-0 me-2" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outside" aria-expanded="false">
                    Filtro
                    <IconsFilter class="mx-1" width="1.5em" height="1.5em"/>
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais recentes</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais antigos</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Disponíveis</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Indisponíveis</button>
                    </li>
                </ul>
            </div>
            <div class="dropdown">
                <button @focusin="colorFocus" @focusout="colorUnfocus" class="d-flex btn btn-outline-primary border-0 me-2" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outsite" aria-expanded="false">
                    Configurações
                    <IconsSettings class="mx-1" width="1.5em" height="1.5em"/>
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais recentes</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais antigos</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Disponíveis</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Indisponíveis</button>
                    </li> 
                </ul>
            </div>  
        </div>
    </div>
    <hr>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
            <tr>
                <th class="col-title" scope="col">Nome</th>
                <th class="col-title" scope="col">Código Sipac</th>
                <th class="col-title" scope="col">Tipo Unitário</th>
                <th class="col-title" scope="col">Quantidade</th>
                <th class="col-title" scope="col">Última atualização</th>
                <th class="col-title end"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row"><p>Cartolina Amarela</p></th>
                <th>283492354</th>
                <th>Unidade</th>
                <th>200
                </th>
                <th><p>03/03/2023 13:30:00</p></th>
                <th class="end">
                    <button class="table-btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#itemDetailing">
                        Detalhes
                    </button>
                    <button class="table-btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#itemHistory">
                        Histórico
                    </button>
                </th>
            </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default{
    data(){
        return{
            isEditable: false
        }
    },
    methods: {
        editQuantity(){
            this.isEditable = !this.isEditable;
        },
        colorFocus(e){
            e.target.style.color = "white";
        },
        colorUnfocus(e){
            e.target.style.color = "rgb(51, 51, 51, 0.7)";
        }
    },
    mounted(){
        const itemModals = document.getElementsByClassName('modal-header');
        for(let i = 1; i < itemModals.length; i++){
            itemModals[i].classList.add('small');
        }
    }
}

</script>

<style scoped>
table{
    width: 82vw;
}
h2{
    font-weight: 300;
    color: rgb(51,51,51, 0.8);
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
}
p{
    padding-top: 13px;
    margin: 0;
    font-size: 18px;    
}

.action-btn{
    font-size: 14px;
    margin-top: 5px;
    margin-right: 10px;
    padding: 5px 5px 5px 5px;
}
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
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
    padding: 5px 5px 5px 5px;
}
tr:hover .table-btn{
    opacity: 100%;
}
tr:hover p{
    opacity: 70%;
}
</style>