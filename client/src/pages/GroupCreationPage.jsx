import { Form, redirect } from "react-router-dom";
import { useEffect, useRef } from "react";

import axiosInstance from "../utils/axiosInstance";

import Input from "../components/ui/inputs/Input";
import Button from "../components/ui/inputs/Button";
import Alert from "../components/ui/Alert";

let alert;

export default function GroupCreationPage() {
    const alertRef = useRef();

    useEffect(() => {
        alert = alertRef.current;        
    }, [alertRef])

    return(
        <div className="bg-white rounded-lg p-4 flex flex-col items-stretch gap-4">
            <Alert ref={alertRef} />
            <Form method="POST">
                <Input name="name" text="Name" type="text" required />
                <Input name="password" text="Password" type="password" required />
                <Input name="password-again" text="Password again" type="password" required />
                <Button>Create group</Button>
            </Form>
        </div>
    );
}

export async function loader({ request, params }) {
    return axiosInstance.get("/user/has-group")
        .then(() => {
            return Promise.resolve();
        })
        .catch(err => {
            console.log(err);
            
            return redirect("/group");
        })
}

export async function action({ request, params }) {
    const data = await request.formData();

    if(data.get('password') !== data.get('password-again')) {
        alert.show("The given passwords don't match!");

        return Promise.resolve();
    }

    return axiosInstance.post("/group/create", { name: data.get('name'), password: data.get('password') })
        .then(() => {

        })
        .catch(err => {
            alert.show(err.response.data.message);
            
            return Promise.resolve();
        })
}