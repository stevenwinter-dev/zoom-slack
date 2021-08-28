import { useEffect, useRef } from 'react'
import CreateMessageStyles from '../styles/CreateMessage.module.css'

const CreateMessage = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const currentDate = new Date()
        const currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
        const newMessage = {
            name: "Steven",
            body: e.target.body.value,
            date: currentDate.toLocaleDateString(),
            time: currentTime
        }
        console.log('submitted', newMessage)
        e.target.body.value = ''
    }
    return (
        <div className={CreateMessageStyles.['create-message-container']}>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor=""></label>
                <input type="text" name='body' placeholder='Type here...' />
                <button type="submit">
                    <i className="far fa-paper-plane"></i>
                </button>
            </form>
        </div>
    )
}

export default CreateMessage
