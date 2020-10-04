const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    user: {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        avatar: {
            type: String,
            trim: true
        }
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Channel'
    }
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message