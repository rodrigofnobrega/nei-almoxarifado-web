import { useApi } from "../../composables/axios";

export const deleteItem = async (userStore, itemId) => {
    try{
        await useApi().delete(`/operacoes/deleta/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userStore.token}`
            }
        })
        return true
    } catch(err){
        console.log(err)
        return false
    }
}