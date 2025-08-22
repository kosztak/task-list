import { useState } from "react";

import NavButton from "./NavButton";

import HambergerOpenIcon from "components/ui/icons/menu-icons/HambergerOpenIcon";
import HambergerCloseIcon from "components/ui/icons/menu-icons/HambergerCloseIcon";
import DailiesIcon from "components/ui/icons/menu-icons/DailiesIcon";
import TodosIcon from "components/ui/icons/menu-icons/TodosIcon";
import GroupsIcon from "components/ui/icons/menu-icons/GroupsIcon";
import NewTaskIcon from "components/ui/icons/menu-icons/NewTaskIcon";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="aspect-square h-12 md:hidden"
      >
        {isOpen ? (
          <HambergerCloseIcon className="h-full" />
        ) : (
          <HambergerOpenIcon className="h-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-0 right-0 flex translate-y-full flex-col gap-6 rounded-md bg-white p-6 shadow-lg">
          <NavButton
            to={"/user/dailies"}
            text="Dailies"
            iconComponent={DailiesIcon}
            isHeader={false}
          />

          <NavButton
            to={"/user/todos"}
            text="To-Dos"
            iconComponent={TodosIcon}
            isHeader={false}
          />

          <NavButton
            to={"/group"}
            text="Groups"
            iconComponent={GroupsIcon}
            isHeader={false}
          />

          <NavButton
            to={"/user/new-task"}
            text="New Task"
            iconComponent={NewTaskIcon}
            isHeader={false}
          />
        </div>
      )}
    </div>
  );
}
