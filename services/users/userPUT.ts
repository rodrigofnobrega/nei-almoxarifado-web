import { useApi } from "../../composables/axios"
export const updatePasswordPUT = async (userStore, userId, currentPassword, newPassword, confirmPassword) => {
    const { data } = await useApi().put(`/users/updatePassword/${userId}`, {
        "currentPassword": currentPassword,
        "newPassword": newPassword,
        "confirmPassword": confirmPassword
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        }
    })
    return data;
}

export const forgotPasswordPUT = async (userEmail, recoveryToken, newPassword, confirmPassword) => {
    const { data } = await useApi().put(`/users/updateForgotPassword/${userEmail}`, {
        "recoveryToken": recoveryToken,
        "newPassword": newPassword,
        "confirmPassword": confirmPassword
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${recoveryToken}`
        }
    })
    return data;
}