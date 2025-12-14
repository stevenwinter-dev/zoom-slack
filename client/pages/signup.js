import styles from '../styles/Signup.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const signup = () => {
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            avatar: e.target.avatar.value
        }
        try {
            await axios.post(`${API_URL}/authentication/register`, {
                data: data
            });
            router.push('/');
        } catch (err) {
            console.error('Signup failed:', err);
            alert('Signup failed. Please try again.');
        }
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
