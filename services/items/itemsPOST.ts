import axios from 'axios'
import { useUser } from '../../stores/user';
const userStore = useUser()
//Cadastra um item
export const postCreateItem = async (name, sipac, qtd, type) => {
    const { data } = await axios.post('http://localhost:8080/api/v1/itens', {
        'name': name,
        'sipacCode': sipac,
        'quantity': qtd,
        'type': type
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        },
    });
    return data.content
};