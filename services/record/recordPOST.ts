import axios from 'axios';
import { useUser } from '../../stores/user';
const userStore = useUser()

export const postRecord = async (user_id, item_id, qtd, operation) => {
    const { data } = await useFetch("https://neialmoxarifadoapi.ddns.net:8080/api/v1/auth", {
        method: 'POST',
        header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: {
            "userID": user_id,
            "itemID": item_id,
            "quantity": qtd,
            "operation": operation
        }
    })
    return data._rawValue
};

