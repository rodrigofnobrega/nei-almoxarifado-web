import axios from 'axios'
import { navigateTo } from 'nuxt/app';

export const getItems = async (userStore, page, sort) => {
    try{
        if(sort){
            const { data } = await axios.get(`http://localhost:8080/api/v1/itens?page=${page}&sort=${sort}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userStore.token}`
                }
            });
            return data
        }
        const { data } = await axios.get(`http://localhost:8080/api/v1/itens?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userStore.token}`
                }
            });
        return data
    } catch(error){
        console.log(error)
        return error
    }
};
//Busca item pelo id 
export const getItem = async (userStore, item_id) => {
    const { data } = await axios.get(`http://localhost:8080/api/v1/itens/${item_id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
    });
    return data.content
};


