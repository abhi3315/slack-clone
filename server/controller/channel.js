const Channel = require('../models/Channel')

exports.createChannel = async (req, res) => {
    try {
        req.body.createdBy = {}
        req.body.createdBy.name = req.user.name
        req.body.createdBy.avatar = req.user.avatar
        const channel = await (await Channel.create({ ...req.body })).populate({
            path: 'messages',
            options: { sort: { createdAt: 1 } }
        }).execPopulate()
        res.status(201).send({ channel })
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getAllChannel = async (req, res) => {
    try {
        const channels = await (await Channel.find()).populate({
            path: 'messages',
            options: { sort: { createdAt: 1 } }
        }).execPopulate()
        res.send(201).send(channels)
    } catch (e) {
        res.status(400).send(e)
    }
}