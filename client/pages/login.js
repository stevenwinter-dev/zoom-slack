import axios from 'axios'
import { useState } from 'react'
import styles from '../styles/Login.module.css'

const login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        // axios.post('http://localhost:3001/authentication/login', {
        axios.post('https://zoom-slack.herokuapp.com/authentication/login', {
            data: data
        })
    }
    if(!isAuthenticated) {
        return (
            <div className={styles['signup-container']}>
                <div >
                    <form action="" onSubmit={handleSubmit} className={styles['signup-form-container']}>
                        
                        <label>Email</label>
                        <input type="email" name="email" />
                        
                        <label>Password</label>
                        <input type="password" name="password" />
    
                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>
        )
    }

    if(isAuthenticated) {
        return (
            <div>hiii</div>
        )
    }
    
}

export default login
