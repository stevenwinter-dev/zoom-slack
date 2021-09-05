import styles from '../styles/Signup.module.css'
import axios from 'axios'

const signup = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('form submit')
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.confirmPassword.value,
        }
        axios.post('http://localhost:3001/user/signup', {
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

                    <button type='submit'>Signup</button>
                </form>
            </div>
        </div>
    )
}

export default signup
