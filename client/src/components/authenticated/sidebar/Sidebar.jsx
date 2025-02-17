import { Link, NavLink, useNavigate } from "react-router-dom";

import NavButton from "./NavButton";

import dailiesPic from "../../../assets/sidepanel-icons/dailies.png";
import todosPic from "../../../assets/sidepanel-icons/todo.png";
import groupPic from "../../../assets/sidepanel-icons/group.png";
import newTaskPic from "../../../assets/sidepanel-icons/new-task.png";
import logoutPic from "../../../assets/sidepanel-icons/logout.png";
import profilePic from "../../../assets/misc-icons/profile.png";
import axiosInstance from "../../../utils/axiosInstance";

export default function SideBar() {
    const navigate = useNavigate();
    const defaultNewTaskCSS = "relative left-16";

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
        <div className="sticky top-0 left-0 p-4 h-screen w-32 bg-amber-300 rounded-r-lg flex flex-col items-center justify-between" style={{ gridArea: "sidebar" }}>
            <div className="flex flex-col items-center gap-2">
                {/* profile button */}
                <NavLink to={"/user"} end className={({ isActive }) => isActive? "border-4 border-amber-600 rounded-full [&>*]:w-16 [&>*]:h-16" : ""}>
                    <img src={profilePic} alt="Profile icon" className="w-20 h-20" />
                </NavLink>
                {/* new task button */}
                <div className="relative">
                    <NavLink to={"/user/new-task"} className={({ isActive }) => isActive? (defaultNewTaskCSS + " [&>*]:bg-amber-600") : (defaultNewTaskCSS + " [&>*]:bg-amber-300")}>
                        <img src={newTaskPic} alt="New task icon" className="w-24 h-24 border-[0.8rem] border-gray-900 p-1 rounded-full" />
                    </NavLink>
                </div>
                {/* navigation panel */}
                <div className="flex flex-col items-center">
                    <NavButton to={"/user/dailies"} text="Dailies" picture={dailiesPic} />
                    <NavButton to={"/user/todos"} text="To-Dos" picture={todosPic} />
                    <NavButton to={"/group"} text="Groups" picture={groupPic} />
                </div>
            </div>
            {/* logout button */}
            <button onClick={handleLogout}>
                <img src={logoutPic} alt="Logout icon" className="w-12 h-12" />
            </button>
        </div>
    );
}