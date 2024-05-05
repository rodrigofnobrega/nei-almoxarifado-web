import axios from 'axios'

export const getItems = async (userStore) => {
    const { data } = await axios.get('https://neialmoxarifadoapi.ddns.net:8080/api/v1/itens', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
    });
    return data.content
};
//Busca item pelo id 
export const getItem = async (userStore, item_id) => {
    const { data } = await axios.get(`https://neialmoxarifadoapi.ddns.net:8080/api/v1/itens/${item_id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
    });
    return data.content
};


