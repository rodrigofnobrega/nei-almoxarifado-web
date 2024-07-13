import { defineStore } from "pinia";

export const useNotifications = defineStore('notifications', {
    state: () => ({
        notifications: []
    }),
    persist: {
        storage: persistedState.cookiesWithOptions({
          sameSite: 'strict',
          Secure: true
        }),
    },
})