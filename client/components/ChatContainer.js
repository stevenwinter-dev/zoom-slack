import { useEffect, useRef, useState } from 'react'
import chatContainerStyles from '../styles/ChatContainer.module.css'
import CreateMessage from './CreateMessage'
import Message from './Message'
import chatData from '../seed'
import messageStyles from '../styles/Message.module.css'


const ChatContainer = ({socket, user, channel}) => {
    
    const [newMessage, setNewMessage] = useState('')
    const elementRef = useRef()

    const ScrollToBot = () => {
        useEffect(() => elementRef.current.scrollIntoView())
        return <div ref={elementRef} />
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        if (newMessage !== '') {
            const currentDate = new Date()
            const messageData = {
                user: user,
                room: channel,
                body: newMessage,
                date: currentDate.toLocaleDateString(),
                time: currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
            }
            await socket.emit('send', messageData)
            setChats(current => [...current, messageData])
        }
        e.target.body.value = ''
        setNewMessage('')
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const currentDate = new Date()
    //     const currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
    //     const newMessage = {
    //         name: "Steven",
    //         body: e.target.body.value,
    //         date: currentDate.toLocaleDateString(),
    //         time: currentTime
    //     }
    //     console.log('submitted', newMessage)
    //     e.target.body.value = ''
    //     const newMsg = document.createElement('div')
    //     newMsg.innerHTML = `
    //         <div>
    //             <p>${newMessage.name}<span>${newMessage.time}</span><span>${newMessage.date}</span></p>
    //         </div>
    //         <p>${newMessage.body}</p>
    //     `
    //     const msgContainer = document.querySelector('#chat-msg-container')
    //     newMsg.classList.add(messageStyles.message)
    //     msgContainer.append(newMsg)
    //     elementRef.current.scrollIntoView()
    // }

    const [chats, setChats] = useState([])

    const text = (e) => {
        setNewMessage(e.target.value)
    }

    

    useEffect(() => {
        socket.on('receive', msg => {
            setChats(current => [...current, msg])
        })
    }, [socket])

    return (
        <div className={chatContainerStyles.chatcontainer}>
            <h2>I'm a chat container</h2>
            <div className={chatContainerStyles['chatcontainer-messages']} id='chat-msg-container'>
                {chats.map(chat => <Message chat={chat} key={chat.body} />)}
                <ScrollToBot />
            </div>
            <CreateMessage ScrollToBot={ScrollToBot} handleSubmit={sendMessage} text={text} />
        </div>
    )
}

export default ChatContainer
