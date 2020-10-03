import React from 'react'
import { Comment, Image, Message } from 'semantic-ui-react'
// import moment from 'moment'

const isOwnMessage = (message, user) => {
    return message.user._id = user._id ? "message__self" : ""
}

const isImage = message => {
    return message.hasOwnProperty('image') && !message.hasOwnProperty('content')
}

const Message = ({ message, user }) => (
    <Comment>
        <Comment.Avatar src={message.user.avatar} />
        {/* <Comment.Content */}
    </Comment>
)