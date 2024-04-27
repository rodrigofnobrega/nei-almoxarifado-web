const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQwODY5NjAsImV4cCI6MTcxNDEyMjk2MCwicm9sZSI6IkFETUlOIn0.6HJttOrGPGziR1JypsfMhRcTZpQX7kn35cPxeQ2vOzg";
//Criar solicitação
export const postRequest = async () => {
    const item_id = 1;
    const qtd = 10;
    const message = 'Necessito para a sala A304'
    const { data } = await useFetch('http://localhost:8080/api/v1/requests', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:{
            "itemID": item_id,
            "quantity": qtd,
            "description": message
        }
    });
    return data._rawValue
}