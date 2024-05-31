import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useUser } from "../stores/user";
import { getItems } from "../services/items/itemsGET";
import { getRoles } from "../services/roles/rolesGET";


export default defineNuxtRouteMiddleware(async (to, from) => {
    if(to.matched.length === 0){
        return navigateTo('/error/pagina-nao-encontrada')
    }
    if(to.path === '/login' || to.path === '/error/pagina-nao-encontrada' || to.path === '/cadastro' || to.path === '/emailAuth'){
        return
    }
    const userStore = useUser();
    if(userStore.role === 'USER'){
        if(to.path.includes('/nei')){
            return
        }
        return navigateTo('/nei/')
    }
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
})
