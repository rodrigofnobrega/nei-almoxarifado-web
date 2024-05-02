import axios from 'axios'
//Atualiza um item
export const putUpdateItem = async (item_id, item_name, item_sipac) => {
    console.log(item_id, item_name, item_sipac)
    const { data } = await axios.put(`http://localhost:8080/api/v1/itens/${item_id}`, {
        "name": item_name,
        "sipacCode": item_sipac
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        },
    });
    return data._rawValue
};