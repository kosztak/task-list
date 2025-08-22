import { NavLink, useNavigate } from "react-router-dom";

import NavButton from "./NavButton";

import DailiesIcon from "components/ui/icons/menu-icons/DailiesIcon";
import TodosIcon from "components/ui/icons/menu-icons/TodosIcon";
import GroupsIcon from "components/ui/icons/menu-icons/GroupsIcon";
import NewTaskIcon from "components/ui/icons/menu-icons/NewTaskIcon";
import SiteIcon from "components/ui/icons/menu-icons/SiteIcon";
// import LogoutIcon from "components/ui/icons/menu-icons/LogoutIcon";
import ProfileIcon from "components/ui/icons/ProfileIcon";
import HamburgerMenu from "./HamburgerMenu";
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
    <header className="sticky left-0 top-0 w-screen rounded-b-xl bg-yellow px-4 py-4">
      <div className="container flex items-center justify-between">
        <div>
          <NavLink to={"/"} className="flex items-center gap-4">
            <SiteIcon color="white" className="~h-10/14 ~w-10/14" />
            <h1 className="font-bold text-white ~text-4xl/5xl">Checkmate</h1>
          </NavLink>
        </div>

        <div className="flex items-center ~md:~gap-4/10">
          <div className="flex items-center ~sm:~gap-4/8">
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

          <NavButton
            to={"/user/new-task"}
            text="New Task"
            iconComponent={NewTaskIcon}
          />

          <HamburgerMenu />

          <NavLink
            to={"/user"}
            end
            className={({ isActive }) =>
              isActive
                ? "rounded-full outline outline-white ~sm:~h-16/20 ~sm:~w-16/20 ~sm:~outline-4/8"
                : ""
            }
          >
            {userImage ? (
              <figure className="aspect-square !h-full">
                <img
                  src={`http://localhost:3000/images/users/${userImage}`}
                  alt="Profile icon"
                  className="!h-full !w-full rounded-full object-cover"
                />
              </figure>
            ) : (
              <ProfileIcon className="aspect-square !h-full" />
            )}
          </NavLink>
        </div>
      </div>

      {/* <button onClick={handleLogout}>
                <LogoutIcon className="~sm:~w-8/12 ~sm:~h-8/12" />
            </button> */}
    </header>
  );
}
