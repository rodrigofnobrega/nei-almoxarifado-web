import axios from 'axios';
import { useUser } from '../../stores/user';
const userStore = useUser()

export const getRecords = async () => {
    const { data } = await useFetch("https://neialmoxarifadoapi.ddns.net:8080/api/v1/records", {
        method: 'GET',
        header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return data._rawValue
};
export const getRecord = async (record_id) => {
    const { data } = await useFetch(`https://neialmoxarifadoapi.ddns.net:8080/api/v1/records/${record_id}`, {
        method: 'GET',
        header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return data._rawValue
};
export const getRecordByRole = async (role) => {
    const { data } = await useFetch(`https://neialmoxarifadoapi.ddns.net:8080/api/v1/records/query/users?role=${role}`, {
        method: 'GET',
        header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return data._rawValue
};
export const getRecordByItemName = async (name) => {
    const { data } = await useFetch(`https://neialmoxarifadoapi.ddns.net:8080/api/v1/records/query/itens?name=${name}`, {
        method: 'GET',
        header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return data._rawValue
};