const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQwODY5NjAsImV4cCI6MTcxNDEyMjk2MCwicm9sZSI6IkFETUlOIn0.6HJttOrGPGziR1JypsfMhRcTZpQX7kn35cPxeQ2vOzg";
//Listar Solicitações
export const getRequests = async () => {
    const { data } = await useFetch("http://localhost:8080/api/v1/requests", {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
     }
    )
    return data._rawValue
}
//Listar Solicitações pelo id
export const getRequest = async () => {
    const request_id = 1;
    const { data } = await useFetch(`http://localhost:8080/api/v1/requests/${request_id}`, {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
     }
    )
    return data._rawValue
}
//Listar Solicitações pelo status da solicitação
export const getRequestByStatus = async () => {
    const request_status = 'recusado';
    const { data } = await useFetch(`http://localhost:8080/api/v1/requests/status/${request_status}`, {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
     }
    )
    return data._rawValue
}
//Listar Solicitações pelo id do usuário
export const getRequestByUser = async () => {
    const user_id = 1;
    const { data } = await useFetch(`http://localhost:8080/api/v1/requests/user/${user_id}`, {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
     }
    )
    return data._rawValue
}
//Listar Solicitações pelo id do item
export const getRequestByItem = async () => {
    const item_id = 1;
    const { data } = await useFetch(`http://localhost:8080/api/v1/requests/item/${item_id}`, {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
     }
    )
    return data._rawValue
}