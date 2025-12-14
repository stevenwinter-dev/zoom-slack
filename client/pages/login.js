import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css'
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        try {
            const response = await axios.post(`${API_URL}/authentication/login`, {
                data: data
            });
            setIsAuthenticated(true);
            router.push('/');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
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

export default Login
