import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import TodoBar from "../../../ui/task-bars/TodoBar";
import Alert from "../../../ui/Alert";
import Button from "../../../ui/inputs/Button";

// This component shows the to-do tasks of a group for every user. Only the participated tasks will appear.
export default function GroupTodosPanel({ todosList, isLeader }) {
    const navigate = useNavigate();
    const alertRef = useRef();
    
    useEffect(() => { // show alert component, if no to-do is available
            if(todosList === undefined) {
                alertRef.current.show("Couldn't get dailies!");
            }
        }, [todosList, alertRef])

    function generateTodoList() { // creates a TodoBar component list to show all user related to-dos
        return todosList.map(todo => {
            return (
                <TodoBar key={todo._id} task={todo.taskId} isUser={false} />
            )
        })
    }

    function handleButtonClick() {// navigates only the leader of the group to a page, where they can see all to-dos of the group
        navigate("todos");
    }

    return(
        <dir className="flex flex-col gap-4 p-0">
            <div className="flex justify-between">
                <p className="text-gray-900 text-2xl font-bold">To-dos</p>
                {isLeader && <Button onClick={handleButtonClick}>View to-dos</Button>}
            </div>
            <Alert ref={alertRef} />
            {(!todosList || todosList.length === 0) ?
                <p className="text-center text-gray-900 text-lg">You have no to-do tasks</p> :
                <div className="flex flex-col gap-4">
                    {generateTodoList()}
                </div>
            }
        </dir>
    )
}