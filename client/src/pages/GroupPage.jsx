import { useLoaderData } from "react-router-dom";

import axiosInstance from "../utils/axiosInstance";

import GroupDailiesPanel from "../components/authenticated/group/group-panels/GroupDailiesPanel";
import GroupInfoPanel from "../components/authenticated/group/group-panels/groupInfoPanel";
import GroupRankingPanel from "../components/authenticated/group/group-panels/GroupRankingPanel";
import GroupTodosPanel from "../components/authenticated/group/group-panels/GroupTodosPanel";

export default function GroupPage() {
    const { group, isLeader } = useLoaderData();    

    return(
        <div className="bg-white rounded-lg p-4 flex flex-col gap-16">
            <GroupInfoPanel name={group.name} isLeader={isLeader} leader={group.members.filter(member => member.id === group.leader)[0]} />
            <GroupDailiesPanel dailiesList={group.tasks.dailies} isLeader={isLeader} />
            <GroupTodosPanel todosList={group.tasks.todos} isLeader={isLeader} />
            <GroupRankingPanel members={group.members} />
        </div>
    )
}

export async function loader({ request, params }) {
    return axiosInstance.get(`/group/group-data?groupId=${params.groupId}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            
            return Promise.resolve();
        })
}