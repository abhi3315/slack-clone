const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const Pusher = require('pusher')
require('dotenv').config()

const { appId, key, secret, cluster } = process.env

const pusher = new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true
});

const app = express()

const { mongodbUri } = process.env
mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(connection => {
    console.log('mongoDB connected to ' + connection.connection.host)
}).catch(err => {
    console.log(err)
    process.exit(1)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection Error:'))

const port = process.env.PORT || 5000
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is up on port ${port}!`)
    })

    const messageCollection = db.collection('messages')
    const messageChangeStream = messageCollection.watch()

    messageChangeStream.on('change', (change) => {
        console.log(change)

        if (change.operationType === 'insert') {
            const message = change.fullDocument
            pusher.trigger(
                'messages',
                'inserted',
                { ...message }
            )
        }
    })
})