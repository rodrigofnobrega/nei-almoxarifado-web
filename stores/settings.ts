import { defineStore } from "pinia";

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        layout: 0,
        tipography: 0,
        isMobile: false,
        categories: ['unidade', 'sacola', 'caixa', 'folha', 'resma', 'pacote']
    }),
    persist: {
        storage: persistedState.cookiesWithOptions({
            sameSite: 'strict',
            Secure: true
          }),
    }
})