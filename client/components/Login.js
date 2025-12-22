import indexStyles from '../styles/Index.module.css'

const Login = ({setGuest, setUser, showLogin, showRegister}) => {
    const handleGuestClick = () => {
        setGuest(true)
        setUser('Guest')
    }
    return (
        <div className={indexStyles['index-container']}>
            <i className="fas fa-comments" style={{fontSize: '5rem', color: 'navy', marginBottom: '20px'}}></i>
            <div className={indexStyles['welcome-buttons-container']}>
                <button onClick={handleGuestClick} className={indexStyles['welcome-btn']} style={{
                    padding: '18px 50px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    margin: '8px',
                    minWidth: '280px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}>
                    <i className="fas fa-user" style={{marginRight: '12px', fontSize: '14px'}}></i>
                    Continue as Guest
                </button>
                <div style={{display: 'flex', gap: '15px', width: '100%'}}>
                    <button onClick={showLogin} className={indexStyles['welcome-btn']} style={{
                        padding: '18px 0px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                        color: 'white',
                        fontWeight: '500',
                        letterSpacing: '0.5px',
                        width: '50%',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 4px 15px rgba(30, 60, 114, 0.3)'
                    }}>
                        <i className="fas fa-sign-in-alt" style={{marginRight: '12px', fontSize: '14px'}}></i>
                        Login
                    </button>
                    <button onClick={showRegister} className={indexStyles['welcome-btn']} style={{
                        padding: '18px 0px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white',
                        fontWeight: '500',
                        letterSpacing: '0.5px',
                        width: '50%',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)'
                    }}>
                        <i className="fas fa-user-plus" style={{marginRight: '12px', fontSize: '14px'}}></i>
                        Sign Up
                    </button>
                </div>
            </div>
      </div>
    )
}

export default Login
