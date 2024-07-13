<template>
    <div class="text-center">
        <div class="search-bar d-flex mx-1">
          <button class="d-flex btn btn-search align-items-center ps-0" type="button" tabindex="-1" data-bs-target="#scrollableModal" data-bs-toggle="modal">
              <IconsSearchGlass />
              <span class="ms-1">Pesquisar</span>
            </button>
          </div>
        <div class="search-result" v-if="showResults && searchQuery !== ''">
          <ul class="list-group">
            <a class="text-decoration-none" v-for="result in searchResults" href="/catalogo" :key="result.id">
              <li @click="NavigateToItem(result.index)" class="searchResult list-group-item list-group-item-action d-flex justify-content-between align-items-center" tabindex="0"> 
                {{ result.name }} 
                <span class="badge bg-primary rounded-pill" v-if="result"> {{ result.quantity }} </span>
              </li>
            </a>
          </ul>
        </div>
    </div>
</template>

<script>
import { useSearch } from '../../stores/search';
import { useStorageStore } from '../../stores/storage';
import { getItems } from '../../services/items/itemsGET.ts';
import { useUser } from '../../stores/user.ts';
export default{
    data() {
        return {
            searchQuery: "",
            searchCount: 0,
            searchResults: [],
            showResults: false,
        };
    },
    methods: {
        NavigateToItem(id){
          this.searchStore.itemSearch = {searching: true, itemId: id}
        },
        Navigate(){
          let searchResult = document.getElementsByClassName("searchResult");
          searchResult[this.searchCount - 1].click();
        },
        handleSearch() {
          let items = this.store.items.map((item, index) => {
            item.index = index
            return item
          })
          this.searchResults = items.filter(result => result.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
          this.showResults = true; 
          this.searchCount = 0;
      }
    },
    async setup(){
      const userStore = useUser();
      const searchStore = useSearch();
      const store = useStorageStore();
      const sortedResponse = async (sort, isInverted, pagination) => {
          const res = await getItems(userStore, pagination, sort)
          return res
      }; 
      let response = await sortedResponse('', false, 0, 0);
      let totalPages = response.totalPages
      let itemsCache = ref([])
      let indexCount = 0;
      for(let i = 0; i < totalPages; i++){
          const res = await sortedResponse('id,desc', false, i)
          res.content.map((item) => {
              item.index = indexCount;
              indexCount++;
              itemsCache.value.push(item)
          });
      }
      store.items = itemsCache.value;
      return{
        store,
        searchStore
      }
    },
} 
</script>

<style scoped>
.btn-search{
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
    border: 1px solid rgba(120, 117, 117, 0.5);
}
.search-result{
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    box-shadow: 1px 1px 12px 2px rgb(0, 0, 0, 0.2);
}
.list-group{
    overflow-y: scroll;
    height: 211px;
}
.search-icon{
  border-right: 0;
  font-weight: 600;
  color: #494b50 !important;
  opacity: 100% !important;
  background-color: white;
}
.btn-search{
  border: 1;
  border-left: 0;
  height: 41px;
  width: 620px;
  border-radius: 0px 4px 4px 0px;
}
.btn-search{
  font-size: 19px;
}
.btn-search:active{
    background-color: white !important;
    color: #494b50 !important;
}
.btn-search:focus{
    background-color: white !important;
    color: #494b50 !important;
}
@media screen and (max-width: 630px){
  .form-control{
    width: 75vw !important;
    
  }
  .NavigateToItem{
    width: 75vw;
  }
}
</style>