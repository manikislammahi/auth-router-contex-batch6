import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contex/UserContex';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading..</div>
    }

    // ইউজার, ইউজারের uid এবং ইউজারের ইমেইল আইডি ভেরিফাই হলে children এ ঢুকতে দিবো।
    // if (user && user?.uid && user?.emailVerified) {
    //     return children;
    // }

    // ইউজার এবং ইউজারে uid থাকলে children এ ঢুকতে দিবো।
    if (user && user?.uid) {
        return children;
    }
    return <Navigate to="/login"></Navigate>
}

export default PrivateRoutes;