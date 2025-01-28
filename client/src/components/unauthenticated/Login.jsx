import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../utils/axiosInstance";

import Input from "../ui/Input";
import Button from "../ui/Button";
import PageLink from "../ui/PageLink";

export default function LoginPanel() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }


    function handleLogin() {
        axiosInstance.post("/login", { username, password })
            .then(response => {
                navigate('/');
            })
            .catch(err => {  })
    }

    return(
        <div className="flex flex-col gap-8 items-center">
            <p className="text-center text-3xl">Login to your account</p>
            <div className="flex flex-col gap-2 w-2/3">
                <Input type="text" value={username} onChange={handleUsernameChange} required placeholder="Username" />
                <Input type="password" value={password} onChange={handlePasswordChange} required placeholder="Password" />
            </div>
            <Button onClick={handleLogin}>Login</Button>
            <PageLink to={'/auth/register'}>You don't have an account yet?</PageLink>
        </div>
    );
}