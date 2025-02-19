import { redirect, Form } from "react-router-dom";
import { useEffect, useRef } from "react";

import axiosInstance from "../../utils/axiosInstance";

import Input from "../ui/inputs/Input";
import Button from "../ui/inputs/Button";
import PageLink from "../ui/PageLink";
import Alert from "../ui/Alert";

let alert;

export default function RegisterPanel() {
    const alertRef = useRef();
    
        useEffect(() => {
            alert = alertRef.current;        
        }, [alertRef])

    return(
        <Form method="POST" className="flex flex-col gap-12 items-center">
            <p className="text-center text-3xl">Create an account</p>
            <div className="flex flex-col gap-2 w-2/3">
                <Alert ref={alertRef} />
                <Input type="text" name="username" required text="Username" />
                <Input type="password" name="password" required text="Password" />
                <Input type="password" name="password-again" required text="Password again" />
            </div>
            <Button>Register</Button>
            <PageLink to={'/'}>You already have an account?</PageLink>
        </Form>
    );
}

export async function action({ request, params }) { // registers a new user
    const data = await request.formData();

    if(data.get('password') !== data.get('password-again')) { // check the given passwords 
        alert.show("The given passwords don't match!");

        return Promise.resolve();
    }

    return axiosInstance.post("/register", { username: data.get('username'), password: data.get('password') })
    .then(response => {
        return redirect('/');
    })
    .catch(err => {
        alert.show(err.response.data.message);

        return Promise.resolve();
    })
}