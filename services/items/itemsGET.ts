import axios from 'axios'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQyNjAwODEsImV4cCI6MTcxNDI5NjA4MSwicm9sZSI6IkFETUlOIn0.bv3X4uGVbdsK7KJQBOjUogn7TCuK62GKxDKlELkHuVM';

export const getItems = async () => {
    const { data } = await axios.get('http://localhost:8080/api/v1/itens', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return data.content
};
//Busca item pelo id 
export const getItem = async (item_id) => {
    const { data } = await useFetch(`http://localhost:8080/api/v1/itens/${item_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return data._rawValue.content
};


