import { Form } from "react-router-dom";
import Input from "../components/ui/inputs/Input";
import Button from "../components/ui/inputs/Button";
import axiosInstance from "../utils/axiosInstance";

export default function GroupJoinPage() {
    return(
        <div className="bg-white rounded-lg p-4 flex flex-col items-stretch">
            <Form method="POST">
                <Input name="name" type="text" text="Group name" required />
                <Input name="password" type="password" text="Password" required />
                <Button>join</Button>
            </Form>
        </div>
    )
}

export async function action({ request, params }) {
    const data = await request.formData();

    return axiosInstance.post("user/join-group", { name: data.get('name'), password: data.get('password') })
        .then(() => {
            
        })
        .catch(err =>{
            console.log(err);
            
            return Promise.resolve();
        })
}