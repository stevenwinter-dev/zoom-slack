import Head from 'next/head'
import { useState } from 'react'
import Login from '../components/Login'
import ChatContainer from '../components/ChatContainer'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

export default function Home() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [channel, setChannel] = useState('Channel 1')
  const [previousChannel, setPreviousChannel] = useState('')
  console.log(channel, previousChannel)
  
  const joinChannel = () => {
    socket.emit('leave', previousChannel)
    socket.emit('join', channel)
    console.log(`ID: ${socket.id} joined: ${channel}`)
  }

  {user && joinChannel()}

  return (
    <>
      <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <Nav user={user} />
      {
        !loggedIn ? <Login setLoggedIn={setLoggedIn} setUser={setUser} /> 
      :
      <div className={styles.container}>
            <Sidebar channel={channel} setChannel={setChannel} setPreviousChannel={setPreviousChannel} />
            <ChatContainer socket={socket} user={user} channel={channel} />
        </div>
      }
    </>
  )
}
