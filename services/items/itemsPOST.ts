import axios from 'axios'
//Cadastra um item
export const postCreateItem = async (userStore ,name, sipac, qtd, type) => {
    try{
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
    } catch(err){
        return false
    }
};