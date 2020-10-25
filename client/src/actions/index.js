// User Action Types
export const SET_USER = "SET_USER"
export const CLEAR_USER = "CLEAR_USER"

// Channel Action Types
export const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL"
export const SET_USER_POSTS = "SET_USER_POSTS"
export const ADD_NEW_CHANNEL = "ADD_NEW_CHANNEL"

// User Actions
export const setUser = user => {
    return {
        type: SET_USER,
        payload: {
            currentUser: user,
        },
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER,
    }
}

// Channel Actions
export const setCurrentChannel = channel => {
    return {
        type: SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel,
        },
    }
}

export const setUserPosts = userPosts => {
    return {
        type: SET_USER_POSTS,
        payload: {
            userPosts,
        },
    }
}

export const addNewChannel = channel => {
    return {
        type: ADD_NEW_CHANNEL,
        payload: {
            channel
        }
    }
}
