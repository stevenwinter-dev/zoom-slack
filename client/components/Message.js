import messageStyles from '../styles/Message.module.css'

const Message = ({chat}) => {
    return (
        <div className={messageStyles['message-container']}>
            <div className={messageStyles.message}>
            {/* Replace with user image */}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3JPEO5Uez_pkdaCTT-Oro1PSGcjClVvAXQ&usqp=CAU" alt="" />
                <p>{chat.user_name}<span>{chat.time}</span><span>{chat.date}</span></p>
            </div>
            <p>{chat.body}</p>
        </div>
    )
}

export default Message
