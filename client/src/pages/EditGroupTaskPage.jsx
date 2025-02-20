import { Form, useNavigate, redirect, useParams, useLocation, useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";

import Button from "../components/ui/inputs/Button";
import Input from "../components/ui/inputs/Input";
import Option from "../components/ui/inputs/select/Option";
import Select from "../components/ui/inputs/select/Select";
import TextArea from "../components/ui/inputs/TextArea";
import DatePicker from "../components/ui/inputs/DatePicker";
import Alert from "../components/ui/Alert";

import axiosInstance from "../utils/axiosInstance";
import RadioButton from "../components/ui/inputs/RadioButton";
import Checkbox from "../components/ui/inputs/Checkbox";

let alert;
let globalTask;

// Through this component the leader of the group can edit all tasks.
export default function EditGroupTaskPage() {
    const navigate = useNavigate();
    const alertRef = useRef();
    const params = useParams();
    const task = useLocation().state.task;
    const members = useLoaderData();
    const isDaily = params.type === 'dailies';

    useEffect(() => {
        alert = alertRef.current;
    }, [alertRef])

    useEffect(() => {
        globalTask = task;
    }, [task])

    useEffect(() => {
        if(task === undefined) {
            alertRef.current.show("Couldn't load task data!");
        }
    }, [task, alertRef])

    function handleTaskDelete() {        
        axiosInstance.delete(`/group/task?taskId=${task.id}&isDaily=${isDaily}`)
            .then(() => {
                navigate(`/group/${params.groupId}/${params.type}`);
            })
            .catch(err=> {
                console.log(err);

                return Promise.resolve();
            })
    }

    return(
        <div className="bg-white rounded-lg p-16 flex flex-col items-stretch gap-8">
            <Alert ref={alertRef} />
            {task &&
                <>
                    <p className="text-gray-900 text-2xl font-bold">Editing: {task.name}</p>
                    <Form method="POST"  className="flex flex-col items-stretch gap-16" >
                        <div className="grid grid-cols-[1fr_1fr] gap-4" style={{ gridTemplateAreas: `"name description" "period description" "date gap" "difficulty difficulty" "participants participants"` }}>
                            <Input type="text" name="name" text="Task Name" style={{ gridArea: "name" }} defaultValue={task.name} />
                            <TextArea text="Task Description" name="description" style={{ gridArea: "description" }} defaultValue={task.description} />
                            {isDaily && <Select text="Period" name="period" style={{ gridArea: "period" }} defaultValue={task.period}>
                                <Option value="day">Day</Option>
                                <Option value="week">Week</Option>
                                <Option value="month">Month</Option>
                            </Select>}
                            <DatePicker text="Start Date" name="date" style={{ gridArea: "date" }} defaultValue={task.date} />
                            {isDaily && <Input text="Every" type="number" name="gap" min="1" defaultValue={task.gap} style={{ gridArea: "gap" }} />}
                            <div style={{ gridArea: "difficulty" }}>
                                <p className="text-lg font-bold text-gray-900 text-center mb-4">Difficulty</p>
                                <div className="flex justify-evenly border-2 border-gray-900 p-2 rounded">
                                    <RadioButton text="Trivial" type="radio" name="difficulty" value="trivial" defaultChecked={task.difficulty === "trivial"} />
                                    <RadioButton text="Easy" type="radio" name="difficulty" value="easy" defaultChecked={task.difficulty === "easy"} />
                                    <RadioButton text="Medium" type="radio" name="difficulty" value="medium" defaultChecked={task.difficulty === "medium"} />
                                    <RadioButton text="Hard" type="radio" name="difficulty" value="hard" defaultChecked={task.difficulty === "hard"} />
                                </div>
                            </div>
                            <div style={{ gridArea: "participants" }}>
                                <p className="text-lg font-bold text-gray-900 text-center mb-4">Participants</p>
                                <div>
                                    {
                                        members.map((member, index) => 
                                            <Checkbox key={index} text={member.username} name={"participant"} value={member.id} defaultChecked={task.participants.some(part => part === member.username)} />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button type="submit">Save</Button>
                            <Button type="button" onClick={handleTaskDelete}>Delete</Button>
                        </div>
                    </Form>
                </>
            }
        </div>
    )
}

export async function loader({ request, params }) { // loads the members of group from back-end
    return axiosInstance.get(`/group/members?groupId=${params.groupId}`)
        .then(response => {
            return response.data.members;
        })
        .catch(err => {
            console.log(err);
            
            return Promise.resolve();
        })
}

export async function action({ request, params }) { // updates the current task on the back-end
    const data = await request.formData();

    let responseData = {
        _id: globalTask._id,
        ...(globalTask.name !== data.get('name') && {name: data.get('name')}),
        ...(globalTask.description !== data.get('description') && {description: data.get('description')}),
        ...(globalTask.date.split('T')[0] !== data.get('date') && {date: data.get('date')})
    }

    if(globalTask.renewel) { // overrides the renewel property of task, if it is a daily
        responseData = {
            ...responseData,
            ...((globalTask.renewel.period !== data.get('period')) && {"renewel.period": data.get('period')}),
            ...((globalTask.renewel.gap !== parseInt(data.get('gap'))) && {"renewel.gap": data.get('gap')})
        }
    }
        
    return axiosInstance.patch('/task', responseData)
        .then(() => {
            return redirect(''); // refreshes current page
        })
        .catch(err => {
            alert.show(err.response.data.message);
            
            return Promise.resolve();
        })
}