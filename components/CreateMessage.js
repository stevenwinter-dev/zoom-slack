import CreateMessageStyles from '../styles/CreateMessage.module.css'

const CreateMessage = () => {
    return (
        <div className={CreateMessageStyles.['create-message-container']}>
            <form action="">
                <label htmlFor=""></label>
                <input type="text" placeholder='Type here...' />
                <button type="submit">
                    <i class="far fa-paper-plane"></i>
                </button>
            </form>
        </div>
    )
}

export default CreateMessage
