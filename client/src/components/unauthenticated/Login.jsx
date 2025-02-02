import { useState } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";

import axiosInstance from "../../utils/axiosInstance";

import Input from "../ui/inputs/Input";
import Button from "../ui/inputs/Button";
import PageLink from "../ui/PageLink";

export default function LoginPanel() {
    return(
        <Form method="POST" className="flex flex-col gap-12 items-center">
            <p className="text-center text-3xl">Login to your account</p>
            <div className="flex flex-col gap-2 w-2/3">
                <Input type="text" name="username" required text="Username" />
                <Input type="password" name="password" required text="Password" />
            </div>
            <Button>Login</Button>
            <PageLink to={'/register'}>You don't have an account yet?</PageLink>
        </Form>
    );
}

export async function action({ request, params }) {
    const data = await request.formData();

    return axiosInstance.post("/login", { username: data.get('username'), password: data.get('password') })
    .then(response => {
        return redirect('/user');
    })
    .catch(err => {
        return Promise.resolve();
    })
}