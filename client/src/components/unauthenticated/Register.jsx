import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../utils/axiosInstance";

import Input from "../ui/inputs/Input";
import Button from "../ui/inputs/Button";
import PageLink from "../ui/PageLink";

export default function RegisterPanel() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handlePasswordAgainChange(event) {
        setPasswordAgain(event.target.value);
    }

    function handleRegister() {
        axiosInstance.post("/register", { username, password })
            .then(response => {
                navigate('/auth');
            })
            .catch(err => {  })
    }

    return(
        <div className="flex flex-col gap-4 items-center">
            <p className="text-center text-3xl">Create an account</p>
            <div className="flex flex-col gap-2 w-2/3">
                <Input type="text" value={username} onChange={handleUsernameChange} required placeholder="Username" />
                <Input type="password" value={password} onChange={handlePasswordChange} required placeholder="Password" />
                <Input type="password" value={passwordAgain} onChange={handlePasswordAgainChange} required placeholder="Password again" />
            </div>
            <Button onClick={handleRegister}>Register</Button>
            <PageLink to={'/auth'}>You already have an account?</PageLink>
        </div>
    );
}