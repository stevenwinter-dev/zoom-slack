import sidebarStyles from '../styles/Sidebar.module.css'

const Sidebar = ({setChannel}) => {
    const handleClick = (e) => {
        console.log(e.target.innerHTML)
        setChannel(e.target.innerHTML)
    }
    return (
        <div className={sidebarStyles.sidebar}>
            <ul>
                <li onClick={handleClick}>Channel 1</li>
                <li onClick={handleClick}>Channel 2</li>
                <li onClick={handleClick}>Channel 3</li>
                <li onClick={handleClick}>Channel 4</li>
            </ul>
        </div>
    )
}

export default Sidebar
