import { Form } from "react-router-dom";

import Input from "../components/ui/inputs/Input";
import Button from "../components/ui/inputs/Button";
import axiosInstance from "../utils/axiosInstance";

let globalFile;
export default function EditGroupInfoPage() {

    function handleFileChange(event) {
        globalFile = event.target.files[0];
    }

    return(
        <div className="bg-white rounded-lg p-4 flex flex-col items-stretch gap-8">
            <p className="text-center text-3xl font-bold">Edit group information</p>
            <Form method="POST" className="px-8 flex flex-col gap-4">
                <Input type="file" accept="image/*" onChange={handleFileChange} text="Group image" />
                <Input type="text" name="name" text="Group name" />
                <div className="flex justify-stretch gap-4">
                    <Input type="password" name="password" text="New password" />
                    <Input type="password" name="password-again" text="New password again" />
                </div>
                <Button>Save</Button>
            </Form>
        </div>
    )
}

export async function action({ request, params }) {
    const data = await request.formData();

    if(data.get('password') === data.get('password-again')) {
        if(globalFile) {
            data.append('image', globalFile);
        }

        const requestData = {
            groupId: params.groupId,
            ...(globalFile && { image: globalFile }),
            ...(data.get('name') !== '' && { name: data.get('name') }),
            ...(data.get('password') !== '' && { password: data.get('password') })
        }

        return axiosInstance.patch('/group/info', requestData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                return Promise.resolve();
            })
            .catch(err => {
                return Promise.resolve();
            })
    }

    return Promise.resolve();
        
}