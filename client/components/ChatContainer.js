import { useEffect, useRef, useState } from 'react'
import chatContainerStyles from '../styles/ChatContainer.module.css'
import CreateMessage from './CreateMessage'
import Message from './Message'
import chatData from '../seed'
import messageStyles from '../styles/Message.module.css'
import axios from 'axios'
import Room from './Room'


// const ChatContainer = ({socket, user, channel}) => {
    
//     const [newMessage, setNewMessage] = useState('')
//     const elementRef = useRef()

//     const ScrollToBot = () => {
//         useEffect(() => elementRef.current.scrollIntoView())
//         return <div ref={elementRef} />
//     }

//     const sendMessage = async (e) => {
//         e.preventDefault()
//         if (newMessage !== '') {
//             const currentDate = new Date()
//             const messageData = {
//                 user_name: user,
//                 room: channel,
//                 body: newMessage,
//                 date: currentDate.toLocaleDateString(),
//                 time: currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
//             }
//             await socket.emit('send', messageData)
//             setChats(current => [...current, messageData])
//         }
//         e.target.body.value = ''
//         setNewMessage('')
//     }

//     const [chats, setChats] = useState([])
//     const [loading, setLoading] = useState(true)

//     const fetchData = async (channel) => {
//         setLoading(true)
//         let response = await axios(`http://localhost:3001/messages/${channel}`)
//         console.log(response.data)
//         setChats(current => [...current, response.data])
//         setLoading(false)
//     }

//     useEffect(()=> {
//         fetchData(channel)
//         setLoading(false)
//     }, [channel])

//     const text = (e) => {
//         setNewMessage(e.target.value)
//     }

//     useEffect(() => {
//         socket.on('receive', msg => {
//             setChats(current => [...current, msg])
//         })
//     }, [socket])

//     return (
//         <div className={chatContainerStyles.chatcontainer}>
//             <h2>{channel}</h2>
//             <div className={chatContainerStyles['chatcontainer-messages']} id='chat-msg-container'>
//                 {console.log(chats)}
//                 {!loading? chats.map(chat => chat.channel === channel ? <Message chat={chat} key={chat.body} /> : '<p>no messages</p>') : <p>loading...</p>}
//                 <ScrollToBot />
//             </div>
//             <CreateMessage ScrollToBot={ScrollToBot} handleSubmit={sendMessage} text={text} />
//         </div>
//     )
// }

// export default ChatContainer


const ChatContainer = ({socket, user, channel, userId}) => {

    const [chats, setChats] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [userInfo, setUserInfo] = useState({})
    const [loading, isLoading] = useState(true)
    const elementRef = useRef()

    const ScrollToBot = () => {
        useEffect(() => elementRef.current.scrollIntoView())
        return <div ref={elementRef} />
    }

    const fetchData = async (channel) => {
        // let response = await axios(`http://localhost:3001/messages/${channel}`)
        let response = await axios(`https://zoom-slack.herokuapp.com/messages/${channel}`)
        console.log(response.data)
        setChats(response.data)
    }

    const fetchUserData = async (userId) => {
        // let response = await axios.get(`http://localhost:3001/userInfo/${userId}`)
        let response = await axios.get(`https://zoom-slack.herokuapp.com/userInfo/${userId}`)
        setUserInfo(response.data[0])
        console.log(response.data[0])
    }

    useEffect(()=> {
        fetchData(channel)
    }, [channel])

    useEffect(()=> {
        fetchUserData(userId)
    }, [userId])

    const text = (e) => {
        setNewMessage(e.target.value)
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        if (newMessage !== '') {
            const currentDate = new Date()
            const messageData = {
                user_id: userId,
                user_name: userInfo.user_name,
                user_avatar: userInfo.user_avatar,
                body: newMessage,
                channel: channel,
                date: currentDate.toLocaleDateString(),
                time: currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
            }
            console.log(userInfo)
            console.log(newMessage)
            await socket.emit('send', messageData)
            setChats(current => [...current, messageData])
            // axios.post('http://localhost:3001/messages',{
            axios.post('https://zoom-slack.herokuapp.com/messages',{
                data: messageData
            })
        }
        e.target.body.value = ''
        setNewMessage('')
    }

    useEffect(() => {
        socket.on('receive', msg => {
            setChats(current => [...current, msg])
        })
    }, [socket])

    return (
        <div className={chatContainerStyles.chatcontainer}>
        {channel != 'Video' ? 
            <>
            <h2>{channel}</h2>
            <h2>{userInfo.user_name}</h2>
            <div className={chatContainerStyles['chatcontainer-messages']} id='chat-msg-container'>
                {chats.map(chat => chat.channel === channel ? <Message chat={chat} key={chat.time} /> : null)}
                <ScrollToBot />
            </div>
            <CreateMessage user={user} ScrollToBot={ScrollToBot} handleSubmit={sendMessage} text={text} />
             </>
        : 
        <Room channel='video' />
        }
        </div>
    )
}

export default ChatContainer

