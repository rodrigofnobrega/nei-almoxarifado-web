import { useApi } from '../../composables/axios';
//Atualiza um item
export const putUpdateItem = async (userStore, item_id, item_name, item_sipac, item_type, item_qtd) => {
    try{
        await useApi().put(`/operacoes/atualiza/${item_id}`, {
            "name": item_name,
            "sipacCode": parseInt(item_sipac), 
            "quantity": parseInt(item_qtd),
            "type": item_type
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userStore.token}`
            },
        });
        return true
    } catch(err){
        console.log(err)
        return false
    }
};