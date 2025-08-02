import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "components/ui/Alert";
import DailyBar from "components/ui/task-bars/DailyBar";
import Button from "components/ui/inputs/Button";

export default function GroupDailiesPanel({ dailiesList, isLeader }) {
    const navigate = useNavigate();
    const alertRef = useRef();    

    useEffect(() => {
        if(dailiesList === undefined) {
            alertRef.current.show("Couldn't get dailies!");
        }
    }, [dailiesList, alertRef])

    function generateDailyList() {
        return dailiesList.map(daily => {
            return (
                <DailyBar key={daily._id} task={daily} isUser={false} />
            )
        })
    }

    function handleButtonClick() {
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