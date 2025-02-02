import { redirect, Form } from "react-router-dom";

import axiosInstance from "../../utils/axiosInstance";

import Input from "../ui/inputs/Input";
import Button from "../ui/inputs/Button";
import PageLink from "../ui/PageLink";

export default function RegisterPanel() {
    return(
        <Form method="POST" className="flex flex-col gap-12 items-center">
            <p className="text-center text-3xl">Create an account</p>
            <div className="flex flex-col gap-2 w-2/3">
                <Input type="text" name="username" required text="Username" />
                <Input type="password" name="password" required text="Password" />
                <Input type="password" name="password-again" required text="Password again" />
            </div>
            <Button>Register</Button>
            <PageLink to={'/'}>You already have an account?</PageLink>
        </Form>
    );
}

export async function action({ request, params }) {
    const data = await request.formData();

    return axiosInstance.post("/register", { username: data.get('username'), password: data.get('password') })
    .then(response => {
        return redirect('/');
    })
    .catch(err => { 
        return Promise.resolve();
    })
}