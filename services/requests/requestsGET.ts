import { useApi } from '../../composables/axios';
//Listar Solicitações
export const getRequests = async (userStore, page) => {
    const { data } = await useApi().get(`/requests?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
     }
    )
    return data
}
//Listar Solicitações pelo id
export const getRequest = async (userStore) => {
    const request_id = 1;
    const { data } = await useApi().get(`/requests/${request_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
     }
    )
    return data
}
//Listar Solicitações pelo status da solicitação
export const getRequestByStatus = async (userStore, requestStatus, page, userId) => {
    const { data } = await useApi().get(`/requests/status/${requestStatus}?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
     }
    )
    return data
}
export const getRequestByStatusUserId = async (userStore, requestStatus, page, userId) => {
    const { data } = await useApi().get(`/requests/status/${requestStatus}?userId=${userId}&page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
     }
    )
    return data
}
//Listar Solicitações pelo id do usuário
export const getRequestByUser = async (userStore, userId, pagination) => {
    const { data } = await useApi().get(`/requests/user?page=${pagination}&userId=${userId}&sort=id,desc`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
     }
    )
    return data
}
//Listar Solicitações pelo id do item
export const getRequestByItem = async (userStore, itemID) => {
    const { data } = await useApi().get(`/requests/item/${itemID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
     }
    )
    return data
}