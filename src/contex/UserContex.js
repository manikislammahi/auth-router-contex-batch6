import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const UserContex = ({ children }) => {
    const [user, setUser] = useState({ displayName: "Manik" });
    // this is use for directly login by google
    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }


    const logOut = () => {
        return signOut(auth);
    }

    // user যেখান থেকেই লগইন করুন না কেনো তার ইনফরমেশন ধরে রাখার জন্য বা পাওয়ার জন্য।
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('auth state change', currentUser)
        })

        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = { user, createUser, logIn, logOut, signInWithGoogle };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default UserContex