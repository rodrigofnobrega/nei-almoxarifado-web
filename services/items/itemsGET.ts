import { navigateTo } from 'nuxt/app';
import { useApi } from '../../composables/axios';

export const getItems = async (userStore, page, sort) => {
    try{
        if(sort){
            const { data } = await useApi().get(`http://localhost:8080/api/v1/itens?page=${page}&sort=${sort}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userStore.token}`
                }
            });
            return data
        }
        const { data } = await useApi().get(`http://localhost:8080/api/v1/itens?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userStore.token}`
                }
            });
        return data
    } catch(err){
        return err
    }
};
//Busca item pelo id 
export const getItem = async (userStore, item_id) => {
    const { data } = await useApi().get(`http://localhost:8080/api/v1/itens/${item_id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
    });
    return data
};


