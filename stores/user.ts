import { defineStore } from "pinia";
import { authPost } from "../services/auth/authPOST";
import axios from 'axios';
import { navigateTo, useRouter } from "nuxt/app";
import { getUserByEmail } from "../services/users/userGET";
import { usePopupStore } from "./popup";

export const useUser = defineStore('user', {
    state: () => ({
        token: '',
        email: '',
        id: null,
        role: null
    }),
    actions: {
        async fetchMetaData(){
            const response = await getUserByEmail({token: this.token}, this.email)
            this.id = response.id;
            this.role = response.role;
            localStorage.setItem('session', JSON.stringify(this.token));
            return navigateTo('/');
        },
        async fetchData(password, email){
            const popUpStore = usePopupStore();
            this.email = email
            try{
                const res = await authPost(password, email);
                this.token = res.token;
                popUpStore.throwPopup("Credenciais validadas", "blue");
                this.fetchMetaData();
                return 1;
            } catch(err) { 
                popUpStore.throwPopup("ERRO: credenciais inválidas", "#B71C1C")
                return 0;
            };
        },
        logout(){
            this.token = '';
            localStorage.removeItem('session');
            navigateTo('/login')
        }
    },
    persist: {
        storage: persistedState.cookiesWithOptions({
          sameSite: 'strict',
          Secure: true
        }),
    },
});