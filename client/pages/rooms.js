import Head from 'next/head'
import ChatContainer from '../components/ChatContainer'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <>
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </Head>
        <Nav />
        <div className={styles.container}>
            <Sidebar />
            <ChatContainer />
        </div>
    </>
  )
}