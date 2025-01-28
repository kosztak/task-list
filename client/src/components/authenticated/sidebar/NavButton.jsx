import { NavLink } from "react-router-dom";

export default function NavButton({ text, picture }) {
    return(
        <NavLink className="group w-32 p-2 flex flex-col items-center">
            <img src={picture} alt={text + " icon"} className="w-14 h-14" />
            <p className="text-gray-900">{ text }</p>
        </NavLink>
    )
}