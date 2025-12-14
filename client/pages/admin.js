import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/Admin.module.css'
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Admin = () => {
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [activeTab, setActiveTab] = useState('users')
    const [editingUser, setEditingUser] = useState(null)
    const [editingMessage, setEditingMessage] = useState(null)
    const [newUser, setNewUser] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        user_avatar: ''
    })
    const [newMessage, setNewMessage] = useState({
        user_id: '',
        body: '',
        channel: '',
        date: '',
        time: ''
    })

    useEffect(() => {
        fetchUsers()
        fetchMessages()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/users`)
            setUsers(response.data)
        } catch (err) {
            console.error('Error fetching users:', err)
        }
    }

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${API_URL}/messages`)
            setMessages(response.data)
        } catch (err) {
            console.error('Error fetching messages:', err)
        }
    }

    // User CRUD operations
    const handleCreateUser = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${API_URL}/admin/users`, newUser)
            fetchUsers()
            setNewUser({ user_name: '', user_email: '', user_password: '', user_avatar: '' })
        } catch (err) {
            console.error('Error creating user:', err)
        }
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${API_URL}/admin/users/${editingUser.user_id}`, editingUser)
            fetchUsers()
            setEditingUser(null)
        } catch (err) {
            console.error('Error updating user:', err)
        }
    }

    const handleDeleteUser = async (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${API_URL}/admin/users/${userId}`)
                fetchUsers()
            } catch (err) {
                console.error('Error deleting user:', err)
            }
        }
    }

    // Message CRUD operations
    const handleCreateMessage = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${API_URL}/messages`, { data: newMessage })
            fetchMessages()
            setNewMessage({ user_id: '', body: '', channel: '', date: '', time: '' })
        } catch (err) {
            console.error('Error creating message:', err)
        }
    }

    const handleUpdateMessage = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${API_URL}/admin/messages/${editingMessage.message_id}`, editingMessage)
            fetchMessages()
            setEditingMessage(null)
        } catch (err) {
            console.error('Error updating message:', err)
        }
    }

    const handleDeleteMessage = async (messageId) => {
        if (confirm('Are you sure you want to delete this message?')) {
            try {
                await axios.delete(`${API_URL}/admin/messages/${messageId}`)
                fetchMessages()
            } catch (err) {
                console.error('Error deleting message:', err)
            }
        }
    }

    return (
        <div className={styles.container}>
            <h1>Admin Dashboard</h1>
            
            <div className={styles.tabs}>
                <button 
                    className={activeTab === 'users' ? styles.activeTab : ''} 
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button 
                    className={activeTab === 'messages' ? styles.activeTab : ''} 
                    onClick={() => setActiveTab('messages')}
                >
                    Messages
                </button>
            </div>

            {activeTab === 'users' && (
                <div className={styles.section}>
                    <h2>Users Management</h2>
                    
                    {/* Create User Form */}
                    <div className={styles.formContainer}>
                        <h3>Create New User</h3>
                        <form onSubmit={handleCreateUser} className={styles.form}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={newUser.user_name}
                                onChange={(e) => setNewUser({...newUser, user_name: e.target.value})}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.user_email}
                                onChange={(e) => setNewUser({...newUser, user_email: e.target.value})}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={newUser.user_password}
                                onChange={(e) => setNewUser({...newUser, user_password: e.target.value})}
                                required
                            />
                            <input
                                type="url"
                                placeholder="Avatar URL"
                                value={newUser.user_avatar}
                                onChange={(e) => setNewUser({...newUser, user_avatar: e.target.value})}
                            />
                            <button type="submit">Create User</button>
                        </form>
                    </div>

                    {/* Edit User Form */}
                    {editingUser && (
                        <div className={styles.formContainer}>
                            <h3>Edit User</h3>
                            <form onSubmit={handleUpdateUser} className={styles.form}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={editingUser.user_name}
                                    onChange={(e) => setEditingUser({...editingUser, user_name: e.target.value})}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={editingUser.user_email}
                                    onChange={(e) => setEditingUser({...editingUser, user_email: e.target.value})}
                                    required
                                />
                                <input
                                    type="url"
                                    placeholder="Avatar URL"
                                    value={editingUser.user_avatar || ''}
                                    onChange={(e) => setEditingUser({...editingUser, user_avatar: e.target.value})}
                                />
                                <div className={styles.formButtons}>
                                    <button type="submit">Update User</button>
                                    <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Users List */}
                    <div className={styles.listContainer}>
                        <h3>All Users</h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Avatar</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.user_id}>
                                        <td>{user.user_id}</td>
                                        <td>{user.user_name}</td>
                                        <td>{user.user_email}</td>
                                        <td>{user.user_avatar ? '✓' : '-'}</td>
                                        <td>
                                            <button onClick={() => setEditingUser(user)}>Edit</button>
                                            <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'messages' && (
                <div className={styles.section}>
                    <h2>Messages Management</h2>
                    
                    {/* Create Message Form */}
                    <div className={styles.formContainer}>
                        <h3>Create New Message</h3>
                        <form onSubmit={handleCreateMessage} className={styles.form}>
                            <input
                                type="number"
                                placeholder="User ID"
                                value={newMessage.user_id}
                                onChange={(e) => setNewMessage({...newMessage, user_id: e.target.value})}
                                required
                            />
                            <textarea
                                placeholder="Message Body"
                                value={newMessage.body}
                                onChange={(e) => setNewMessage({...newMessage, body: e.target.value})}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Channel"
                                value={newMessage.channel}
                                onChange={(e) => setNewMessage({...newMessage, channel: e.target.value})}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Date (MM/DD/YYYY)"
                                value={newMessage.date}
                                onChange={(e) => setNewMessage({...newMessage, date: e.target.value})}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Time (HH:MM:SS)"
                                value={newMessage.time}
                                onChange={(e) => setNewMessage({...newMessage, time: e.target.value})}
                                required
                            />
                            <button type="submit">Create Message</button>
                        </form>
                    </div>

                    {/* Edit Message Form */}
                    {editingMessage && (
                        <div className={styles.formContainer}>
                            <h3>Edit Message</h3>
                            <form onSubmit={handleUpdateMessage} className={styles.form}>
                                <textarea
                                    placeholder="Message Body"
                                    value={editingMessage.body}
                                    onChange={(e) => setEditingMessage({...editingMessage, body: e.target.value})}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Channel"
                                    value={editingMessage.channel}
                                    onChange={(e) => setEditingMessage({...editingMessage, channel: e.target.value})}
                                    required
                                />
                                <div className={styles.formButtons}>
                                    <button type="submit">Update Message</button>
                                    <button type="button" onClick={() => setEditingMessage(null)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Messages List */}
                    <div className={styles.listContainer}>
                        <h3>All Messages</h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User ID</th>
                                    <th>Body</th>
                                    <th>Channel</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map(message => (
                                    <tr key={message.message_id}>
                                        <td>{message.message_id}</td>
                                        <td>{message.user_id}</td>
                                        <td>{message.body?.substring(0, 50)}...</td>
                                        <td>{message.channel}</td>
                                        <td>{message.date}</td>
                                        <td>{message.time}</td>
                                        <td>
                                            <button onClick={() => setEditingMessage(message)}>Edit</button>
                                            <button onClick={() => handleDeleteMessage(message.message_id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Admin
