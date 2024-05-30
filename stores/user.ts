import { defineStore } from "pinia";
import { authPost } from "../services/auth/authPOST";
import axios from 'axios';
import { navigateTo, useRouter } from "nuxt/app";
import { getUserByEmail } from "../services/users/userGET";

export const useUser = defineStore('user', {
    state: () => ({
        token: '',
        email: '',
        id: null
    }),
    actions: {
        async fetchData(password, email){
            this.email = email
            try{
                const router = useRouter();
                const res = await authPost(password, email);
                this.token = res.token;
                
                const response = await getUserByEmail({token: this.token}, email)
                this.id = response.content
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