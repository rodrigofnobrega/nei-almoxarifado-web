import { useApi } from "../../composables/axios";

export const deleteUser = async (userStore, userId) => {
    try {
        const { data } = await useApi().delete(`users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userStore.token}`
            }
        });
        return data;
    } catch (err) {
        throw err; 
    }
};
