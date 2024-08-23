import { useApi } from '../../composables/axios';

export const postRecord = async (userStore, user_id, qtd, operation) => {
    const { data } = await useApi().post("/auth", {
        "userID": user_id,
        "quantity": qtd,
        "operation": operation
    },{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userStore.token}`
        },
    })
    return data
};

