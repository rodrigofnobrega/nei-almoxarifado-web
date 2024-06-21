import { useApi } from "../../composables/axios";
//Lista todos os usuários 
export const getUsers = async (userStore) => {
    const { data } = await useApi().get(`users`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
            }
        }
    )
    return data
};
//Listar pelo ID
export const getUserId = async (userStore, userId) => {
    const { data } = await useApi().get(`http://localhost:8080/api/v1/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
    })
    return data
};
//Listar pelo email
export const getUserByEmail = async (userStore, userEmail) => {
    const { data } = await useApi().get(`users/query?email=${userEmail}`, {
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