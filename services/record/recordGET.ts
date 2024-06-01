import axios from 'axios';
import { useApi } from '../../composables/axios';
export const getRecords = async (userStore, page, sort) => {
    try{
        if(sort){
            const { data } = await useApi().get(`http://localhost:8080/api/v1/records?page=${page}&sort=${sort}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userStore.token}`
                }
            })
            return data
        }
        const { data } = await useApi().get(`http://localhost:8080/api/v1/records?page=${page}`, {
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
    const { data } = await axios(`http://localhost:8080/api/v1/records/${record_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userStore.token}`
        }
    })
    return data
};
export const getRecordByEmail = async (userStore, email) => {
    const { data } = await axios(`http://localhost:8080/api/v1/records/query/users?email=${email}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userStore.token}`
        }
    })
    return data
};
export const getRecordByItemName = async (userStore, name) => {
    const { data } = await axios(`http://localhost:8080/api/v1/records/query/itens?name=${name}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userStore.token}`
        }
    })
    return data
};