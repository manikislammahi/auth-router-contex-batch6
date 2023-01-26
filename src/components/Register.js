import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contex/UserContex';

const Register = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const [accepted, setAccepted] = useState(false);

    console.log(accepted, "amn")

    const {
        createUser,
        signInWithGoogle,
        verifyEmail,
        updateUserProfile
    } = useContext(AuthContext);

    const handleRegister = (event) => {
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&*+]).{6,16}$/.test(password)) {
            setPasswordError("Please provide at least 6 character, one uppercase and lowercase latter, and one special character!");
            return;
        }

        setPasswordError('');

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);

                emailVerification();
                // যেহেতু ইউজার সাকসেস্ফুলি লগ ইন হয়ে গেছে তাই আমরা সমস্ত এরোর মুছে ফেলতে চাই তাই।
                setPasswordError('')
                form.reset();
                handleUpdateUserProfile(name, photoURL)
            })
            .catch(error => {
                console.log(error)
                setPasswordError(error.message)
            })
    }

    const emailVerification = () => {
        verifyEmail()
            .then(() => {
                alert("Please check your email and verify email address")
            });
    }

    const handleUpdateUserProfile = (name, photoURL) => {

        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        updateUserProfile(profile)
            .then(() => {
                alert("Display name updated")
            }).catch(error => {
                console.log(error)
            });
    }

    const googleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log(user)
            }).catch((error) => {
                console.error(error)
            });
    }

    const handleAccepted = event => {
        setAccepted(event.target.checked);
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" id="" placeholder='your name' />
                <br />
                <input type="url" name="photoURL" id="" />
                <br />
                <input type="email" name="email" id="" placeholder='your email' />
                <br />
                <input type="password" name="password" id="" placeholder='pass' />
                <br />
                <input onClick={handleAccepted} type="checkbox" name="" id="" />
                <label>Accept <Link to="/terms">Terms and conditions</Link></label>
                <br />
                <h3>{passwordError}</h3>
                {success && <h3>Successfully account created!</h3>}
                <button type="submit" disabled={!accepted}>Register</button>
            </form>
            <button onClick={googleLogin}>google sigin</button>
            <h4>Already have an account? <Link to="/login">Log in</Link></h4>
        </div>
    )
}

export default Register