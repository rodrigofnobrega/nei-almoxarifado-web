import { useApi } from "../../composables/axios";

export const patchUSER = async (userStore, email, newRole:string) => {
    try{
        const { data } = await useApi().patch(`/users/${email}`, { 
            newRole: newRole
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userStore.token}`
            }
        })
        return true;
    } catch(err){
        console.log(err)
        return false;
    }
}