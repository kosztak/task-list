import { Form, redirect } from "react-router-dom";
import { useEffect, useRef } from "react";

import axiosInstance from "../utils/axiosInstance";

import Input from "../components/ui/inputs/Input";
import Button from "../components/ui/inputs/Button";
import Alert from "../components/ui/Alert";

let alert;

export default function GroupJoinPage() {
    const alertRef = useRef();
    
    useEffect(() => {
        alert = alertRef.current;        
    }, [alertRef])

    return(
        <div className="bg-white rounded-lg p-4 flex flex-col items-stretch gap-8">
            <p className="text-xl font-bold">Join a group</p>
            <Form method="POST" className="flex flex-col gap-4">
                <Alert ref={alertRef} />
                <Input name="name" type="text" text="Group name" required />
                <Input name="password" type="password" text="Password" required />
                <Button>Join group</Button>
            </Form>
        </div>
    )
}

export async function action({ request, params }) {
    const data = await request.formData();

    return axiosInstance.post("user/join-group", { name: data.get('name'), password: data.get('password') })
        .then(response => {
            return redirect(`/group/${response.data.groupId}`);
        })
        .catch(err =>{
            alert.show(err.response.data.message);
            
            return Promise.resolve();
        })
}