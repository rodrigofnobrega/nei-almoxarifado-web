import { defineStore } from "pinia";
import { postCreateItem } from "../services/items/itemsPOST";
import { putUpdateItem } from "../services/items/itemsPUT";
import { useUser } from './user.ts';

export const useStorageStore = defineStore('storage', {
    state: () => ({
      items: [],
      sidebarSublinks: [],
      isRotated: false,
      deleteMode: false,
      editMode: false,
      tableSearch: " ",
    }),
    actions: {
      async fetchItems(items: object, item: object){
        localStorage.setItem('items', JSON.stringify(items));
        const storedItems = localStorage.getItem('items');
        this.sendItemsToServer(item);
      },
      async sendItemsToServer(item) {
        const userStore = useUser();
        if(item){
          try{
            const res = await postCreateItem(userStore, item.name, item.sipacCode, item.quantity, item.type);
          }catch(error){
            console.log(error);
          }
        }
      },
      async updateItems(items, item_id, item_name, item_sipac){
        localStorage.setItem('items', JSON.stringify(items));
        if(item_id){
          try{
            const userStore = useUser();
            const res = await putUpdateItem(userStore, item_id, item_name, item_sipac);
          }catch(error){
            console.log(error);
          }
        }
      },
      addItem(item: object){
        this.items.push(item);
        this.fetchItems(this.items, item);
      },
      deleteItem(index: number, almoxarifado: string){
        let count = 0;
        for(let i = 0; i < this.items.length; i++){
          if(this.items[i].storage.includes(almoxarifado)){
            if(index == count){
              this.items.splice(i, 1);
              this.fetchItems(this.items);
              return 0;
            };
          };
          count++;
        };
        this.fetchItems(this.items);
      },
      updateItemQtd(index: number, newName: string, newSipac: string, almoxarifado: string) {
        let count = 0;
        let item_id;
        for(let i = 0; i < this.items.length; i++){
            if(index == count){
              item_id = this.items[i].id;
              this.items[i].name = newName;
              this.items[i].sipacCode = newSipac;
            }
          count ++;
        };
        this.updateItems(this.items, item_id, newName, newSipac);
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