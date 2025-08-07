import { NavLink, useNavigate } from "react-router-dom";

import NavButton from "./NavButton";

import DailiesIcon from "components/ui/icons/menu-icons/DailiesIcon";
import TodosIcon from "components/ui/icons/menu-icons/TodosIcon";
import GroupsIcon from "components/ui/icons/menu-icons/GroupsIcon";
import NewTaskIcon from "components/ui/icons/menu-icons/NewTaskIcon";
import LogoutIcon from "components/ui/icons/menu-icons/LogoutIcon";
import ProfileIcon from "components/ui/icons/ProfileIcon";
import axiosInstance from "utils/axiosInstance";

export default function SideBar({ userImage }) {
    const navigate = useNavigate();

    function handleLogout() {
        axiosInstance.post("/logout")
        .then(response => {
            navigate("/");
        })
        .catch(err => {
            console.error(err);
        });
    }

    return(
        <div className="sticky top-0 left-0 py-8 px-4 h-screen ~md:~w-24/36 bg-yellow flex flex-col items-center justify-between" style={{ gridArea: "sidebar" }}>
            <div className="flex flex-col items-center gap-4">
                <NavLink to={"/user"} end className={({ isActive }) => isActive? "outline ~sm:~outline-4/8 outline-white rounded-full" : ""}>
                    {userImage ?
                        <figure className="~sm:~w-16/20 ~sm:~h-16/20">
                            <img src={`http://localhost:3000/images/users/${userImage}`} alt="Profile icon" className="!h-full !w-full object-cover rounded-full" />
                        </figure> :
                        <ProfileIcon className="~sm:~w-16/20 ~sm:~h-16/20" />
                    }
                </NavLink>

                <NavLink to={"/user/new-task"} className={({ isActive }) => isActive? " [&>*]:bg-white" : " [&>*]:bg-yellow"}>
                    <NewTaskIcon className="w-24 h-24 border-[0.8rem] border-dark p-1 rounded-full" />
                </NavLink>

                <div className="flex flex-col items-center ~sm:~gap-0/6">
                    <NavButton to={"/user/dailies"} text="Dailies" iconComponent={DailiesIcon} />
                    <NavButton to={"/user/todos"} text="To-Dos" iconComponent={TodosIcon} />
                    <NavButton to={"/group"} text="Groups" iconComponent={GroupsIcon} />
                </div>
            </div>

            <button onClick={handleLogout}>
                <LogoutIcon className="~sm:~w-8/12 ~sm:~h-8/12" />
            </button>
        </div>
    );
}