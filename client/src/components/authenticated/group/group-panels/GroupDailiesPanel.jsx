import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../ui/Alert";
import DailyBar from "../../../ui/task-bars/DailyBar";
import Button from "../../../ui/inputs/Button";

// This component shows the daily tasks of a group for every user. Only the participated tasks will appear.
export default function GroupDailiesPanel({ dailiesList, isLeader }) {
    const navigate = useNavigate();
    const alertRef = useRef();    

    useEffect(() => { // show alert component, if no daliy is available
        if(dailiesList === undefined) {
            alertRef.current.show("Couldn't get dailies!");
        }
    }, [dailiesList, alertRef])

    function generateDailyList() { // creates a DailyBar component list to show all user related dailies
        return dailiesList.map(daily => {
            return (
                <DailyBar key={daily._id} task={daily} isUser={false} />
            )
        })
    }

    function handleButtonClick() { // navigates only the leader of the group to a page, where they can see all dailies of the group
        navigate("dailies");
    }

    return(
        <dir className="flex flex-col gap-4 p-0">
            <div className="flex justify-between">
                <p className="text-gray-900 text-2xl font-bold">Dailies</p>
                {isLeader && <Button onClick={handleButtonClick}>View dailies</Button>}
            </div>
            <Alert ref={alertRef} />
            {(!dailiesList || dailiesList.length === 0) ?
                <p className="text-center text-gray-900 text-lg">You have no daily tasks</p> :
                <div className="flex flex-col gap-4">
                    {generateDailyList()}
                </div>
            }
        </dir>
    )
}