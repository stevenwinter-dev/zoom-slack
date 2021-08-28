import { useEffect, useRef, useState } from 'react'
import chatContainerStyles from '../styles/ChatContainer.module.css'
import CreateMessage from './CreateMessage'
import Message from './Message'
import chatData from '../seed'

const ChatContainer = () => {

    const [chats, setChats] = useState(chatData)

    const ScrollToBot = () => {
        const elementRef = useRef()
        useEffect(() => elementRef.current.scrollIntoView())
        return <div ref={elementRef} />
    }
    return (
        <div className={chatContainerStyles.chatcontainer}>
            <h2>I'm a chat container</h2>
            <div className={chatContainerStyles['chatcontainer-messages']}>
                {chats.map(chat => <Message chat={chat} key={chat.time} />)}
                <ScrollToBot />
            </div>
            <CreateMessage ScrollToBot={ScrollToBot} />
        </div>
    )
}

export default ChatContainer
