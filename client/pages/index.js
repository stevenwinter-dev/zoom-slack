import Head from 'next/head'
import { useState } from 'react'
import Login from '../components/Login'
import ChatContainer from '../components/ChatContainer'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'
import formStyles from '../styles/Forms.module.css'
import io from 'socket.io-client'
import axios from 'axios'
import jwt from 'jsonwebtoken'

// const socket = io.connect('http://localhost:3001')
const socket = io.connect('https://zoom-slack.herokuapp.com/')

export default function Home() {

  const [guest, setGuest] = useState(false)
  const [user, setUser] = useState('')
  const [channel, setChannel] = useState('Channel 1')
  const [previousChannel, setPreviousChannel] = useState('')
  const [wantToLogin, setWantToLogin] = useState(false)
  const [wantToRegister, setWantToRegister] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  const showLogin = () => {
    setWantToLogin(true)
  }

  const showRegister = () => {
    setWantToRegister(true)
  }
  
  const joinChannel = () => {
    socket.emit('leave', previousChannel)
    socket.emit('join', channel)
    console.log(`ID: ${socket.id} joined: ${channel}`)
  }

  {userId && joinChannel()}
    
  const handleSubmit = (e) => {
        e.preventDefault()
        setGuest(true)
        setWantToLogin(false)
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        // axios.post('http://localhost:3001/authentication/login', {
        axios.post('https://zoom-slack.herokuapp.com/authentication/login', {
            data: data
        }).then(res => {
          const token = res.data.token
          const tokenInfo = jwt.decode(token)
          setUserId(tokenInfo.user)
        })
    }


    const handleRegisterSubmit = (e) => {
      setGuest(true)
      setWantToRegister(false)
      setWantToLogin(true)
      const data = {
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
          avatar: e.target.avatar.value
      }
      // axios.post('http://localhost:3001/authentication/register', {
      axios.post('https://zoom-slack.herokuapp.com/authentication/register', {
          data: data
      })
  }
  

    if(wantToRegister) {
    return (
        <div className={formStyles['signup-container']}>
            <div >
                <form action="" onSubmit={handleRegisterSubmit} className={formStyles['signup-form-container']}>
                    <label>Name</label>
                    <input type="name" name="name" />
                    
                    <label>Email</label>
                    <input type="email" name="email" />
                    
                    <label>Password</label>
                    <input type="password" name="password" />
                    
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" />
                    
                    <label>Avatar</label>
                    <input type="url" name="avatar" />

                    <button type='submit'>Signup</button>
                </form>
            </div>
        </div>
    )
    }

  if(wantToLogin) {
    return (
    <div className={formStyles['signup-container']}>
      <div >
          <form action="" onSubmit={handleSubmit} className={formStyles['signup-form-container']}>
              
              <label>Email</label>
              <input type="email" name="email" />
              
              <label>Password</label>
              <input type="password" name="password" />

              <button type='submit'>Login</button>
          </form>
      </div>
  </div>
    )
  }

  return (
    <>
      <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <Nav user={user} showLogin={showLogin} showRegister={showRegister} />
      {
        !guest ? <Login setUser={setUser} /> 
      :
      <div className={styles.container}>
            <Sidebar channel={channel} setChannel={setChannel} setPreviousChannel={setPreviousChannel} />
            <ChatContainer socket={socket} user={user} channel={channel} userId={userId} />
        </div>
      }
    </>
  )
}
