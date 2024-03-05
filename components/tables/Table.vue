<template>
    <ModalItemRegister />
    <div class="catalog-header d-flex align-items-center">
        <h2>Almoxarifado Escolar</h2>
        <div class="d-flex">
            <button class="d-flex options-btn btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#itemRegistration">
                Novo
                <IconsPlus class="mx-1" width="1.5em" height="1.5em"/>
            </button>
            <div class="dropdown">
                <button class="d-flex options-btn btn btn-outline-primary" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outside" aria-expanded="false">
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
                <button class="d-flex options-btn btn btn-outline-primary" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outsite" aria-expanded="false">
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
            <tr v-for="items in ">

            </tr>
            <tr>
                <th scope="row"><p>Cartolina Amarela</p></th>
                <th><p>283492354</p></th>
                <th><p>Unidade</p></th>
                <th class="align-items-center">
                    <div class="item-quantity d-flex">
                        <button :style="{ opacity: isEditable ? '100': '0' }" class="rm-btn btn btn-sm btn-light-alert rounded-circle me-1">
                            -
                        </button>
                        <p>200</p>
                        <button :style="{ opacity: isEditable ? '100': '0' }" class="add-btn btn btn-sm btn-light-success rounded-circle ms-1">
                            +
                        </button>
                    </div>
                </th>
                <th><p>03/03/2023 13:30:00</p></th>
                <th class="end">
                    <button class="table-btn btn btn-primary" :style="{ display: isEditable ? 'none': 'inline-block' }">
                        Detalhes
                    </button>
                    <button class="table-btn btn btn-primary" :style="{ display: isEditable ? 'none': 'inline-block' }">
                        Histórico
                    </button>
                    <button @click="editQuantity" class="table-btn btn btn-primary" :style="{ display: isEditable ? 'none': 'inline-block' }">
                        Editar
                    </button>
                    <button @click="editQuantity" class="action-btn btn btn-light-success text-light mx-1" :style="{ display: isEditable ? 'inline-block': 'none' }">
                        Confirmar
                    </button>
                    <button @click="editQuantity" class="action-btn btn btn-light-alert text-light mx-1" :style="{ display: isEditable ? 'inline-block': 'none' }">
                        Cancelar
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
}
.item-quantity{
    position: relative;
    left: 32px;
}
.add-btn, .rm-btn{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: white;
    padding: 0;
    width: 20px;
    height: 20px;  
    top: 12px;
}
.action-btn{
    font-size: 14px;
    margin-top: 5px;
    margin-right: 10px;
    padding: 5px 5px 5px 5px;
}
.options-btn{
    text-align: center; 
    margin-right: 5px;
    color: rgb(51, 51, 51, 0.8);
    border: 0;
}
.options-btn:hover{
    color: white;
}
.options-btn:focus{
    color: white;
    background-color: #0B3B69;
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