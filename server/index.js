const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const router = require('./router')
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())
app.use(router)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
    },
})

io.on('connection', socket => {
    console.log('connected')

    socket.on('disconnect', () => {
        console.log('disconnected')
    })

    socket.on('join', (req) => {
        socket.join(req)
        console.log(`User with ID: ${socket.id} joined ${req}`)
    })

    socket.on('leave', prevRoom => {
        socket.leave(prevRoom)
    })

    socket.on('send', msg => {
        console.log(`new CL ${msg.room}`)
        socket.to(msg.room).emit('receive', msg)
    })
})

app.set('port', process.env.PORT || 3001)

server.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})