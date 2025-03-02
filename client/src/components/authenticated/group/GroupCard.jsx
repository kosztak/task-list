import { Link } from "react-router-dom";
import groupPic from "../../../assets/misc-icons/default-group.png";

// This components is shown on the group listing page.
export default function GroupCard({ group }) {
    return(
        <Link to={group.id} className="p-4 rounded-lg border-gray-900 bg-amber-300 border-2 flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <img src={group.image? `http://localhost:3000/images/groups/${group.image}` : groupPic} alt="Image of the group" className="w-16 h-16 rounded-full" />
                <p className="text-gray-900 text-2xl font-bold">{group.name}</p>
            </div>
            <div className="flex gap-16">
                <p className="text-gray-900 text-lg font-semibold">Remaining dailies: {group.dailies}</p>
                <p className="text-gray-900 text-lg font-semibold">Remaining to dos: {group.todos}</p>
            </div>
        </Link>
    )
}