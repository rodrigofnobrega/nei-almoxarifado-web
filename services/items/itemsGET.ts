import axios from 'axios'

export const getItems = async (userStore) => {
    const { data } = await axios.get('http://localhost:8080/api/v1/itens', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
    });
    return data.content
};
//Busca item pelo id 
export const getItem = async (item_id) => {
    const { data } = await useFetch(`http://localhost:8080/api/v1/itens/${item_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return data._rawValue.content
};


