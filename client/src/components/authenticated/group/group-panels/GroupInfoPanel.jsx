import { useNavigate } from "react-router-dom";

import Button from "components/ui/inputs/Button";

import GroupIcon from "components/ui/icons/GroupIcon";
import ProfileIcon from "components/ui/icons/ProfileIcon";

export default function GroupInfoPanel({ name, image, leader, isLeader }) {
  const navigate = useNavigate();

  function handleCreateTaskClick() {
    navigate("new-task");
  }

  function handleEditInfoClick() {
    navigate("edit");
  }

  return (
    <div className="p-4 flex justify-between">
      <div className="flex items-center gap-4">
        {image ? (
          <figure className="w-28 h-28">
            <img
              src={`http://localhost:3000/images/groups/${image}`}
              alt="Picture of group pofile."
              className="!h-full !w-full object-cover rounded-full"
            />
          </figure>
        ) : (
          <GroupIcon className="w-28 h-28" />
        )}
        <p className="text-dark text-3xl font-bold">{name}</p>
      </div>
      {isLeader ? (
        <div className="flex items-center gap-4">
          <Button onClick={handleCreateTaskClick}>Create task</Button>
          <Button onClick={handleEditInfoClick}>Edit info</Button>
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-2">
          <p className="font-semibold text-xl text-dark text-center">Leader</p>
          <div className="flex justify-center gap-2">
            <ProfileIcon className="w-8 h-8" />
            <p className="text-dark text-lg">{leader.username}</p>
          </div>
        </div>
      )}
    </div>
  );
}
