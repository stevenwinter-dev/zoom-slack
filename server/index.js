require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const router = require('./router')
const cors = require('cors')
const { Server } = require('socket.io')
const pool = require('./db')
const util = require('util')
const auth = require('./Auth/jwtAuth')

const users = {};
const socketToRoom = {};

app.use(cors())
app.use(express.json())
app.use(router)
app.use('/authentication', auth)

app.post('/user/signup', (req, res) => {
    console.log(req.body.data)
})

app.get('/messages', async(req, res) => {
    try {
        const messages = await pool.query('SELECT * FROM message');
        res.json(messages.rows)
    } catch (err) {
        console.log(err)
    }
})

app.get('/messages/:id', async(req, res) => {
    try {
        const messages = await pool.query('SELECT * FROM message WHERE channel = $1', [req.params.id]);
        res.json(messages.rows)
    } catch (err) {
        console.log(err)
    }
})

app.post('/messages', async(req, res) => {
    console.log(req.body)
    try {
        console.log('message sent!')
        const { user_name, body, channel, date, time } = req.body.data
        const newMessage = await pool.query('INSERT INTO message (user_name, body, channel, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user_name, body, channel, date, time])
        console.log(req.body)
    } catch (err) {
        console.log(err)
    }
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
    },
})

io.on('connection', socket => {
    console.log('connected')

    socket.on("join room", roomID => {
        console.log(roomID)
        console.log(util.inspect(users, false, null));
        console.log(`IMA USERS ${users}`)
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

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
        console.log(`new CL ${msg.channel}`)
        socket.to(msg.channel).emit('receive', msg)
    })
})

app.set('port', process.env.PORT || 3001)

server.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})