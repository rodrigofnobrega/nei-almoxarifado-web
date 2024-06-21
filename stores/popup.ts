import { defineStore } from "pinia";

export const usePopupStore = defineStore('popup', {
    state: () => ({
        popupActive: true,
        message: '',
        bgColor: ''
    }),
    actions: {
        throwPopup(warningText, background){
            this.message = warningText;
            this.bgColor = background;
            this.popupActive = !this.popupActive;
        },
    },
});