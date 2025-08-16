import { NavLink, useNavigate } from "react-router-dom";

import NavButton from "./NavButton";

import DailiesIcon from "components/ui/icons/menu-icons/DailiesIcon";
import TodosIcon from "components/ui/icons/menu-icons/TodosIcon";
import GroupsIcon from "components/ui/icons/menu-icons/GroupsIcon";
import NewTaskIcon from "components/ui/icons/menu-icons/NewTaskIcon";
import SiteIcon from "components/ui/icons/menu-icons/SiteIcon";
// import LogoutIcon from "components/ui/icons/menu-icons/LogoutIcon";
import ProfileIcon from "components/ui/icons/ProfileIcon";
// import axiosInstance from "utils/axiosInstance";

export default function Header({ userImage }) {
  const navigate = useNavigate();

  // function handleLogout() {
  //     axiosInstance.post("/logout")
  //     .then(response => {
  //         navigate("/");
  //     })
  //     .catch(err => {
  //         console.error(err);
  //     });
  // }

  return (
    <div className="sticky top-0 left-0 py-8 px-4 w-screen ~md:~h-24/36 bg-yellow flex items-center justify-between">
      <div>
        <NavLink to={"/"} className="flex items-center gap-4">
          <SiteIcon color="white" className="w-14 h-14" />
          <h1 className="text-white text-5xl font-bold">Checkmate</h1>
        </NavLink>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex items-center ~sm:~gap-0/4">
          <NavButton
            to={"/user/dailies"}
            text="Dailies"
            iconComponent={DailiesIcon}
          />
          <NavButton
            to={"/user/todos"}
            text="To-Dos"
            iconComponent={TodosIcon}
          />
          <NavButton to={"/group"} text="Groups" iconComponent={GroupsIcon} />
        </div>

        <NavLink
          to={"/user/new-task"}
          className={({ isActive }) =>
            isActive ? " [&>*]:bg-white" : " [&>*]:bg-yellow"
          }
        >
          <NewTaskIcon className="w-24 h-24 border-[0.8rem] border-dark p-1 rounded-full" />
        </NavLink>

        <NavLink
          to={"/user"}
          end
          className={({ isActive }) =>
            isActive
              ? "outline ~sm:~outline-4/8 outline-white rounded-full"
              : ""
          }
        >
          {userImage ? (
            <figure className="~sm:~w-16/20 ~sm:~h-16/20">
              <img
                src={`http://localhost:3000/images/users/${userImage}`}
                alt="Profile icon"
                className="!h-full !w-full object-cover rounded-full"
              />
            </figure>
          ) : (
            <ProfileIcon className="~sm:~w-16/20 ~sm:~h-16/20" />
          )}
        </NavLink>
      </div>

      {/* <button onClick={handleLogout}>
                <LogoutIcon className="~sm:~w-8/12 ~sm:~h-8/12" />
            </button> */}
    </div>
  );
}
