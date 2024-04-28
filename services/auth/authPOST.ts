import axios from 'axios'

export const authPost = async (password, email) => {
    const { data } = await axios.post("http://localhost:8080/api/v1/auth", {
        "email": email,
        "password": password
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return data
}