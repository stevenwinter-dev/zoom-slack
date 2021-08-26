import chatContainerStyles from '../styles/ChatContainer.module.css'
import CreateMessage from './CreateMessage'
import Message from './Message'

const ChatContainer = () => {
    return (
        <div className={chatContainerStyles.chatcontainer}>
            <h2>I'm a chat container</h2>
            <div className={chatContainerStyles['chatcontainer-messages']}>
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
            <CreateMessage />
        </div>
    )
}

export default ChatContainer
