import React, { useContext } from 'react'
import { AuthContext } from '../contex/UserContex'

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>Home for {user?.email}</div>
    )
}

export default Home