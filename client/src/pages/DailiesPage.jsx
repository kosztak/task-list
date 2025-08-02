import { useLoaderData } from "react-router-dom"
import { useEffect, useRef } from "react";

import axiosInstance from "utils/axiosInstance"

import DailyBar from "components/ui/task-bars/DailyBar";
import Alert from "components/ui/Alert";

// This component shows the user's daily tasks
export default function DailiesPage() {
    const dailiesList = useLoaderData();
    const alertRef = useRef();

    useEffect(() => {
        if(dailiesList === undefined) {
            alertRef.current.show("Couldn't get dailies!");
        }
    }, [dailiesList, alertRef])

    function generateDailyList() { // creates a DailyBar component list to show all user related dailies
        return dailiesList.map(daily => {
            return (
                <DailyBar key={daily._id} task={daily} isUser={true} />
            )
        })
    }

    return(
        <div className="bg-white rounded-lg p-4 flex flex-col items-stretch gap-8">
            <p className="text-center text-3xl font-bold">Dailies</p>
            <Alert ref={alertRef} />
            {(!dailiesList || dailiesList.length === 0) ?
                <p className="text-center text-lg">You have no daily tasks</p> :
                <div className="flex flex-col gap-4">
                    {generateDailyList()}
                </div>
            }
        </div>
    )
}

export async function loader() {
    return axiosInstance.get("/user/dailies")
        .then(dailies => {
            return dailies.data;
        })
        .catch(err => {
            return Promise.resolve();
        })
}