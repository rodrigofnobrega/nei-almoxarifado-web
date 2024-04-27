const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQwODY5NjAsImV4cCI6MTcxNDEyMjk2MCwicm9sZSI6IkFETUlOIn0.6HJttOrGPGziR1JypsfMhRcTZpQX7kn35cPxeQ2vOzg";
//Lista todos os usuários
export const getUsers = async () => {
    const { data } = await useFetch('http://localhost:8080/api/v1/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        }
    )
    return data._rawValue.content
};
//Listar pelo ID
export const getUserId = async () => {
    const user_id = 1
    const { data } = await useFetch(`http://localhost:8080/api/v1/users/${user_id}`, {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return data._rawValue
};
//Listar pelo email
export const getUserEmail = async () => {
    const email = "admin@email.com"
    const { data } = await useFetch(`http://localhost:8080/api/v1/users/query?email=${email}`, {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return data._rawValue
};

//TO-DO
//Criar usuário
//LOGIN/Autenticação
//Deletar usuário
//Atualizar Senha