<template>
    <Modal id="scrollableModal" tabindex="-1" aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true" @keyup.down="SearchDown()" @keyup.up="SearchUp()">
        <template v-slot:header>
            <div class="search-bar d-flex mx-1">
                <form class="d-flex align-items-center" role="search">
                  <label>
                    <IconsSearchGlass class="search-icon p-1" width="40px" height="41px" style="border: 1px solid rgb(51, 51, 51, 0.2); border-right: 0;"/>
                  </label>
                  <input class="form-control outline-warning p-0" v-model="searchQuery" @input="handleSearch" type="search" placeholder="Pesquisar">
                </form>
            </div>
        </template>
        <template v-slot:body>
          <template v-if="showResults">
            <ul class="list-group">
              <a class="text-decoration-none" v-for="result in searchResults" :href="result.route" :key="result.name">
                <li class="searchResult list-group-item list-group-item-action d-flex justify-content-between align-items-center" tabindex="0"> 
                  {{ result.name }} 
                  <span class="badge bg-primary rounded-pill" v-if="result.item"> {{ result.quantity }} </span>
                </li>
              </a>
            </ul>
          </template>
          <p class="d-flex justify-content-center align-items-center pt-3" v-else>Nenhum Resultado Encontrado.</p>
        </template>
        <template v-slot:footer>
            <p class="fs-6"><IconsEnter class="bg-primary text-light" style="border-radius: 3px;"/> para selecionar <IconsBottomArrow class="bg-primary text-light" style="border-radius: 3px;"/> <IconsUpArrow class="bg-primary text-light" style="border-radius: 3px;"/> para navegar e <span class="bg-primary text-light" style="border-radius: 3px;">esc</span> para fechar</p>
        </template>
    </Modal>

</template>

<script>
export default{
    data() {
        return {
            searchQuery: "",
            searchCount: 0,
            searchResults: [],
            showResults: false,
            searchData: [
              {route: "/inventario", name: "Cartolina Amarela", item: true, quantity: 5},
              {route: "/inventario", name: "Lápis Colorido", item: true, quantity: 20},
              {route: "/inventario", name: "Álcool em gel", item: true, quantity: 11},
              {route: "/inventario", name: "Pacote de Folha A4", item: true, quantity: 8},
              {route: "/inventario", name: "Tinta vermelha", item: true, quantity: 2},
              {route: "/configuracoes", name: "Configuracoes", item: false},
              {route: "/controle-de-acesso", name: "Controle de Acesso", item: false},
            ]
        };
    },
    methods: {
        SearchDown() {
            let searchResult = document.getElementsByClassName("searchResult");
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
        },
        handleSearch() {
        this.searchResults = this.searchData.filter(result => result.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        this.showResults = true; // Mostrar resultados da pesquisa
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