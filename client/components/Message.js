import messageStyles from '../styles/Message.module.css'
import Image from 'next/image'

const Message = ({chat, user}) => {
    console.log(chat)
    const avatar = chat.user_avatar || "https://www.citypng.com/public/uploads/preview/black-user-member-guest-icon-701751695037011q8iwf4mjbn.png";
    const userName = chat.user_name || `${user} - Guest`;
    return (
        <div className={messageStyles['message-container']}>
            <div className={messageStyles.message}>
                <div  className={messageStyles['user-info']}>
                <Image src={avatar} alt="user-avatar" width={50} height={50} />
                <strong>{userName}</strong></div>
                <p className='timestamp'><span>{chat.time}</span><span>{chat.date}</span></p>
            </div>
            <p className='chatMessage'>{chat.body}</p>
        </div>
    )
}

export default Message
