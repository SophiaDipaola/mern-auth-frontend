// Imports
import React, { useState } from 'react';
import axios from 'axios';
import jwt_decoded from 'jwt_decoded';
import { Redirect } from 'react-router-dom';
const { REACT_APP_SERVER_URL } = process.env;
import setAuthToken from '../utils/setAuthToken'

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {email, password}
    }
        axios.post(`${ REACT_APP_SERVER_URL }/users/login`, userData)
        .then(response => {
            const{ token } = response.data
            //save token in local storage
            localStorage.setItem('jwtToken', token)
            //set token to headers
            setAuthToken(token)
            //decode token to get the user data
            const decoded = jwt_decoded(token)
            //set the current user
            props.nowCurrentUser(decoded) //function passed down as props

        })
        .catch(error=> {
            console.log('===> Error logging in', error)
            alert('Either or password is incorrect. Please try again')
        
    })

return props.user ? <Redirect to="/profile" /> : <Redirect to="/login"/>

    return (
        <div className="row mt-4">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={handleEmail} className = "form-control"/>
                <label htmlFor="email">Password</label>
                <input type="password" name="password" value={password} onChange={handlePassword} className = "form-control"/>
            </form>
            <button type="submit" className="btn btn-primary float-right">Login</button>
        </div>
    )
}

export default Login;
