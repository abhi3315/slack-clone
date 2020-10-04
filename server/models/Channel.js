const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    createdBy: {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        avatar: {
            type: String,
            trim: true
        },
    },
    details: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    }
})

channelSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'channel'
})

const Channel = mongoose.model('Channel', channelSchema)

module.exports = Channel