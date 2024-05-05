import { defineStore } from "pinia";

export const usePopupStore = defineStore('popup', {
    state: () => ({
        popupActive: true,
    }),
    actions: {
        throwPopup(){
            this.popupActive = !this.popupActive;
        },
    },
});