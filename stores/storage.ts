import { defineStore } from "pinia";
import { postCreateItem } from "../services/items/itemsPOST";
import { putUpdateItem } from "../services/items/itemsPUT";
import { postRecord } from '../services/record/recordPOST.ts'
import { useUser } from './user.ts';
import { usePopupStore } from '~/stores/popup';
import { deleteItem } from "../services/items/itemDELETE.ts";

export const useStorageStore = defineStore('storage', {
    state: () => ({
      items: [],
      isReloadItems: false,
      records: [],
      itemRecord: [],
      itemDetails: undefined,
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
      async sendItem(item) {
        const userStore = useUser();
        const popupStore = usePopupStore();
        if(item){
          try{
            const res = await postCreateItem(userStore, item.name, item.sipacCode, item.quantity, item.type, item.minimumStock);
            if(res === false){
              popupStore.throwPopup('Erro: Existe um item com mesmo código sipac', '#B71C1C');
            }
          }catch(error){
            popupStore.throwPopup('Erro: Existe um item com mesmo código sipac', '#B71C1C')
          }
        }
        this.isReloadItems = true;
      },
      addItem(item: object){
        this.sendItem(item);
        this.isReloadItems = false;
      },
      async updateItems(item_id, item_name, item_sipac, item_type, item_qtd){
        const userStore = useUser();
        const popupStore = usePopupStore();
        if(item_id){
          try{
            const res = await putUpdateItem(userStore, item_id, item_name, item_sipac, item_type, item_qtd);
            if(!res){
              popupStore.throwPopup("Erro: Algum erro interno do sistema ocorreu, contante o suporte", 'red');
            }
            else{ popupStore.throwPopup("Item deletado com sucesso", 'blue'); }
          }catch(error){
            console.log(error);
            popupStore.throwPopup("Erro: Algum erro interno do sistema ocorreu, contante o suporte", 'red');
          }
        }
        this.isReloadItems = true;
      },
      async deleteItem(item_id){
        const userStore = useUser();
        const popupStore = usePopupStore();
        if(item_id){
          try{
            const res = await deleteItem(userStore, item_id);
            if(!res){
              popupStore.throwPopup("Erro: Algum erro interno do sistema ocorreu, contante o suporte", 'red');
            }
            else{ popupStore.throwPopup("Item deletado com sucesso", 'blue'); }
          } catch(err){
            popupStore.throwPopup("Erro: Algum erro interno do sistema ocorreu, contante o suporte", 'red');
          }
        }
        this.isReloadItems = true;
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