const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTQwODY5NjAsImV4cCI6MTcxNDEyMjk2MCwicm9sZSI6IkFETUlOIn0.6HJttOrGPGziR1JypsfMhRcTZpQX7kn35cPxeQ2vOzg";

export const getRecords = async () => {
    const { data } = await useFetch("http://localhost:8080/api/v1/records", {
        method: 'GET',
        header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return data._rawValue
};
export const getRecord = async (record_id) => {
    const { data } = await useFetch(`http://localhost:8080/api/v1/records/${record_id}`, {
        method: 'GET',
        header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return data._rawValue
};
export const getRecordByRole = async (role) => {
    const { data } = await useFetch(`http://localhost:8080/api/v1/records/query/users?role=${role}`, {
        method: 'GET',
        header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return data._rawValue
};
export const getRecordByItemName = async (name) => {
    const { data } = await useFetch(`http://localhost:8080/api/v1/records/query/itens?name=${name}`, {
        method: 'GET',
        header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return data._rawValue
};