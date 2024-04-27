const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQwODY5NjAsImV4cCI6MTcxNDEyMjk2MCwicm9sZSI6IkFETUlOIn0.6HJttOrGPGziR1JypsfMhRcTZpQX7kn35cPxeQ2vOzg";

export const postAuth = async (email, password) => {
    const { data } = await useFetch("http://localhost:8080/api/v1/auth", {
        method: 'POST',
        header: {
            "Content-Type": "application/json"
        },
        body: {
            "email": email,
            "password": password
        }
    })
    return data._rawValue
}