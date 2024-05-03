import axios from "axios";
//Lista todos os usuários
export const getUsers = async (userStore, userEmail) => {
    const { data } = await axios.get(`http://localhost:8080/api/v1/users/query?email=${userEmail}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
            }
        }
    )
    return data
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
export const getUserByEmail = async (userStore, userEmail) => {
    const { data } = await axios.get(`http://18.230.148.248:8080/api/v1/users/query?email=${userEmail}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
            }
        }
    )
    return data
};

//TO-DO
//Criar usuário
//LOGIN/Autenticação
//Deletar usuário
//Atualizar Senha