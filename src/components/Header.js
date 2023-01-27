import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contex/UserContex';
import avator from '../assets/user-icon.svg';

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

            <Link to='/profile'>
                {user?.photoURL ?
                    <img width={45} src={user?.photoURL} alt="user profile" />
                    :
                    <img width={45} src={avator} alt='User Avator'></img>
                }
            </Link>

            {user?.email && <span>Welcome, {user.email}</span>}
            {
                user?.email ? <button onClick={handleLogOut}>Log out</button> : <Link to="/login"></Link>
            }
        </div>
    )
}

export default Header