import axios from 'axios'
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
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQzMTExNjMsImV4cCI6MTcxNDM0NzE2Mywicm9sZSI6IkFETUlOIn0.bvEgvKmR8no3sD4_w4j2rlFDxVSfkHcdz99ha3fLk4A`
        },
    });
    return data.content
};