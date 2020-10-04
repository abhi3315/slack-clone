const serverUri = 'http://localhost:5000'

export const isLoggedIn = async () => {
    const token = localStorage.getItem("token")
    if (!token) return false

    try {
        const response = await (await fetch(`${serverUri}/users/me`, {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })).json()

        if (response.error) return false

        return response

    } catch (e) {
        return false
    }
}