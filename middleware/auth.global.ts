import { navigateTo } from "nuxt/app";
import { useUser } from "../stores/user";


export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUser();
    if(process.client){
        let token = localStorage.getItem("session");
        if(token){
            return; 
        }
        if (to.path === '/login') {
            return;
        }
        return navigateTo('/login');
    }
    if (to.path === '/login') {
        return;
    }
    if(process.server && userStore.token == ''){
        return navigateTo('/login')
    }
});   