import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contex/UserContex';

// PrivateRoutes না দিয়ে PrivateRoute লেখা উচিৎ ছিলো।
const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div>Loading..</div>
    }

    // লাইন নাম্বার ১৬ - ২০ এর যে কাজ, লাইন নাম্বার ২৯ - ৩৩ এর একই কাজ।
    if (!user || !user?.emailVerified) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }

    return children;


    // ইউজার এবং ইউজারে uid থাকলে children এ ঢুকতে দিবো। ইমেইল ভেরিফিকেশনের প্রয়োজন না থাকলে ----
    // if (user && user?.uid) {
    //     return children;
    // }

    // user, user?.uid এবং user?.emailVerified হলে children এ ঢুকতে দিবো।
    // if (user && user?.uid && user?.emailVerified) {
    //     return children;
    // }

    // return <Navigate to="/login"></Navigate>
}

export default PrivateRoutes;