import axios from 'axios'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQyNjAwODEsImV4cCI6MTcxNDI5NjA4MSwicm9sZSI6IkFETUlOIn0.bv3X4uGVbdsK7KJQBOjUogn7TCuK62GKxDKlELkHuVM';
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
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQyNjAwODEsImV4cCI6MTcxNDI5NjA4MSwicm9sZSI6IkFETUlOIn0.bv3X4uGVbdsK7KJQBOjUogn7TCuK62GKxDKlELkHuVM`
        },
    });
    return data.content
};