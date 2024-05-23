import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useUser } from "../stores/user";
import { getItems } from "../services/items/itemsGET";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if(to.matched.length === 0){
        return navigateTo('/error/pagina-nao-encontrada')
    }
    if(to.path === '/login' || to.path === '/error/pagina-nao-encontrada'){
        return
    }
    const userStore = useUser();
    let res = undefined;
    try{
        res = await getItems(userStore, 0, '');
    } catch(err){
        if(to.path.includes('/error/')){
            return
        }
        if(err.response == undefined){
            return navigateTo('/error/500')
        }
        switch(err.response.status){
            case 401:
                return navigateTo('/error/401')
            case 403:
                return navigateTo('/login')
            case 404:
                return navigateTo('/error/404')
            case 500:
                return navigateTo('/error/500')
            case 503:
                return navigateTo('/error/503')
        }
    }
    if(to.path.includes('/error/')){
        return navigateTo('/')
    }
})
