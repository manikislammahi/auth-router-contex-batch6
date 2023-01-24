import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contex/UserContex';

const Login = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    // const [email, setEmail] = useState('');

    const { logIn } = useContext(AuthContext);

    const handleLogin = (event) => {
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setPasswordError('');

        logIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                if (!user?.emailVerified) {
                    alert("Please verify your email before log in!");
                }
                else {
                    setSuccess(true);
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log("error message manik", errorMessage)
            });
    }

    // const handleForgetPassword = () => {
    //     if (!email) {
    //         alert("Please enter your password");
    //         return;
    //     }
    //     sendPasswordResetEmail(auth, email)
    //         .then(() => {
    //             alert('Password reset email sent! Please check your email')
    //         })
    //         .catch((error) => {
    //             const errorMessage = error.message;
    //             alert(errorMessage)
    //         });
    // }

    return (
        <div>
            <h1>Please Log in</h1>
            <form onSubmit={handleLogin}>
                <input type="email" name="email" id="" placeholder='your email' required />
                <br />
                <input type="password" name="password" id="" placeholder='pass' required />
                <br />
                <h3>{passwordError}</h3>
                {
                    success && <h3>Successfully loged in!</h3>
                }
                <button type="submit">Log in</button>
            </form>
            {
                success && <h1>Successfuly log in</h1>
            }
            <h4>New to this website? <Link to="/register">Register</Link></h4>

            {/* <p>Forget password? <button onClick={handleForgetPassword}>Reset password</button></p> */}
        </div>
    )
}

export default Login