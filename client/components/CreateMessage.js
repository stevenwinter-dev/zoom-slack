import { useEffect, useRef } from 'react'
import CreateMessageStyles from '../styles/CreateMessage.module.css'

const CreateMessage = ({handleSubmit, text}) => {
    return (
        <div className={CreateMessageStyles['create-message-container']}>
            <form action="" onSubmit={handleSubmit} onChange={text} autoComplete='off'>
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
