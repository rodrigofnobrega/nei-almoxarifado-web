const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQwODY5NjAsImV4cCI6MTcxNDEyMjk2MCwicm9sZSI6IkFETUlOIn0.6HJttOrGPGziR1JypsfMhRcTZpQX7kn35cPxeQ2vOzg";

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