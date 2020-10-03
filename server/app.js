const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
require('dotenv').config()

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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

app.listen(3000, () => console.log('Server is running'))