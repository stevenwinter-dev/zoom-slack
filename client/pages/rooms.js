import Head from 'next/head'
import ChatContainer from '../components/ChatContainer'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'
import io from 'socket.io-client'
import { useState } from 'react'

const socket = io.connect('http://localhost:3001')


export default function Home() {
  const [user, setUser] = useState('Steven')
  const [channel, setChannel] = useState('main')
  const joinChannel = () => {
    socket.emit('join', channel)
    console.log(`ID: ${socket.id} joined: ${channel}`)
  }

  return (
    <>
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </Head>
        <Nav />
        <div className={styles.container} onClick={joinChannel}>
            <Sidebar setChannel={setChannel} />
            <ChatContainer socket={socket} user={user} channel={channel} />
        </div>
    </>
  )
}