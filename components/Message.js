import messageStyles from '../styles/Message.module.css'

const Message = ({chat}) => {
    return (
        <div className={messageStyles.message}>
            <div>
                <p>{chat.name}<span>{chat.time}</span><span>{chat.date}</span></p>
            </div>
            <p>{chat.body}</p>
        </div>
    )
}

export default Message
