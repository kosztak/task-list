import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [done, setDone] = useState();
    const [error, setError] = useState();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleRegister() {
        axios.post("/register", { username, password })
            .then(response => { setDone(response || 'done') })
            .catch(err => { setError(err || 'error') })
    }

    return(
        <>
            <h1>Register</h1> <br />
            <input type="text" value={username} onChange={handleUsernameChange} required placeholder="username" />
            <input type="password" value={password} onChange={handlePasswordChange} required placeholder="password" />
            <button onClick={handleRegister}>Register</button>
            <br />
            <Link to={'/'}>Login</Link>
            <br />
            {done && <p>done</p>}
            <br />
            {error && <p>error</p>}
        </>
    );
}