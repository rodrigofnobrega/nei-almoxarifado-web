import axios from 'axios'
//Cadastra um item
export const postCreateItem = async (userStore ,name, sipac, qtd, type) => {
    const { data } = await axios.post('http://18.230.148.248:8080/api/v1/itens', {
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