import { Link } from "react-router-dom";

import TickIcon from "../icons/TickIcon";

function getColorClasses(color) {
  const colorClasses = {
    red: {
      button: "bg-red-task",
      link: "bg-red-task-light",
    },
    yellow: {
      button: "bg-yellow-task",
      link: "bg-yellow-task-light",
    },
    green: {
      button: "bg-green-task",
      link: "bg-green-task-light",
    },
    white: {
      button: "bg-gray-task",
      link: "bg-gray-task-light",
    },
  };

  return (
    colorClasses[color] || {
      button: "bg-white",
      link: "bg-white",
    }
  );
}

export default function TaskBar({
  id,
  name,
  description,
  date,
  color,
  onCheck,
  checked,
}) {
  const { button, link } = getColorClasses(color);
  return (
    <div className="flex items-stretch">
      <div className={`${button} p-4 rounded-l-lg flex items-center`}>
        {checked ? (
          <div className="bg-white h-12 w-12 rounded-full p-1 border-4 border-gray">
            <TickIcon width="150" height="150" />
          </div>
        ) : (
          <button
            onClick={onCheck}
            className={`bg-white h-12 w-12 rounded-full border-4 border-gray ${!checked && "[&>*]:hover:visible"}`}
          >
            <TickIcon className={`h-8 w-8 m-auto ${!checked && "invisible"}`} />
          </button>
        )}
      </div>
      <Link
        to={id}
        className={`${link} p-4 rounded-r-lg flex flex-col gap-2 grow`}
      >
        <p className="text-2xl font-semibold text-dark">{name}</p>
        <p className="text-gray-dark">{description}</p>
        <p className="text-right text-gray">Due: {date}</p>
      </Link>
    </div>
  );
}
