import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../contex/UserContex'

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName);
    const photoURLRef = useRef(user?.photoURL);

    const handleSubmit = event => {
        event.preventDefault();
        // console.log(name);
        console.log("photo URL", photoURLRef.current.value);
    }

    const handleNameChange = event => {
        setName(event.target.value);
    }

    return (
        <div>
            <h1>This is your profile page</h1>
            <form onSubmit={handleSubmit}>
                <label>Your Name: </label>
                <input onChange={handleNameChange} defaultValue={name} type="text" name="" id="" placeholder='Your name' />
                <br />

                <label>Your photo URL: </label>
                <input ref={photoURLRef} defaultValue={user?.photoURL} type="text" name="" id="" placeholder='Your photo URL' />
                <br />

                <label>Your Email: </label>
                <input defaultValue={user?.email} type="email" name="email" placeholder='Your email address' readOnly />
                <br />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Profile