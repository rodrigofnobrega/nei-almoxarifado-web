import axios from 'axios';
import { useApi } from '../../composables/axios';
export const getRecords = async (userStore, page, sort) => {
    try{
        if(sort){
            const { data } = await useApi().get(`/records?page=${page}&sort=${sort}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userStore.token}`
                }
            })
            return data
        }
        const { data } = await useApi().get(`/records?page=${page}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userStore.token}`
                }
            })
            return data
    } catch(err){
        return err
    }
};
export const getRecord = async (userStore, record_id) => {
    const { data } = await useApi().get(`/records/${record_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userStore.token}`
        }
    })
    return data
};
export const getRecordByEmail = async (userStore, email, page) => {
    const { data } = await useApi().get(`/records/query/users?email=${email}&page=${page}&sort=id,desc`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userStore.token}`
        }
    })
    return data
};
export const getRecordByItemId = async (userStore, id) => {
    const { data } = await useApi().get(`/records/query/itens?id=${id}&sort=id,desc`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userStore.token}`
        }
    })
    return data
};