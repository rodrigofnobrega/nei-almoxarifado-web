import axios from 'axios';
//Aceitar Solicitação
export const requestAccept = async (userStore, request_id) => {
    console.log(request_id)
    const { data } = await axios.patch(`https://neialmoxarifadoapi.ddns.net:8080/api/v1/requests/accept/${request_id}`, null, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
    });
    return data
}


//Rejeitar Solicitação
export const requestDecline = async (userStore, request_id) => {
    console.log(userStore.token, request_id)
    const { data } = await axios.patch(
        `https://neialmoxarifadoapi.ddns.net:8080/api/v1/requests/decline/${request_id}`,
        null, // Data is null for PATCH request
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userStore.token}`
            }
        }
    );
    console.log(data)
    return data
}


//Cancelar Solicitação
export const requestCancel = async (request_id) => {
    const { data } = await useFetch(`http://18.230.148.248:8080/api/v1/requests/cancel/${request_id}`, {
        method: 'PATCH',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return data._rawValue
}