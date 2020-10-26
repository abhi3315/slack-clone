const path = require('path')
const User = require('../models/User')
const gravatar = require('gravatar')
require('dotenv').config()

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
        res.status(200).send({ success: true })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
}

exports.changeAvatar = async (req, res) => {
    try {
        if (req.files) {
            const file = req.files.avatar
            name = file.name
            newFileName = file.name.split('.')[0] + '-' + Date.now() + path.extname(file.name)
            file.mv(`${__dirname}/../uploads/avatar/${newFileName}`, (err) => {
                console.log(err)
            })
            req.user.avatar = `${process.env.host}/avatar/${newFileName}`
            await req.user.save()
            res.send(req.user)
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: e.message })
    }
}

exports.getUser = async (req, res) => {
    res.send(req.user)
}