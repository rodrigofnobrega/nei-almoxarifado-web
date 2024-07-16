import { defineStore } from "pinia";

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        layout: 0
    }),
    persist: {
        storage: persistedState.cookiesWithOptions({
            sameSite: 'strict',
            Secure: true
          }),
    }
})