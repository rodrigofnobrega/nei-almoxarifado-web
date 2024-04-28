import axios from 'axios';
import { useUser } from '../../stores/user';
const userStore = useUser()
//Criar solicitação
export const postRequest = async () => {
    const item_id = 1;
    const qtd = 10;
    const message = 'Necessito para a sala A304'
    const { data } = await useFetch('http://localhost:8080/api/v1/requests', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:{
            "itemID": item_id,
            "quantity": qtd,
            "description": message
        }
    });
    return data._rawValue
}