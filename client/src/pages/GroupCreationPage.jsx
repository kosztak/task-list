import { Form } from "react-router-dom";
import Input from "../components/ui/inputs/Input";
import Button from "../components/ui/inputs/Button";
import axiosInstance from "../utils/axiosInstance";

export default function GroupCreationPage() {
    return(
        <div className="bg-white rounded-lg p-4 flex flex-col items-stretch gap-16">
            <Form method="POST">
                <Input name="name" text="Name" type="text" required />
                <Input name="password" text="Password" type="password" required />
                <Input name="password-again" text="Password again" type="password" required />
                <Button>Create group</Button>
            </Form>
        </div>
    );
}

export async function action({ request, params }) {
    const data = await request.formData();

    return axiosInstance.post("/group/create", { name: data.get('name'), password: data.get('password') })
        .then(() => {

        })
        .catch(err => {
            return Promise.resolve();
        })
}