import axios from 'axios'
import styles from '../styles/Login.module.css'

const login = () => {

    const handleSubmit = (e) => {
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        axios.post('http://localhost:3001/authentication/login', {
            data: data
        })
    }

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

export default login
