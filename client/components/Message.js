import messageStyles from '../styles/Message.module.css'

const Message = ({chat}) => {
    return (
        <div className={messageStyles['message-container']}>
            <div className={messageStyles.message}>
            <img src={chat.user_avatar} alt="" />
                <p>{chat.user_name}<span>{chat.time}</span><span>{chat.date}</span></p>
            </div>
            <p>{chat.body}</p>
        </div>
    )
}

export default Message
