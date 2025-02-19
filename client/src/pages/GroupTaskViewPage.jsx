import { useLoaderData, useParams } from "react-router-dom"

import axiosInstance from "../utils/axiosInstance";

import Button from "../components/ui/inputs/Button";

export default function GroupTaskViewPage() {
    const isDaily = useParams().type === 'dailies';
    const taskDataList = useLoaderData();

    function getTaskList() {
        return taskDataList.map((task, index) => 
            <div key={task.id} className="flex gap-2 justify-between">
                <div className="grid gap-2 border-gray-900 border-2 rounded p-2 grow">
                    <p >Name: {task.name}</p>
                    <p >Description: {task.description}</p>
                    <p >{isDaily? 'Start: ' : 'Due: '} {task.date.split('T')[0]}</p>
                    {isDaily &&
                        <>
                            <p >Period: {task.period}</p>
                            <p >Gap: {task.gap}</p>
                        </>
                    }
                    <p >Difficulty: {task.difficulty}</p>
                    <p >Participants: {task.participants.join(', ')}</p>
                </div>
                <Button>Edit {isDaily? 'daily' : 'to-do'}</Button>
            </div>
        )
    }

    return(
        <div className="bg-white rounded-lg p-4 flex flex-col gap-8">
            <p className="text-gray-900 text-2xl font-bold">Group {isDaily? 'dailies' : 'to-dos'}</p>
            { getTaskList() }
        </div>
    )
}

export async function loader({ request, params }) {
    console.log(params);
    
    return axiosInstance.get(`/group/${params.type}?groupId=${params.groupId}`)
        .then(response => {
            console.log(response);
            
            return response.data.taskDataList;
        })
        .catch(err => {
            console.log(err);
            
            return Promise.resolve();
        })
}