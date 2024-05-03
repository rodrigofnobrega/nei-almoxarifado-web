import axios from 'axios';
//Listar Solicitações
export const getRequests = async (userStore) => {
    const { data } = await axios.get("http://18.230.148.248:8080/api/v1/requests", {
        headerss: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
     }
    )
    return data.content
}
//Listar Solicitações pelo id
export const getRequest = async (userStore) => {
    const request_id = 1;
    const { data } = await axios.get(`http://18.230.148.248:8080/api/v1/requests/${request_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
     }
    )
    return data._rawValue
}
//Listar Solicitações pelo status da solicitação
export const getRequestByStatus = async (userStore, requests_status) => {
    const { data } = await axios.get(`http://18.230.148.248:8080/api/v1/requests/status/${requests_status}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
     }
    )
    return data.content
}
//Listar Solicitações pelo id do usuário
export const getRequestByUser = async (userStore) => {
    const user_id = 1;
    const { data } = await axios.get(`http://18.230.148.248:8080/api/v1/requests/user/${user_id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
     }
    )
    return data._rawValue
}
//Listar Solicitações pelo id do item
export const getRequestByItem = async () => {
    const item_id = 1;
    const { data } = await axios.get(`http://18.230.148.248:8080/api/v1/requests/item/${item_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
     }
    )
    return data._rawValue
}