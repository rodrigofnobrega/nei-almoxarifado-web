import axios from 'axios'
//Atualiza um item
export const putUpdateItem = async (userStore, item_id, item_name, item_sipac) => {
    const { data } = await axios.put(`/itens/${item_id}`, {
        "name": item_name,
        "sipacCode": item_sipac
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        },
    });
    return data
};