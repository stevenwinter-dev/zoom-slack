import styles from '../styles/Signup.module.css'
import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const signup = () => {
    
    const handleSubmit = (e) => {
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            avatar: e.target.avatar.value
        }
        axios.post(`${API_URL}/authentication/register`, {
            data: data
        })
    }

    return (
        <div className={styles['signup-container']}>
            <div >
                <form action="" onSubmit={handleSubmit} className={styles['signup-form-container']}>
                    <label>Name</label>
                    <input type="name" name="name" />
                    
                    <label>Email</label>
                    <input type="email" name="email" />
                    
                    <label>Password</label>
                    <input type="password" name="password" />
                    
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" />
                    
                    <label>Avatar</label>
                    <input type="url" name="avatar" />

                    <button type='submit'>Signup</button>
                </form>
            </div>
        </div>
    )
}

export default signup
