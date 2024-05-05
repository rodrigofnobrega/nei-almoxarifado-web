import axios from 'axios'
import { navigateTo } from 'nuxt/app'

export const authPost = async (password, email) => {
    try{
        const { data } = await axios.post("https://neialmoxarifadoapi.ddns.net:8080/api/v1/auth", {
            "email": email,
            "password": password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch(error){
        console.log(error)
        navigateTo('/login')
    }
}