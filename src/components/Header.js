import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contex/UserContex'

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user?.displayName)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <div>
                <img width={60} src={user?.photoURL} alt="user profile" />
            </div>
            {user?.email && <span>Welcome, {user.email}</span>}
            {
                user?.email ? <button onClick={handleLogOut}>Log out</button> : <Link to="/login"></Link>
            }
        </div>
    )
}

export default Header