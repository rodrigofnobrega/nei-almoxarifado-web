import { useUser } from "../stores/user";
import { defineNuxtRouteMiddleware } from "nuxt/app";
import { navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUser();
    if(userStore.role === 'USER'){
        if(to.path.includes('/error')){
            return
        }
        return navigateTo('/error/404')
    }
    return
})