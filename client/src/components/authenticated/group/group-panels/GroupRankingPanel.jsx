import { useEffect, useRef } from "react";

import Alert from "../../../ui/Alert";

// This component shows the ranking of group members. 
export default function GroupRankingPanel({ members }) {
    const alertRef = useRef();

    useEffect(() => { // shows alert component, if there's no members
        if(!members) {
            alertRef.current.show("There's no members to rank!")
        }
    }, [alertRef, members]);

    function getRankings() { // generates the ranking "cards" for all members of the group
        members.sort((a, b) => a.point < b.point);
        return members.map((member, index) => 
            <div key={index} className="bg-white p-2 rounded flex justify-between">
                <p className="font-bold text-lg">{index+1}</p>
                <p className="text-lg">{member.username}</p>
                <p className="font-bold text-lg">{member.point} pt</p>
            </div>
        )
    }

    return(
        <div className="bg-gray-900 p-4 rounded-lg flex flex-col gap-8">
            <p className="text-amber-300 text-2xl font-bold text-center">Rankings</p>
            <Alert ref={alertRef} />
            {members &&
                <div className="flex flex-col gap-2">
                    {getRankings()}
                </div>
            }
        </div>
    )
}