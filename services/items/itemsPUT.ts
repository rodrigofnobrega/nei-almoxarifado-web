import axios from 'axios'
//Atualiza um item
export const putUpdateItem = async (userStore, item_id, item_name, item_sipac) => {
    const { data } = await axios.put(`http://18.230.148.248:8080/api/v1/itens/${item_id}`, {
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