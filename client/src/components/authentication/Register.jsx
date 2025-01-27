import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import PageLink from "../ui/PageLink";

export default function RegisterPanel() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleRegister() {
        axios.post("/register", { username, password })
            .then(response => {  })
            .catch(err => {  })
    }

    return(
        <div className="flex flex-col gap-4 items-center">
            <p className="text-center text-2xl">Create an account</p>
            <div className="flex flex-col gap-1 w-2/3">
                <Input type="text" value={username} onChange={handleUsernameChange} required placeholder="username" />
                <Input type="password" value={password} onChange={handlePasswordChange} required placeholder="password" />
            </div>
            <Button onClick={handleRegister}>Register</Button>
            <PageLink to={'/'}>You already have an account?</PageLink>
        </div>
    );
}