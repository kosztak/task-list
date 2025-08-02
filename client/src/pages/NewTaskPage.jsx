import { useEffect, useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";

import RadioButton from "components/ui/inputs/RadioButton";
import DailyPanel from "components/authenticated/new-task-panels/DailyPanel";
import TodoPanel from "components/authenticated/new-task-panels/TodoPanel";
import Button from "components/ui/inputs/Button";
import axiosInstance from "utils/axiosInstance";
import Checkbox from "components/ui/inputs/Checkbox";

let globalIsDaily;
let globalIsGroupTask;

// With this component users can create own tasks or group tasks, depends on which route the component is shown on.
export default function NewTaskPage({ isGroupTask }) {
    const members = useLoaderData()
    const [isDaily, setIsDaily] = useState(true);

    useEffect(() => {
        globalIsDaily = isDaily;
    }, [isDaily])

    useEffect(() => {
        globalIsGroupTask = isGroupTask;
    }, [isGroupTask])

    function handleTypeChange(event) { // changes between daily and to-do related input panels
        setIsDaily(event.target.value === "daily");
    }

    return(
        <Form method="POST" className="bg-white rounded-lg p-16 flex flex-col items-stretch gap-16">
            <p className="text-dark text-2xl font-bold">Create new task</p>
            <div className="flex gap-4">
                <RadioButton text="Daily" type="radio" name="type" value="daily" onChange={handleTypeChange} defaultChecked />
                <RadioButton text="To-do" type="radio" name="type" value="todo" onChange={handleTypeChange} />
            </div>
            {isDaily ? <DailyPanel /> : <TodoPanel />}
            {isGroupTask &&
                <>
                    <div>
                        <p className="text-lg font-bold text-dark text-center mb-4">Difficulty</p>
                        <div className="flex justify-evenly border-2 border-dark p-2 rounded">
                            <RadioButton text="Trivial" type="radio" name="difficulty" value="trivial" defaultChecked />
                            <RadioButton text="Easy" type="radio" name="difficulty" value="easy" />
                            <RadioButton text="Medium" type="radio" name="difficulty" value="medium" />
                            <RadioButton text="Hard" type="radio" name="difficulty" value="hard" />
                        </div>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-dark text-center mb-4">Participants</p>
                        <div>
                            {
                                members.map((member, index) => 
                                    <Checkbox key={index} text={member.username} name={"participant"} value={member.id} />
                                )
                            }
                        </div>
                    </div>
                </>
            }
            <div>
                <Button type="submit">Create Task</Button>
            </div>
        </Form>
    )
}

export async function loader({ request, params }) {
    return axiosInstance.get(`/group/members?groupId=${params.groupId}`)
        .then(response => {
            return response.data.members;
        })
        .catch(err => {
            console.log(err);
            
            return Promise.resolve();
        })
}

export async function action({ request, params }) { // creates new task
    const data = await request.formData();
    const date = new Date(data.get('date')).toISOString().split('T')[0];    

    const body = {
        name: data.get('name'),
        description: data.get('description'),
        date: date,
        period: data.get('period'),
        gap: data.get('gap'),
        ...(globalIsGroupTask && {
            groupId: params.groupId,
            participants: data.getAll('participant'),
            difficulty: data.get('difficulty')
        })
    }

    if(globalIsGroupTask) {
        return axiosInstance.post("/group/add-task", body)
        .then(response => {
            return redirect("..");
        })
        .catch(err => {
            return Promise.resolve();
        })
    }

    return axiosInstance.post("/user/add-task", body)
        .then(response => {
            return redirect(`/user/${globalIsDaily? "dailies" : "todos"}`);
        })
        .catch(err => {
            return Promise.resolve();
        })
}