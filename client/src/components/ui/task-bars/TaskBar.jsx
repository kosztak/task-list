import { Link } from "react-router-dom";

import tickPic from "../../../assets/misc-icons/tick.png";

//this function helpd to get the correct background color classes for the taskbar corresponding to the given color
function getColorClasses(color) {
    const colorClasses = {
        red: {
            button: 'bg-red-400',
            link: 'bg-red-200'
        },
        yellow: {
            button: 'bg-yellow-400',
            link: 'bg-yellow-200'
        },
        green: {
            button: 'bg-green-400',
            link: 'bg-green-200'
        },
        white: {
            button: 'bg-gray-400',
            link: 'bg-gray-200'
        }
    };

    return colorClasses[color] || {
        button: 'bg-white',
        link: 'bg-white'
    };
};

export default function TaskBar({ id, name, description, date, color, onCheck, checked }) {
    const { button, link } = getColorClasses(color);
    return (
        <div className="flex items-stretch">
            <div className={`${button} p-4 rounded-l-lg flex items-center`}>
                {checked ?
                    <div className="bg-gray-100 h-12 w-12 rounded-full p-1 border-4 border-gray-300">
                        <img src={tickPic} alt="tick" className="h-8 w-8" />
                    </div> :
                    <button onClick={onCheck} className={`bg-gray-100 h-12 w-12 rounded-full border-4 border-gray-300 ${!checked && "[&>*]:hover:visible"}`}>
                        <img src={tickPic} alt="tick" className={`h-8 w-8 m-auto ${!checked && "invisible"}`} />
                    </button>
                }
            </div>
            <Link to={id} className={`${link} p-4 rounded-r-lg flex flex-col gap-2 grow`}>
                <p className="text-2xl font-semibold text-gray-900">{name}</p>
                <p className="text-gray-700">{description}</p>
                <p className="text-right text-gray-500">Due: {date}</p>
            </Link>
        </div>
    )
}