import { useState } from "react";
import { Form } from "react-router-dom";

import RadioButton from "../components/ui/RadioButton";
import DailyPanel from "../components/authenticated/new-task-panels/DailyPanel";
import TodoPanel from "../components/authenticated/new-task-panels/TodoPanel";
import Button from "../components/ui/inputs/Button";

export default function NewTaskPage() {
    const [isDaily, setIsDaily] = useState(true);

    function handleTypeChange(event) {
        setIsDaily(event.target.value === "daily");
    }
    return(
        <Form className="bg-white rounded-lg p-8 flex flex-col items-start gap-16">
            <div className="flex gap-4">
                <RadioButton text="Daily" type="radio" name="type" value="daily" onChange={handleTypeChange} defaultChecked />
                <RadioButton text="To-do" type="radio" name="type" value="todo" onChange={handleTypeChange} />
            </div>
            {isDaily ? <DailyPanel /> : <TodoPanel />}
            <Button type="submit">Create Task</Button>
        </Form>
    )
}