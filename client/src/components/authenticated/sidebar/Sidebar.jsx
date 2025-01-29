import { NavLink } from "react-router-dom";

import NavButton from "./NavButton";

import dailiesPic from "../../../assets/sidepanel-icons/dailies.png";
import todosPic from "../../../assets/sidepanel-icons/todo.png";
import groupPic from "../../../assets/sidepanel-icons/group.png";
import newTaskPic from "../../../assets/sidepanel-icons/new-task.png";
import logoutPic from "../../../assets/sidepanel-icons/logout.png";
import profilePic from "../../../assets/sidepanel-icons/profile.png";

export default function SideBar() {
    const defaultNewTaskCSS = "w-24 h-24 relative left-16";

    return(
        <div className="sticky top-0 p-4 h-screen w-32 bg-amber-300 rounded-r-lg clip-path-valley flex flex-col items-center justify-between">
            <div className="flex flex-col items-center gap-2">
                {/* profile button */}
                <NavLink to={"/user"} end className={({ isActive }) => { isActive? "border-2 border-amber-600" : ""}}>
                    <img src={profilePic} alt="Profile icon" className="w-20 h-20" />
                </NavLink>
                {/* new task button */}
                <div className="relative">
                    <NavLink to={"/user/new-task"} className={({ isActive}) => { isActive? defaultNewTaskCSS : defaultNewTaskCSS}}> {/* !!!!!!!! */}
                        <img src={newTaskPic} alt="New task icon" className="w-24 h-24 bg-amber-300 border-[0.8rem] border-gray-900 p-1 rounded-full" />
                    </NavLink>
                </div>
                {/* navigation panel */}
                <div className="flex flex-col items-center">
                    <NavButton to={"/user/dailies"} text="Dailies" picture={dailiesPic} />
                    <NavButton to={"/user/todos"} text="To Do's" picture={todosPic} />
                    <NavButton text="Groups" picture={groupPic} />
                </div>
            </div>
            {/* logout button */}
            <img src={logoutPic} alt="Logout icon" className="w-12 h-12" />
        </div>
    );
}