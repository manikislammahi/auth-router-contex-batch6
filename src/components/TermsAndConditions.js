import React from 'react'
import { Link } from 'react-router-dom'

const TermsAndConditions = () => {
    return (
        <div>
            <h3>Here is our treams and conditions</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias deserunt facilis quia ipsam illo, distinctio consequuntur aperiam voluptatibus nobis quasi voluptas iure esse eius ab dicta necessitatibus, vel unde fugiat!</p>
            <p>Go back to: <Link to="/register">Register</Link></p>
        </div>
    )
}

export default TermsAndConditions