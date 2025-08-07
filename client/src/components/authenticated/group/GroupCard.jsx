import { Link } from "react-router-dom";
import GroupIcon from "components/ui/icons/GroupIcon";

export default function GroupCard({ group }) {
    return(
        <Link to={group.id} className="p-4 rounded-lg border-dark bg-yellow border-2 flex justify-between items-center">
            <div className="flex gap-4 items-center">
                {group.image ?
                    <figure className="w-16 h-16">
                        <img src={`http://localhost:3000/images/groups/${group.image}`} alt="Image of the group" className="!h-full !w-full rounded-full object-cover" />
                    </figure> :
                    <GroupIcon className="w-16 h-16" />
                }
                <p className="text-dark text-2xl font-bold">{group.name}</p>
            </div>
            <div className="flex gap-16">
                <p className="text-dark text-lg font-semibold">Remaining dailies: {group.dailies}</p>
                <p className="text-dark text-lg font-semibold">Remaining to dos: {group.todos}</p>
            </div>
        </Link>
    )
}