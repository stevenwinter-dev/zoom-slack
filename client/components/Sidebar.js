import sidebarStyles from '../styles/Sidebar.module.css'
import { useState } from 'react'

const Sidebar = ({setChannel, setPreviousChannel, channel}) => {
    const handleClick = (e) => {
        setPreviousChannel(channel)
        setChannel(e.target.innerHTML)
    }
    return (
        <div className={sidebarStyles.sidebar}>
            <ul>
                <li onClick={handleClick}>Channel 1</li>
                <li onClick={handleClick}>Channel 2</li>
                <li onClick={handleClick}>Channel 3</li>
                <li onClick={handleClick}>Channel 4</li>
                <li onClick={handleClick}>Video</li>
            </ul>
        </div>
    )
}

export default Sidebar
