import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import TaskBar from "./TaskBar";

export default function DailyBar({ task, isUser }) {
    const navigate = useNavigate();
    const dateDiff = new Date(task.date) - new Date();
    const daysDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

    let periodMiddlePoint;

    // This is the middle point of the period, which is used to determine the color of the task bar
    switch (task.renewel.period) {
        case "day":
            periodMiddlePoint = 1;
            break;
        case "week":
            periodMiddlePoint = 3;
            break;
        case "month":
            periodMiddlePoint = 10;
            break;
        default:
            periodMiddlePoint = 0;
    }

    
    // This is the logic to determine the color of the task bar
    let color;
    if (task.done) {
        color = 'white';
    } else {
        if (daysDiff <= 0) {
            color = 'red';
        } else if (daysDiff <= (periodMiddlePoint * task.renewel.gap)) {
            color = 'yellow';
        } else {
            color = 'green';
        }
    }

    function handleCheck() {
        console.log(task);
        
        axiosInstance.post(`/${isUser? 'user' : 'group'}/check-daily`, { taskId: task._id })
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
            checked={task.done}
        />
    )
}