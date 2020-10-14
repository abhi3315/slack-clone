const User = require('../models/User')
var gravatar = require('gravatar')

exports.create = async (req, res) => {
    const user = new User(req.body)
    const url = gravatar.url(user.email, { s: '100' })
    user.avatar = url
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

exports.logout = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
}

exports.changeAvatar = async (req, res) => {
    try {
        if (req.files) {
            var file = req.files.avatar
            name = file.name
            newFileName = file.name.split('.')[0] + '-' + Date.now() + path.extname(file.name)
            file.mv(`${__dirname}/../uploads/avatar/${newFileName}`, (err) => {
                console.log(err)
            })
            req.user.avatar = `/avatar/${newFileName}`
            await req.user.save()
            res.send(req.user)
        }
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
}

exports.getUser = async (req, res) => {
    res.send(req.user)
}