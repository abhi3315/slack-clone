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

export const loginUser = async ({ email, password }) => {
    try {
        const response = await (await fetch(`${serverUri}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })).json()

        if (response.error) return false

        localStorage.setItem("token", response.token)

        return response.user

    } catch (e) {
        return false
    }
}

export const registerUser = async ({ email, password, name }) => {
    try {
        const response = await (await fetch(`${serverUri}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        })).json()

        console.log(response)
        if (response.error) return false

        localStorage.setItem("token", response.token)

        return response.user

    } catch (e) {
        return false
    }
}

export const addNewChannel = async ({ channelName, channelDetails }) => {
    const token = localStorage.getItem("token")
    if (!token) return false

    try {
        const response = await (await fetch(`${serverUri}/channels`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: token },
            body: JSON.stringify({ name: channelName, details: channelDetails })
        })).json()

        console.log(response)
        if (response.error) return false

        return response.user

    } catch (e) {
        return false
    }
}