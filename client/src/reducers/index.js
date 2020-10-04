import * as actionTypes from "../actions/index"
import { combineReducers } from "redux"

const initialUserState = {
  currentUser: null,
  isLoading: true,
}

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      }
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

const initalChannelState = {
  currentChannel: null,
  userPosts: null,
}

const channelReducer = (state = initalChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
      }
    case actionTypes.SET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload.userPosts,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
})

export default rootReducer
