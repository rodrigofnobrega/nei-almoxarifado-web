<template>
    <div class="modal fade" id="scrollableModal" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true" @keyup.down="SearchDown()" @keyup.up="SearchUp()" >
          <div class="modal-dialog moda-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <div class="search-bar d-flex mx-1">
                  <form class="d-flex align-items-center" role="search">
                    <label>
                      <IconsSearchGlass class="search-icon p-1" width="40px" height="41px" style="border: 1px solid rgb(51, 51, 51, 0.2); border-right: 0;"/>
                    </label>
                    <input class="form-control outline-warning p-0" type="search" placeholder="Pesquisar" id="search-bar">
                  </form>
                </div>
              </div>
              <div class="modal-body">
                <ul class="list-group">
                  <a class="text-decoration-none" href="/inventario">
                    <li class="searchResult list-group-item list-group-item-action"  tabindex="0">Inventário</li>
                  </a>
                  <a class="text-decoration-none" href="/controle-de-acesso">
                    <li class="searchResult list-group-item list-group-item-action" tabindex="0">Controle de Acesso</li>
                  </a>
                  <a class="text-decoration-none">
                    <li class="searchResult list-group-item list-group-item-action d-flex justify-content-between align-items-center"  tabindex="0">
                      Computador
                      <span class="badge bg-primary rounded-pill">2</span>
                    </li>
                  </a>
                  <a class="text-decoration-none">
                    <li class="searchResult list-group-item list-group-item-action d-flex justify-content-between align-items-center"  tabindex="0">
                      Teclado
                      <span class="badge bg-primary rounded-pill">14</span>
                    </li>
                  </a>
                  <a class="text-decoration-none" href="/configuracoes">
                    <li class="searchResult list-group-item list-group-item-action" tabindex="0">Configurações</li>
                  </a>
                </ul>
              </div>
              <div class="modal-footer d-flex justify-content-center">
                <p class="fs-6"><IconsEnter class="bg-primary text-light" style="border-radius: 3px;"/> para selecionar <IconsBottomArrow class="bg-primary text-light" style="border-radius: 3px;"/> <IconsUpArrow class="bg-primary text-light" style="border-radius: 3px;"/> para navegar e <span class="bg-primary text-light" style="border-radius: 3px;">esc</span> para fechar</p>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
export default{
    data() {
        return {
            searchCount: 0,
        };
    },
    methods: {
        SearchDown() {
            let searchResult = document.getElementsByClassName("searchResult");
            console.log(this.searchCount);
            if ((this.searchCount) === (searchResult.length)) {
                this.searchCount = 1;
            }
            else {
                this.searchCount++;
            }
            searchResult[this.searchCount - 1].focus();
        },
        SearchUp() {
            let searchResult = document.getElementsByClassName("searchResult");
            if (this.searchCount <= 1) {
                this.searchCount = (searchResult.length);
            }
            else {
                this.searchCount--;
            }
            searchResult[this.searchCount - 1].focus();
        }
    },
} 
</script>

<style scoped>
.search-icon{
  border-right: 0;
  color: #333333;
  background-color: white;
}
.form-control{
    border: 1;
    border-left: 0;
    height: 41px;
    width: 420px;
    border-radius: 0px 4px 4px 0px;
}
.form-control::placeholder{
  font-size: 19px;
}
.form-control{
    border: 1;
    border-left: 0;
    height: 41px;
    width: 420px;
    border-radius: 0px 4px 4px 0px;
}
.form-control::placeholder{
  font-size: 19px;
}
</style>