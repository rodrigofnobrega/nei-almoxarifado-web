import { useApi } from "../../composables/axios";
//Aceitar Solicitação
export const requestAccept = async (userStore, request_id, message) => {
    try{
        const { data } = await useApi().patch(`http://localhost:8080/api/v1/requests/accept/${request_id}`, {
            comment: message
        }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }});
        return true
    } catch(err){
        return false
    }
}


//Rejeitar Solicitação
export const requestDecline = async (userStore, request_id, message) => {
    try{
        const { data } = await useApi().patch(`/requests/decline/${request_id}`, {
            comment: message
        }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }});
        return true
    } catch(err){
        return false
    }
}


//Cancelar Solicitação
export const requestCancel = async (userStore, request_id) => {
    try{
        const { data } = await useApi().patch(`/requests/cancel/${request_id}`, null, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }});
        return true
    } catch(err){
        return false
    }
}