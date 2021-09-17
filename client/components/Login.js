import indexStyles from '../styles/Index.module.css'

const Login = ({setGuest, setUser}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        setGuest(true)
        setUser(e.target.body.value)
    }
    return (
        <div className={indexStyles['index-container']}>
            <h1>ZOOM <i className="far fa-comment-dots"></i> SLACK</h1>
            <div className={indexStyles['index-form-container']}>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor=""></label>
                    <input type="text" name='body' placeholder='Enter a name...' />
                    <button type="submit">
                        <i className="far fa-paper-plane"></i>
                    </button>
                </form>
            </div>
      </div>
    )
}

export default Login
