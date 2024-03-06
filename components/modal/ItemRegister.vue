<template>
    <Modal id="itemRegistration" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true">
        <template v-slot:header>
                <p class="header-title d-flex justify-content-start align-items-center">Cadastro de Item</p>
                <button class="btn btn-transparent text-light" type="button" data-bs-dismiss="modal">
                <IconsClose class="close mt-1 ms-5 s-5" width="1.7em" height="1.7em"/>
                </button>
        </template> 
        <template v-slot:body>
            <div class="mb-3">
               <label for="item-name">Nome do item</label> 
               <input class="form-control" id="item-name" type="text">
            </div>
            <div class="mb-3">
               <label for="item-sipac">Código Sipac <span class="text-light-emphasis ms-3">*opcional*</span></label> 
               <input class="form-control" id="item-sipac" type="text">
            </div>
            <div class="mb-3 d-flex">
                <div class="d-block">
                    <label for="item-qtd">Tipo Unitário</label> 
                    <select class="form-select me-5" aria-label="Default select example">
                     <option selected>Selecione o tipo</option>
                     <option value="unidade">unidade</option>
                     <option value="sacola">sacola</option>
                     <option value="unidade">caixa</option>
                     <option value="unidade">unidade</option> 
                     <option value="unidade">unidade</option>
                    </select>
               </div>
               <div class="d-block ms-5">
                    <label for="item-qtd">Quantidade</label> 
                    <input class="form-control" id="item-qtd" type="number" pattern="[0,9]*" oninput="this.value = this.value.replace(/[^0-9]/g, '');">
               </div>
            </div>
        </template>
        <template v-slot:footer>
            <div class="container-fluid d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-light-success text-light mx-3" id="submitRegister">Cadastrar</button>
                <button type="button" class="btn btn-light-alert text-light mx-3" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </template>
    </Modal>

</template>

<script>
export default{
    mounted(){
        const modal = document.getElementsByClassName('modal-header');
        modal[1].classList.add('search');
    }
}

</script>

<style scoped>
.modal-header{
    background-color: red;
}
.close{
    position: relative;
    left: 20px;
}
.header-title{
    font-size: 26px;
    font-weight: semibold;
    margin: -1px 0 -1px 0;
    padding: 0;
}
.btn{
    border-radius: 10px;
}
</style>