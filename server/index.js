const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = socketio(server)
const router = require('./router')

app.use(router)

io.on('connection', socket => {
    console.log('NEW CONNECTION!!!')

    socket.on('disconnect', () => {
        console.log('DISCONNECTED')
    })
})

app.set('port', process.env.PORT || 3001)

server.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})