import axios from 'axios';
import { useUser } from '../../stores/user';
const userStore = useUser()
//Aceitar Solicitação
export const requestAccept = async (request_id) => {
    const { data } = await useFetch(`http://localhost:8080/api/v1/requests/accept/${request_id}`, {
        method: 'PATCH',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return data._rawValue
}


//Rejeitar Solicitação
export const requestDecline = async (request_id) => {
    const { data } = await useFetch(`http://localhost:8080/api/v1/requests/decline/${request_id}`, {
        method: 'PATCH',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return data._rawValue
}


//Cancelar Solicitação
export const requestCancel = async (request_id) => {
    const { data } = await useFetch(`http://localhost:8080/api/v1/requests/cancel/${request_id}`, {
        method: 'PATCH',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return data._rawValue
}