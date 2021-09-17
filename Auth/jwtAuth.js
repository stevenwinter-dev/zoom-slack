const express = require('express')
const router = express.Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGen = require('./jwtGen')

//Register
router.post('/register', async (req,res) => {
    console.log('register route')
    try {
        const {name, email, password, avatar} = req.body.data
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
        if (user.rows.length !== 0) {
            return res.status(401).send('User already exists!')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        let newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password, user_avatar) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, hashedPassword, avatar]);
        const token = jwtGen(newUser.rows[0].user_id)
        res.json({token})
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server broke!')
    }
})

//Login
router.post('/login', async (req,res) => {
    const {email, password} = req.body.data
    
    try {
       const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
       
       if (user.rows.length === 0) {
           return res.status(401).json('Password or email is incorrect')
       }
       
       const validPassword = await bcrypt.compare(password, user.rows[0].user_password)
       
       if(!validPassword) {
            return res.status(401).json('Password or email is incorrect')
       }
       
       const token = jwtGen(user.rows[0].user_id)
       console.log(`logged in ${token}`)
       return res.json({token})
    
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server broke!')
    }
})

module.exports = router