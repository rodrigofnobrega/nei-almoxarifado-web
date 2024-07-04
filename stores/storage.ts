import { defineStore } from "pinia";
import { postCreateItem } from "../services/items/itemsPOST";
import { putUpdateItem } from "../services/items/itemsPUT";
import { postRecord } from '../services/record/recordPOST.ts'
import { useUser } from './user.ts';
import { usePopupStore } from '~/stores/popup';

export const useStorageStore = defineStore('storage', {
    state: () => ({
      items: [],
      isReloadItems: false,
      records: [],
      itemRecord: [],
      requests: [],
      sidebarSublinks: [],
      isRotated: false,
      isEditionMode: false,
      isMobile: false,
      isMobileMenu: false,
      isResponsive: false,
      tableSearch: " ",
      recoveryToken: "",
    }),
    actions: {
      async sendItems(item) {
        const userStore = useUser();
        const popupStore = usePopupStore();
        if(item){
          try{
            const res = await postCreateItem(userStore, item.name, item.sipacCode, item.quantity, item.type);
            if(res === false){
              popupStore.throwPopup('Erro: Existe um item com mesmo código sipac', '#B71C1C');
            }
          }catch(error){
            popupStore.throwPopup('Erro: Existe um item com mesmo código sipac', '#B71C1C')
          }
        }
        this.isReloadItems = true;
      },
      async updateItems(items, item_id, item_name, item_sipac){
        if(item_id){
          try{
            const userStore = useUser();
            const res = await putUpdateItem(userStore, item_id, item_name, item_sipac);
          }catch(error){
            console.log(error);
          }
        }
        this.isReloadItems = true;
      },
      addItem(item: object){
        this.sendItems(item);
        this.isReloadItems = false;
      },
      deleteItem(index: number, almoxarifado: string){
        let count = 0;
        for(let i = 0; i < this.items.length; i++){
          if(this.items[i].storage.includes(almoxarifado)){
            if(index == count){
              this.items.splice(i, 1);
              this.sendItems(this.items);
              return 0;
            };
          };
          count++;
        };
        this.sendItems(this.items);
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
      }
  },
  getters: {
    getItems() {
        return this.items;
    }
  },
});