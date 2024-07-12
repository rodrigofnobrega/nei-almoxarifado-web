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
        role: null,
    }),
    actions: {
        async fetchData(password, email){
            const popUpStore = usePopupStore();
            this.email = email
            try{
                const router = useRouter();
                const res = await authPost(password, email);
                this.token = res.token;
                
                const response = await getUserByEmail({token: this.token}, email)
                this.id = response.id
                this.role = response.role
                localStorage.setItem('session', JSON.stringify(res.token))
                return navigateTo('/');
            } catch(err) { 
                popUpStore.throwPopup("ERRO: credenciais inválidas", "#B71C1C")
                return err
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