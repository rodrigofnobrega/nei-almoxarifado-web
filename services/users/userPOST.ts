import { useApi } from "../../composables/axios";
export const postUser = async (name, email, password) => {
    const { data } = await useApi().post("http://localhost:8080/api/v1/users", {
        "name": name,
        "email": email,
        "password": password
    },{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return data
}