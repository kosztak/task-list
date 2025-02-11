import { Form, useLoaderData, useNavigate, redirect } from "react-router-dom";

import Button from "../components/ui/inputs/Button";
import Input from "../components/ui/inputs/Input";
import Option from "../components/ui/inputs/select/Option";
import Select from "../components/ui/inputs/select/Select";
import TextArea from "../components/ui/inputs/TextArea";
import DatePicker from "../components/ui/inputs/DatePicker";

import axiosInstance from "../utils/axiosInstance";

export default function EditTaskPage() {
    const navigate = useNavigate();
    const task = useLoaderData();
    const isDaily = (task.renewel !== undefined);

    function handleTaskDelete() {
        axiosInstance.delete(`/user/task?taskId=${task._id}&isDaily=${isDaily}`)
            .then(result => {
                navigate(`/user/${isDaily? "dailies" : "todos"}`);
            })
            .catch(err=> {
                console.log(err);
                
                return Promise.resolve();
            })
    }

    return(
        <div className="bg-white rounded-lg p-8 flex flex-col items-start gap-8">
            <p className="text-gray-900 text-2xl font-bold">Editing: {task.name}</p>
            <Form method="POST"  className="flex flex-col items-start gap-16" >
                <input type="text" name="taskId" hidden defaultValue={task._id}/>
                <div className="grid grid-cols-[1fr_1fr] gap-4" style={{ gridTemplateAreas: `"name description" "period description" "date gap"` }}>
                    <Input type="text" name="name" text="Task Name" style={{ gridArea: "name" }} defaultValue={task.name} />
                    <TextArea text="Task Description" name="description" style={{ gridArea: "description" }} defaultValue={{value: task.description}} />
                    {isDaily && <Select text="Period" name="period" style={{ gridArea: "period" }} defaultValue={task.renewel.period}>
                        <Option value="day">Day</Option>
                        <Option value="week">Week</Option>
                        <Option value="month">Month</Option>
                    </Select>}
                    <DatePicker text="Start Date" name="date" style={{ gridArea: "date" }} defaultValue={task.date} />
                    {isDaily && <Input text="Every" type="number" name="gap" min="1" defaultValue={task.renewel.gap} style={{ gridArea: "gap" }} />}
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
        .then(task => {
            return task.data;
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
        .then(task => {
            task = task.data;

            const responseData = {
                _id: task._id,
                ...(task.name !== data.get('name') && {name: data.get('name')}),
                ...(task.description !== data.get('description') && {description: data.get('description')}),
                ...(task.date.split('T')[0] !== data.get('date') && {date: data.get('date')})
            }

            if(task.renewel) {
                responseData = {
                    ...responseData,
                    ...((task.renewel.period !== data.get('period')) && {"renewel.period": data.get('period')}),
                    ...((task.renewel.gap !== parseInt(data.get('gap'))) && {"renewel.gap": data.get('gap')})
                }
            }
        
            return axiosInstance.patch('/task', responseData)
        })
        .then(() => {
            return redirect('');
        })
        .catch(err => {
            console.log(err);
            
            return Promise.resolve();
        })
}