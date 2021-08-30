import navStyle from '../styles/Nav.module.css'
import Link from 'next/link'

const Nav = ({user}) => {
    return (
        <nav className={navStyle.nav}>
            <div className={navStyle['nav-icon-container']}>
                <h1>ZOOM <i className="far fa-comment-dots"></i> SLACK</h1>
            </div>
            <ul>
                {user ?
                    <li>
                        <Link href='#'>{user}</Link>
                    </li>
                    :
                    null
                }
                <li>
                    <Link href='#'>Login</Link>
                </li>
                <li>
                    <Link href='#'>Signup</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
