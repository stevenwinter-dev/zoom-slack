require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const { Server } = require('socket.io')
const pool = require('./db')
const auth = require('./Auth/jwtAuth')

const users = {};
const socketToRoom = {};

app.use(cors())
app.use(express.json())
app.use('/authentication', auth)

app.get('/userInfo/:id', async(req, res) => {
   try {
       if(req.params.id != 'null') {
        const data = await pool.query('SELECT * FROM users WHERE user_id = $1', [parseInt(req.params.id)])
        res.json(data.rows)}
   } catch (err) {
       console.log(err)
   }
})

app.post('/user/signup', (req, res) => {
    console.log(req.body.data)
})

app.get('/messages', async(req, res) => {
    try {
        const messages = await pool.query(`
            SELECT 
                m.message_id,
                m.user_id,
                m.body,
                m.channel,
                m.date,
                m.time,
                COALESCE(NULLIF(m.user_name, ''), u.user_name, CASE WHEN m.user_id IS NOT NULL THEN 'Unknown User' ELSE 'Guest' END) as user_name,
                COALESCE(NULLIF(m.user_avatar, ''), u.user_avatar) as user_avatar
            FROM message m
            LEFT JOIN users u ON m.user_id = u.user_id
        `);
        res.json(messages.rows)
    } catch (err) {
        console.log(err)
    }
})

app.get('/messages/:id', async(req, res) => {
    try {
        const messages = await pool.query(`
            SELECT 
                m.message_id,
                m.user_id,
                m.body,
                m.channel,
                m.date,
                m.time,
                m.user_name as stored_user_name,
                u.user_name as joined_user_name,
                COALESCE(NULLIF(m.user_name, ''), u.user_name, CASE WHEN m.user_id IS NOT NULL THEN 'Unknown User' ELSE 'Guest' END) as user_name,
                COALESCE(NULLIF(m.user_avatar, ''), u.user_avatar) as user_avatar
            FROM message m
            LEFT JOIN users u ON m.user_id = u.user_id
            WHERE m.channel = $1
        `, [req.params.id]);
        console.log('Sample message data:', messages.rows[0]);
        res.json(messages.rows)
    } catch (err) {
        console.log(err)
    }
})

app.post('/messages', async(req, res) => {
    try {
        const { user_id, user_name, user_avatar, body, channel, date, time } = req.body.data
        console.log('Saving message with data:', { user_id, user_name, user_avatar, body, channel, date, time });
        const newMessage = await pool.query('INSERT INTO message (user_id, user_name, user_avatar, body, channel, date, time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [user_id, user_name, user_avatar, body, channel, date, time])
        console.log('Saved message:', newMessage.rows[0]);
        res.json(newMessage.rows[0])
    } catch (err) {
        console.error('Error saving message:', err)
        res.status(500).json({ error: 'Failed to save message' })
    }
})

// Admin routes
app.get('/admin/users', async(req, res) => {
    try {
        const users = await pool.query('SELECT user_id, user_name, user_email, user_avatar FROM users')
        res.json(users.rows)
    } catch (err) {
        console.error('Error fetching users:', err)
        res.status(500).json({ error: 'Failed to fetch users' })
    }
})

app.post('/admin/users', async(req, res) => {
    try {
        const { user_name, user_email, user_password, user_avatar } = req.body
        const newUser = await pool.query(
            'INSERT INTO users (user_name, user_email, user_password, user_avatar) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, user_email, user_avatar',
            [user_name, user_email, user_password, user_avatar]
        )
        res.json(newUser.rows[0])
    } catch (err) {
        console.error('Error creating user:', err)
        res.status(500).json({ error: 'Failed to create user' })
    }
})

app.put('/admin/users/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { user_name, user_email, user_avatar } = req.body
        const updatedUser = await pool.query(
            'UPDATE users SET user_name = $1, user_email = $2, user_avatar = $3 WHERE user_id = $4 RETURNING user_id, user_name, user_email, user_avatar',
            [user_name, user_email, user_avatar, id]
        )
        res.json(updatedUser.rows[0])
    } catch (err) {
        console.error('Error updating user:', err)
        res.status(500).json({ error: 'Failed to update user' })
    }
})

app.delete('/admin/users/:id', async(req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM users WHERE user_id = $1', [id])
        res.json({ message: 'User deleted successfully' })
    } catch (err) {
        console.error('Error deleting user:', err)
        res.status(500).json({ error: 'Failed to delete user' })
    }
})

app.put('/admin/messages/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { body, channel } = req.body
        const updatedMessage = await pool.query(
            'UPDATE message SET body = $1, channel = $2 WHERE message_id = $3 RETURNING *',
            [body, channel, id]
        )
        res.json(updatedMessage.rows[0])
    } catch (err) {
        console.error('Error updating message:', err)
        res.status(500).json({ error: 'Failed to update message' })
    }
})

app.delete('/admin/messages/:id', async(req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM message WHERE message_id = $1', [id])
        res.json({ message: 'Message deleted successfully' })
    } catch (err) {
        console.error('Error deleting message:', err)
        res.status(500).json({ error: 'Failed to delete message' })
    }
})

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://zoom-slack-production.up.railway.app"
        ],
        methods: ['GET', 'POST'],
    },
})

io.on('connection', socket => {
    console.log('connected')

    socket.on("join room", roomID => {
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
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    })

    socket.on('join', (req) => {
        socket.join(req)
    })

    socket.on('leave', prevRoom => {
        socket.leave(prevRoom)
    })

    socket.on('send', msg => {
        io.in(msg.channel).emit('receive', msg)
    })
})

app.set('port', process.env.PORT || 3001)

server.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})