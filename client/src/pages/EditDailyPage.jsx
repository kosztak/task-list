import { Form, useLoaderData, useNavigate, redirect } from "react-router-dom";

import Button from "../components/ui/inputs/Button";
import Input from "../components/ui/inputs/Input";
import Option from "../components/ui/inputs/select/Option";
import Select from "../components/ui/inputs/select/Select";
import TextArea from "../components/ui/inputs/TextArea";
import DatePicker from "../components/ui/inputs/DatePicker";

import axiosInstance from "../utils/axiosInstance";

export default function EditDailyPage() {
    const navigate = useNavigate();
    const daily = useLoaderData();

    function handleTaskDelete() {
        axiosInstance.post("/user/delete-daily", { taskId: daily._id })
            .then(result => {
                navigate("/user/dailies");
            })
            .catch(err=> {
                console.log(err);
                
                return Promise.resolve();
            })
    }

    return(
        <div className="bg-white rounded-lg p-8 flex flex-col items-start gap-8">
            <p className="text-gray-900 text-2xl font-bold">Editing: {daily.name}</p>
            <Form method="POST"  className="flex flex-col items-start gap-16" >
                <input type="text" name="taskId" hidden defaultValue={daily._id}/>
                <div className="grid grid-cols-[1fr_1fr] gap-4" style={{ gridTemplateAreas: `"name description" "period description" "date gap"` }}>
                    <Input type="text" name="name" text="Task Name" style={{ gridArea: "name" }} defaultValue={daily.name} />
                    <TextArea text="Task Description" name="description" style={{ gridArea: "description" }} defaultValue={daily.description} />
                    <Select text="Period" name="period" style={{ gridArea: "period" }}>
                        <Option value="day" selected={daily.renewel.period === 'day'}>Day</Option>
                        <Option value="week" selected={daily.renewel.period === 'week'}>Week</Option>
                        <Option value="month" selected={daily.renewel.period === 'month'}>Month</Option>
                    </Select>
                    <DatePicker text="Start Date" name="date" style={{ gridArea: "date" }} defaultValue={daily.date} />
                    <Input text="Every" type="number" name="gap" min="1" defaultValue={daily.renewel.gap} style={{ gridArea: "gap" }} />
                </div>
                <div className="flex gap-4">
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={handleTaskDelete}>Delete</Button>
                </div>
            </Form>
        </div>
    )
}

export async function loader({ request, params }) {
    return axiosInstance.get(`/task/user-data?taskId=${params.taskId}`)
        .then(daily => {
            return daily.data;
        })
        .catch(err => {
            console.log(err);
            
            return Promise.resolve();
        })
}

export async function action({ request, params }) {
    const data = await request.formData();
    const taskId = data.get('taskId');
    return axiosInstance.get(`/task/user-data?taskId=${taskId}`)
        .then(daily => {
            daily = daily.data;

            const responseData = {
                _id: daily._id,
                ...(daily.name !== data.get('name') && {name: data.get('name')}),
                ...(daily.description !== data.get('description') && {description: data.get('description')}),
                ...(daily.date.split('T')[0] !== data.get('date') && {date: data.get('date')}),
                ...((daily.renewel.period !== data.get('period')) && {"renewel.period": data.get('period')}),
                ...((daily.renewel.gap !== parseInt(data.get('gap'))) && {"renewel.gap": data.get('gap')})
            }
        
            return axiosInstance.patch('/task/daily', responseData)
        })
        .then(() => {
            return redirect('');
        })
        .catch(err => {
            console.log(err);
            
            return Promise.resolve();
        })
}