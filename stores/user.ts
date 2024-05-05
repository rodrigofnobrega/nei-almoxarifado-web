import { defineStore } from "pinia";
import { authPost } from "../services/auth/authPOST";
import axios from 'axios';
import { navigateTo, useRouter } from "nuxt/app";

export const useUser = defineStore('user', {
    state: () => ({
        token: '',
        email: ''
    }),
    actions: {
        async fetchData(password, email){
            this.email = email
            try{
                const router = useRouter();
                const res = await authPost(password, email);
                this.token = res.token;
                localStorage.setItem('session', JSON.stringify(res.token))
                navigateTo('/');
            } catch(err) { 
                console.log(err)
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