<template>
	<div class="modal fade" tabindex="-1" id="scrollableModal"  aria-labelledby="scrollableModalLabel" aria-hidden="true" data-bs-backdrop="true" @keyup.down="SearchDown()" @keyup.up="SearchUp()" @keyup.enter="Navigate()"> 
		<div class="modal-dialog modal-dialog-start modal-dialog-scrollable"> 
			<div class="modal-content"> 
				<div class="modal-header">
            <div class="search-bar d-flex mx-1">
                <form class="ms-0 NavigateToItem d-flex align-items-center" role="search">
                  <label>
                    <IconsSearchGlass class="search-icon p-1" width="40px" height="41px" style="border: 1px solid rgb(51, 51, 51, 0.2); border-right: 0;"/>
                  </label>
                  <input class="form-control outline-warning p-0" v-model="searchQuery" @input="handleSearch" type="search" placeholder="Pesquisar" autofocus>
                </form>
            </div>	
				</div>
				<div class="modal-body">
            <ul v-if="showResults && searchQuery !== '' && searchResults.length != 0" class="list-group">
                <a class="text-decoration-none" v-for="result in searchResults" :href="`/catalogo`" :key="result.id">
                  <li @click="NavigateToItem(result.id)" class="searchResult list-group-item list-group-item-action d-flex justify-content-between align-items-center" tabindex="0"> 
                    {{ result.name }} 
                    <span class="badge bg-primary rounded-pill" v-if="result"> {{ result.quantity }} </span>
                  </li>
                </a>
              </ul>
            <p class="d-flex justify-content-center align-items-center pt-3" v-else>Nenhum Resultado Encontrado.</p>
				</div>
				<div class="modal-footer">
            <p class="fs-6"><IconsEnter class="bg-primary text-light" style="border-radius: 3px;"/> para selecionar <IconsBottomArrow class="bg-primary text-light" style="border-radius: 3px;"/> <IconsUpArrow class="bg-primary text-light" style="border-radius: 3px;"/> para navegar e <span class="bg-primary text-light" style="border-radius: 3px;">esc</span> para fechar</p>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import { useSearch } from '../../stores/search.ts';
import { useStorageStore } from '../../stores/storage.ts';
import { getItems } from '../../services/items/itemsGET.ts';
import { useUser } from '../../stores/user.ts';

export default {
  data() {
    return {
      searchQuery: "",
      searchCount: 0,
      searchResults: [],
      showResults: false,
      pagination: 0,
      totalPages: 0,
      searchIndex: 0,
      typingTimeout: null
    };
  },
  methods: {
    NavigateToItem(id) {
      this.searchStore.itemSearch = { searching: true, itemId: id }
    },
    SearchDown() {
      let searchResult = document.getElementsByClassName("searchResult");
      if ((this.searchCount) === (searchResult.length)) {
        this.searchCount = 1;
      } else {
        this.searchCount++;
      }
      searchResult[this.searchCount - 1].focus();
    },
    SearchUp() {
      let searchResult = document.getElementsByClassName("searchResult");
      if (this.searchCount <= 1) {
        this.searchCount = (searchResult.length);
      } else {
        this.searchCount--;
      }
      searchResult[this.searchCount - 1].focus();
    },
    Navigate() {
      let searchResult = document.getElementsByClassName("searchResult");
      searchResult[this.searchCount - 1].click();
    },
    async handleSearch() {
      this.showResults = false;
      this.searchResults = [];
      this.pagination = 0;
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(() => {
         this.fetchSearchResults();
      }, 1000);
      this.showResults = true;
    },
    async fetchSearchResults() {
      while (this.searchResults.length < 20 && this.pagination < this.totalPages) {
        if (this.pagination < this.store.items.length) {
          this.store.items[this.pagination].map((item) => {
            if (item.name.includes(this.searchQuery)) {
              this.searchResults.push(item);
            }
          });
        } else {
          const res = await getItems(this.userStore, this.pagination, 'id,desc');
          this.totalPages = res.totalPages;
          this.store.items.push(res.content);
          res.content.map((item) => {
            if (item.name.includes(this.searchQuery)) {
              this.searchResults.push(item);
            }
          });
        }
        this.pagination++;
      }
    },
    async itemsReq() {
      const res = await getItems(this.userStore, this.pagination, 'id,desc');
      this.totalPages = res.totalPages;
      this.store.items.push(res.content);
      this.pagination++;
    },
  },
  mounted() {
    this.itemsReq();
  },
  async setup() {
    const userStore = useUser();
    const searchStore = useSearch();
    const store = useStorageStore();

    return {
      store,
      searchStore,
      userStore
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
.modal-content{
	overflow-y: hidden;
}
@media screen and (max-width: 630px){
  .form-control{
    width: 75vw !important;
    
  }
  .NavigateToItem{
    width: 75vw;
  }
}
@media screen and (max-width: 676px) {
	.modal-dialog{
		margin-top: 10% !important;
		margin-left: 10% !important;
		margin-right: 5% !important;
	}
}
@media screen and (max-width: 412px) {
	.modal-dialog{
		margin-left: 7% !important;
		margin-right: 7% !important;
	}
}
</style>

