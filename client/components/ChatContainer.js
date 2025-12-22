import { useEffect, useRef, useState } from 'react'
import chatContainerStyles from '../styles/ChatContainer.module.css'
import CreateMessage from './CreateMessage'
import Message from './Message'
import axios from 'axios'
import Room from './Room'
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ChatContainer = ({socket, user, channel, userId}) => {

    const [chats, setChats] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [userInfo, setUserInfo] = useState({})
    const [loading, isLoading] = useState(true)
    const elementRef = useRef()

    useEffect(() => {
        if (channel && socket) {
            socket.emit('join', channel);
        }
        return () => {
            if (channel && socket) {
                socket.emit('leave', channel);
            }
        };
    }, [channel, socket]);

    const ScrollToBot = () => {
        useEffect(() => elementRef.current.scrollIntoView())
        return <div ref={elementRef} />
    }

    const fetchData = async (channel) => {
        let response = await axios(`${API_URL}/messages/${channel}`)
        setChats(response.data)
    }

    const fetchUserData = async (userId) => {
        let response = await axios.get(`${API_URL}/userInfo/${userId}`)
        setUserInfo(response.data[0])
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
        e.preventDefault();
        if (newMessage !== '') {
            const currentDate = new Date();
            const messageData = {
                user_id: userId,
                user_name: userId ? (userInfo.user_name || user) : 'Guest',
                user_avatar: userId ? userInfo.user_avatar : null,
                body: newMessage,
                channel: channel,
                date: currentDate.toLocaleDateString(),
                time: currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
            };
            await socket.emit('send', messageData);
            axios.post(`${API_URL}/messages`, {
                data: messageData
            });
        }
        e.target.body.value = '';
        setNewMessage('');
    };

    useEffect(() => {
        const handler = msg => setChats(current => [...current, msg]);
        socket.on('receive', handler);
        return () => {
            socket.off('receive', handler);
        };
    }, [socket]);

    return (
        <div className={chatContainerStyles.chatcontainer}>
        {channel != 'Video' ? 
            <>
            <h2>{channel}</h2>
            <h2>{userInfo.user_name}</h2>
            <div className={chatContainerStyles['chatcontainer-messages']} id='chat-msg-container'>
                {chats.map(chat => chat.channel === channel ? <Message chat={chat} user={user} key={chat.message_id || `${chat.time}-${chat.user_id}`} /> : null)}
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

