import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useUser } from "../stores/user";
import { getItems } from "../services/items/itemsGET";
import { getRoles } from "../services/roles/rolesGET";


export default defineNuxtRouteMiddleware(async (to, from) => {
    if(to.matched.length === 0){
        return navigateTo('/error/pagina-nao-encontrada')
    }
    if(to.path === '/login' || to.path === '/error/pagina-nao-encontrada' || to.path === '/cadastro' || to.path === '/recuperar-senha' || to.path === '/atualizar-senha'){
        return
    }
    const userStore = useUser();
    if(userStore.role === 'USER'){
        if(userStore.token == ''){
            return navigateTo('/login')
        }
        if(to.path.includes('/nei')){
            let res;
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
                        return navigateTo('/login')
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
                return navigateTo('/login')
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
