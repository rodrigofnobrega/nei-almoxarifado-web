import { useApi } from '../../composables/axios'
import { navigateTo } from 'nuxt/app'

export const authPost = async (password, email) => {
    try{
        const { data } = await useApi().post("/auth", {
            "email": email,
            "password": password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch(error){
        navigateTo('/login')
    }
}

export const recoveryTokenAUTH = async (token) => {
    const { data } = await useApi().post('/auth/validateRecoveryToken', {
        "token": token
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return data
}

export const forgotPasswordAUTH = async (email) => {
    const { data } = await useApi().post('/auth/forgotPassword', {
        "email": email
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return data
}