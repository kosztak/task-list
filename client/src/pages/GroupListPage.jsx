import { Link, useLoaderData, useNavigate } from "react-router-dom";

import axiosInstance from "utils/axiosInstance"

import GroupCard from "components/authenticated/group/GroupCard";
import Button from "components/ui/inputs/Button";
import PageLink from "components/ui/PageLink";

// This component lists all groups where ths user is a member or the leader. 
export default function GroupListPage() {
    const navigate = useNavigate();
    const groups = useLoaderData();
    const ownGroup = groups.owned;
    const otherGroupsList = groups.others;

    function handleJoinGroup() {
        navigate("join");
    }

    function getOtherGroups() {
        return otherGroupsList.map(group =>
            <GroupCard key={group.id} group={group} />
        )
    }

    return (
        <div className="bg-white rounded-lg p-4 flex flex-col items-stretch gap-16">
            {/* group owned by the user */}
            <div className="flex flex-col gap-4">
                <p className="text-xl font-bold">Your group</p>
                {ownGroup ? <GroupCard group={ownGroup} /> : 
                    <div className="flex gap-2">
                        <p className="text-gray-900">You don't have a group yet.</p>
                        <PageLink to="create">Create your group here.</PageLink>
                    </div>
                }
            </div>
            {/* groups where the user is a member */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <p className="text-xl font-bold">Other groups</p>
                    <Button onClick={handleJoinGroup}>Join group</Button>
                </div>
                {otherGroupsList.length !== 0 ? getOtherGroups() :
                    <div className="flex gap-2">
                        <p className="text-gray-900">You're not a member of any group.</p>
                        <PageLink to="join">Join one here.</PageLink>
                    </div>
                }
            </div>
        </div>
    )
}

export async function loader({ request, params }) {
    return axiosInstance.get("/user/groups")
        .then(groups => {

            return groups.data;
        })
        .catch(err => {
            return Promise.resolve();
        })
}