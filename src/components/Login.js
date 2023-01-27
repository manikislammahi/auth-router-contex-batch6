import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contex/UserContex';

const Login = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const { logIn, setLoading, forgetPassword } = useContext(AuthContext);

    console.log("firebase hot email", email);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (event) => {
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        // const email = form.email.value;
        const password = form.password.value;

        setPasswordError('');

        logIn(email, password)
            .then(result => {
                const user = result.user;
                console.log("successfully loged in", user);
                // যেহেতু ইউজার সাকসেস্ফুলি লগ ইন হয়ে গেছে তাই আমরা সমস্ত এরোর মুছে ফেলতে চাই তাই।
                setPasswordError('');
                form.reset();
                setLoading(false);
                console.log("Is user email address verify", user?.emailVerified);

                if (user?.emailVerified) {
                    setSuccess(true);
                    navigate(from, { replace: true });
                }
                else {
                    toast.error("Your email is not verified. Please verify you email address.");
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                setPasswordError(errorMessage);
                toast.error("Please provide a valied email and password.")
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleForgetPassword = () => {
        if (!email) {
            toast.error("Please enter your email before click me.");
            return;
        }
        forgetPassword(email)
            .then(() => {
                toast.success('Password reset email sent. Please check your email.')
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            });
    }

    return (
        <div>
            <h1>Please Log in</h1>
            <form onSubmit={handleLogin}>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="" placeholder='your email' required />
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

            <p>Forget password? <button onClick={handleForgetPassword}>Reset password</button></p>
        </div>
    )
}

export default Login