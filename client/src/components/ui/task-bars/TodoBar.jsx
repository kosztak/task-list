import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import TaskBar from "./TaskBar";

export default function TodoBar({ task }) {
    const navigate = useNavigate();
    const dateDiff = new Date(task.date) - new Date();
    const daysDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
    
    let color;

    if (daysDiff <= 0) {
        color = 'red';
    } else if (daysDiff <= 3) {
        color = 'yellow';
    } else {
        color = 'green';
    }

    function handleCheck() {
        axiosInstance.delete(`/user/task?taskId=${task._id}`)
            .then(() => {
                navigate("");
            })
            .catch(err => {
                console.error(err);
                return Promise.resolve();
            });
    }

    return (
        <TaskBar
            id={task._id}
            name={task.name}
            description={task.description}
            date={task.date.split('T')[0]}
            color={color}
            onCheck={handleCheck}
        />
    )
}