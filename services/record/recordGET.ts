import axios from 'axios';

export const getRecords = async (userStore) => {
    const { data } = await axios("http://localhost:8080/api/v1/records", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userStore.token}`
        }
    })
    return data
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
export const getRecordByRole = async (userStore, role) => {
    const { data } = await axios(`http://localhost:8080/api/v1/records/query/users?role=${role}`, {
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