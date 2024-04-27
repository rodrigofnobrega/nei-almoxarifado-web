import axios from 'axios'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQyNjAwODEsImV4cCI6MTcxNDI5NjA4MSwicm9sZSI6IkFETUlOIn0.bv3X4uGVbdsK7KJQBOjUogn7TCuK62GKxDKlELkHuVM';
//Atualiza um item
export const putUpdateItem = async (item_id, item_name, item_sipac) => {
    console.log(item_id, item_name, item_sipac)
    const { data } = await axios.put(`http://localhost:8080/api/v1/itens/${item_id}`, {
        "name": item_name,
        "sipacCode": item_sipac
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return data._rawValue
};