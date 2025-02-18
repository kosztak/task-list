import { useEffect, useRef } from "react";

import TodoBar from "../../../ui/task-bars/TodoBar";
import Alert from "../../../ui/Alert";
import Button from "../../../ui/inputs/Button";

export default function GroupTodosPanel({ todosList, isLeader }) {
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
        navigate("new-task");
    }

    return(
        <dir className="flex flex-col gap-4 p-0">
            <div className="flex justify-between">
                <p className="text-gray-900 text-2xl font-bold">Todos</p>
                {isLeader && <Button onClick={handleButtonClick}>Add todo</Button>}
            </div>
            <Alert ref={alertRef} />
            {(!todosList || todosList.length === 0) ?
                <p className="text-center text-lg">You have no to do tasks</p> :
                <div className="flex flex-col gap-4">
                    {generateTodoList()}
                </div>
            }
        </dir>
    )
}