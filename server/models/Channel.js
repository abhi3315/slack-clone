const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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

const Channel = mongoose.model('Channel', channelSchema)

module.exports = Channel