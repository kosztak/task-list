import { Form, useLoaderData, useNavigate, redirect } from "react-router-dom";

import Button from "../components/ui/inputs/Button";
import Input from "../components/ui/inputs/Input";
import TextArea from "../components/ui/inputs/TextArea";
import DatePicker from "../components/ui/inputs/DatePicker";

import axiosInstance from "../utils/axiosInstance";

export default function EditTodoPage() {
    const navigate = useNavigate();
    const todo = useLoaderData();

    function handleTaskDelete() {
        axiosInstance.post("/user/delete-todo", { taskId: todo._id })
            .then(result => {
                navigate("/user/todos");
            })
            .catch(err=> {
                console.log(err);
                
                return Promise.resolve();
            })
    }

    return(
        <div className="bg-white rounded-lg p-8 flex flex-col items-start gap-8">
            <p className="text-gray-900 text-2xl font-bold">Editing: {todo.name}</p>
            <Form method="POST"  className="flex flex-col items-start gap-16" >
                <input type="text" name="taskId" hidden defaultValue={todo._id}/>
                <div className="grid grid-cols-[1fr_1fr] gap-4" style={{ gridTemplateAreas: `"name description" "date description"` }}>
                    <Input type="text" name="name" text="Task Name" style={{ gridArea: "name" }} defaultValue={todo.name} />
                    <TextArea text="Task Description" name="description" style={{ gridArea: "description" }} defaultValue={todo.description} />
                    <DatePicker text="Due Date" name="date" style={{ gridArea: "date" }} defaultValue={todo.date} />
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
        .then(todo => {
            return todo.data;
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
        .then(todo => {
            todo = todo.data;

            const responseData = {
                _id: todo._id,
                ...(todo.name !== data.get('name') && {name: data.get('name')}),
                ...(todo.description !== data.get('description') && {description: data.get('description')}),
                ...(todo.date.split('T')[0] !== data.get('date') && {date: data.get('date')}),
            }
        
            return axiosInstance.patch('/task/todo', responseData)
        })
        .then(() => {
            return redirect('');
        })
        .catch(err => {
            console.log(err);
            
            return Promise.resolve();
        })
}