const path = require('path')
const Message = require('../models/Message')

exports.createMessage = async (req, res) => {
    try {
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
        const message = await (await Message.create({ ...req.body })).populate('user')
        res.status(201).send({ message })
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getAllMessage = async (req, res) => {
    try {
        const messages = await Message.find().populate('user')
        res.status(201).send(messages)
    } catch (e) {
        res.status(400).send(e)
    }
}