import groupPic from "../../../../assets/misc-icons/default-group.png";
import profilePic from "../../../../assets/misc-icons/profile.png";
import Button from "../../../ui/inputs/Button";

export default function GroupInfoPanel({ name, image, leader, isLeader }) {
    console.log(leader);
    
    return(
        <div className="p-4 flex justify-between">
            <div className="flex items-center gap-4">
                <img src={groupPic} alt="Picture of group pofile." className="w-24 h-24" />
                <p className="text-gray-900 text-3xl font-bold">{name}</p>
            </div>
            {isLeader? 
                <div className="flex items-center">
                    <Button>Edit info</Button>
                </div> :
                <div className="flex flex-col justify-center gap-2">
                    <p className="font-semibold text-xl text-gray-900 text-center">Leader</p>
                    <div className="flex justify-center gap-2">
                        <img src={profilePic} alt="Profile picture of group leader." className="w-8 h-8" />
                        <p className="text-gray-900 text-lg">{leader.username}</p>
                    </div>
                </div>
            }
        </div>
    )
}