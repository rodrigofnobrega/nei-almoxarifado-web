import { useApi } from "../../composables/axios";
//Criar solicitação
export const postRequest = async (userStore, item_id, item_qtd, description) => {
    const { data } = await useApi().post('/requests', {
        "itemID": item_id,
        "quantity": item_qtd,
        "description": description},{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        },
    });
    return data
}