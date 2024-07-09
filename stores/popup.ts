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
            switch(background){
                case 'red':
                    this.bgColor = '#B71C1C';
                    break;
                case 'blue':
                    this.bgColor = '#0B3B69';
                    break;
                default:
                    this.bgColor = background;
            }
            this.popupActive = !this.popupActive;
        },
    },
});