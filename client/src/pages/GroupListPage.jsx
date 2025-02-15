import { Link, useLoaderData } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"
import GroupCard from "../components/authenticated/group/GroupCard";

export default function GroupListPage() {
    const groups = useLoaderData();
    const ownGroup = groups.owned;
    const otherGroupsList = groups.others;

    return(
        <div className="bg-white rounded-lg p-4 flex flex-col items-stretch gap-16">
            {/* group owned by the user */}
            <div className="flex flex-col gap-4">
                <p className="text-xl font-bold">Your group</p>
                {ownGroup? <GroupCard group={ownGroup} /> : <Link to="create">Create your group</Link>}
            </div>
            {/* groups where the user is a member */}
            <div>
                <p className="text-xl font-bold">Other groups</p>
                {otherGroupsList.length !== 0 && <p>Other groups</p>}
                <Link>Join group</Link>
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