const path = require('path')
const Message = require('../models/Message')

exports.createMessage = async (req, res) => {
    try {
        req.body.user = {}
        req.body.user.name = req.user.name
        req.body.user.avatar = req.user.avatar
        if (req.files) {
            var file = req.files.image
            name = file.name
            newFileName = file.name.split('.')[0] + '-' + Date.now() + path.extname(file.name)
            file.mv(`${__dirname}/../uploads/message/${newFileName}`, (err) => {
                console.log(err)
            })
            req.body.image = `/message/${newFileName}`
        }
        const message = await Message.create({ ...req.body })
        res.status(201).send(message)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

exports.getAllMessage = async (req, res) => {
    try {
        const messages = await Message.find().populate('channel')
        res.status(200).send(messages)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}