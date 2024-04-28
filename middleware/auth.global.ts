import { navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
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
    return navigateTo('/login');
});   