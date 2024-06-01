import { useApi } from "../../composables/axios";

export const getRoles = async (userStore) => {
    const { data } = await useApi().get('/roles', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
            }
        })
    return data
}