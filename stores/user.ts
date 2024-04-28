import { defineStore } from "pinia";
import { authPost } from "../services/auth/authPOST";
import axios from 'axios';
import { navigateTo, useRouter } from "nuxt/app";

export const useUser = defineStore('user', {
    state: () => ({
        password: '',
        email: '',
        token: ''
    }),
    actions: {
        setData(password, email){
            this.password = password;
            this.email = email;
            this.fetchData();
        },
        async fetchData(){
            try{
                const router = useRouter();
                const res = await authPost(this.password, this.email);
                this.token = res.token;
                localStorage.setItem('session', JSON.stringify(res.token))
                console.log(localStorage.getItem('session'));
                navigateTo('/');
            } catch(err) { 
                console.log(err)
            };
        },
        logout(){
            this.token = '';
            localStorage.removeItem('token');
            navigateTo('/login')
        }
    },
});