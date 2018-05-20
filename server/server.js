const path = require('path')

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const kiwisaver = require('./routes/kiwisaver')

const server = express()

server.use(bodyParser.json())
server.use(cors({origin: 'http://192.168.1.70:8080'}))
server.use(express.static(path.join(__dirname, '../public')))

server.use('/api/v1/ks', kiwisaver)


module.exports = server

