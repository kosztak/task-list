import { useState } from "react";
import { Link } from "react-router-dom";

import axiosInstance from "../../utils/axiosInstance";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleLogin() {
        axiosInstance.post("/login", { username, password })
            .then(response => { console.log(response) })
            .catch(err => { setError(err || 'error') })
    }

    return(
        <>
            <h1>Login</h1> <br />
            <input type="text" value={username} onChange={handleUsernameChange} required placeholder="username" />
            <input type="password" value={password} onChange={handlePasswordChange} required placeholder="password" />
            <button onClick={handleLogin}>Login</button>
            <br />
            <Link to={'/register'}>Register</Link>
            <br />
            {error && <p>error</p>}
        </>
    );
}