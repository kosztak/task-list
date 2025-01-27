import { useState } from "react";

import axiosInstance from "../../utils/axiosInstance";
import Input from "../ui/Input";
import Button from "../ui/Button";
import PageLink from "../ui/PageLink";

export default function LoginPanel() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleLogin() {
        axiosInstance.post("/login", { username, password })
            .then(response => { console.log(response) })
            .catch(err => {  })
    }

    return(
        <div className="flex flex-col gap-4 items-center">
            <p className="text-center text-2xl">Login to your account</p>
            <div className="flex flex-col gap-1 w-2/3">
                <Input type="text" value={username} onChange={handleUsernameChange} required placeholder="username" />
                <Input type="password" value={password} onChange={handlePasswordChange} required placeholder="password" />
            </div>
            <Button onClick={handleLogin}>Login</Button>
            <PageLink to={'/register'}>You don't have an account yet?</PageLink>
        </div>
    );
}