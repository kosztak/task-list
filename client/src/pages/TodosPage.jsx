import { useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";

import axiosInstance from "../utils/axiosInstance"

import TodoBar from "../components/ui/task-bars/TodoBar";
import Alert from "../components/ui/Alert";

export default function TodosPage() {
    const todosList = useLoaderData();
    const alertRef = useRef();

    useEffect(() => {
            if(todosList === undefined) {
                alertRef.current.show("Couldn't get dailies!");
            }
        }, [todosList, alertRef])

    function generateTodoList() {
        return todosList.map(todo => {
            return (
                <TodoBar key={todo._id} task={todo} />
            )
        })
    }

    return(
        <div className="bg-white rounded-lg p-4 flex flex-col items-stretch gap-8">
            <p className="text-center text-3xl font-bold">To-Dos</p>
            {todosList? (todosList.length === 0 ?
                <p className="text-center text-lg">You have no To-Dos left</p> :
                <div className="flex flex-col gap-4">
                    {generateTodoList()}
                </div>) :
                <Alert ref={alertRef} />
            }
        </div>
    )
}

export async function loader() {
    return axiosInstance.get("/user/todos")
        .then(todos => {
            return todos.data;
        })
        .catch(err => {
            return Promise.resolve();
        })
}