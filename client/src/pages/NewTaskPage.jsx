import { useState } from "react";
import { Form, redirect } from "react-router-dom";

import RadioButton from "../components/ui/RadioButton";
import DailyPanel from "../components/authenticated/new-task-panels/DailyPanel";
import TodoPanel from "../components/authenticated/new-task-panels/TodoPanel";
import Button from "../components/ui/inputs/Button";
import axiosInstance from "../utils/axiosInstance";

export default function NewTaskPage() {
    const [isDaily, setIsDaily] = useState(true);

    function handleTypeChange(event) {
        setIsDaily(event.target.value === "daily");
    }
    return(
        <Form method="POST" className="bg-white rounded-lg p-8 flex flex-col items-start gap-16">
            <div className="flex gap-4">
                <RadioButton text="Daily" type="radio" name="type" value="daily" onChange={handleTypeChange} defaultChecked />
                <RadioButton text="To-do" type="radio" name="type" value="todo" onChange={handleTypeChange} />
            </div>
            {isDaily ? <DailyPanel /> : <TodoPanel />}
            <Button type="submit">Create Task</Button>
        </Form>
    )
}

export async function action({ request, params }) {
    const data = await request.formData();
    const date = new Date(data.get('date')).toISOString().split('T')[0];

    const body = {
        name: data.get('name'),
        description: data.get('description'),
        date: date,
        period: data.get('period'),
        gap: data.get('gap')
    }

    return axiosInstance.post("/user/add-task", body)
        .then(response => {
            return redirect('/user/dailies');
        })
        .catch(err => {
            return Promise.resolve();
        })
}