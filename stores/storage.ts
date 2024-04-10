import { defineStore } from "pinia";
import itemsJson from "../static/items.json"

const inter = itemsJson;

export const useStorageStore = defineStore('storage', {
    state: () => ({
      items: inter,
      sidebarSublinks: [],
      isRotated: false,
      deleteMode: false,
      editMode: false,
      tableSearch: " "
    }),
    actions: {
      async fetchItems(items: object){
        localStorage.setItem('items', JSON.stringify(items));
        this.sendItemsToServer();
      },
      async sendItemsToServer() {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            try {
                const response = await $fetch('/api/save-items', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ items: JSON.parse(storedItems) })
                });
            } catch (error) {
                console.error('Erro ao fazer a solicitação:', error);
            }
        }
      },
      addItem(item: object){
        this.items.push(item);
        this.fetchItems(this.items);
      },
      deleteItem(index: number, almoxarifado: string){
        let count = 0;
        for(let i = 0; i < this.items.length; i++){
          if(this.items[i].storage.includes(almoxarifado)){
            if(index == count){
              this.items.splice(i, 1);
              return 0;
            };
            count++;
          };
        };
      },
      updateItemQtd(index: number, newQtd: number, almoxarifado: string) {
        let count = 0;
        for(let i = 0; i < this.items.length; i++){
          if(this.items[i].storage.includes(almoxarifado)){
            if(index == count){
              this.items[i].qtd = newQtd;
            }
            count ++;
          }
        }
      },
      setSublink(sublinks: string[]) {
          this.sidebarSublinks = sublinks;
      },
      setRotated(){
        this.isRotated = !this.isRotated;
      },
      setDeleteMode(){
        this.deleteMode = !this.deleteMode;
      },
      setEditMode(){
        this.editMode = !this.editMode;
      },
  },
  getters: {
    getItems() {
        return this.items;
    }
  },
});
