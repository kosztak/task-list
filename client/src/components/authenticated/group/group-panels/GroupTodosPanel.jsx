import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import TodoBar from "components/ui/task-bars/TodoBar";
import Alert from "components/ui/Alert";
import Button from "components/ui/inputs/Button";

export default function GroupTodosPanel({ todosList, isLeader }) {
    const navigate = useNavigate();
    const alertRef = useRef();
    
    useEffect(() => {
            if(todosList === undefined) {
                alertRef.current.show("Couldn't get dailies!");
            }
        }, [todosList, alertRef])

    function generateTodoList() {
        return todosList.map(todo => {
            return (
                <TodoBar key={todo._id} task={todo.taskId} isUser={false} />
            )
        })
    }

    function handleButtonClick() {
        navigate("todos");
    }

    return(
        <dir className="flex flex-col gap-4 p-0">
            <div className="flex justify-between">
                <p className="text-dark text-2xl font-bold">To-dos</p>
                {isLeader && <Button onClick={handleButtonClick}>View to-dos</Button>}
            </div>
            <Alert ref={alertRef} />
            {(!todosList || todosList.length === 0) ?
                <p className="text-center text-dark text-lg">You have no to-do tasks</p> :
                <div className="flex flex-col gap-4">
                    {generateTodoList()}
                </div>
            }
        </dir>
    )
}