import { useApi } from "../../composables/axios";

export const patchItem = async(userStore, itemId, idealAmount) => {
    try{
        const { data } = await useApi().patch(`/itens/${itemId}`, {
            'idealAmount': idealAmount
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userStore.token}`
            },
        });
        console.log("FUNFOU")
        return data
    } catch(err){
        console.log(err)
        return false
    }
}