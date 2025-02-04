import { useLoaderData } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"
import TodoBar from "../components/ui/task-bars/TodoBar";

export default function TodosPage() {
    const todosList = useLoaderData();

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
            {todosList.length === 0 ?
                <p className="text-center text-lg">You have no To-Dos left</p> :
                <div className="flex flex-col gap-4">
                    {generateTodoList()}
                </div>
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