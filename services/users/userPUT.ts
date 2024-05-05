const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQwODY5NjAsImV4cCI6MTcxNDEyMjk2MCwicm9sZSI6IkFETUlOIn0.6HJttOrGPGziR1JypsfMhRcTZpQX7kn35cPxeQ2vOzg";

export const putUser = async (user_id, currentPassword, newPassword, confirmPassword) => {
    const { data } = await useFetch(`https://neialmoxarifadoapi.ddns.net:8080/api/v1/users/${user_id}`, {
        method: "PUT",
        header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: {
            "currentPassword": currentPassword,
            "newPassword": newPassword,
            "confirmPassword": confirmPassword
        }
    })
    return data._rawValue
};