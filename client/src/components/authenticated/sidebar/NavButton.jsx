import { NavLink } from "react-router-dom";

//This component is the navigation button for the sidebar component.
export default function NavButton({ text, picture, to }) {
    const defaultCSS = "group w-28 p-2 flex flex-col items-center";

    return(
        <NavLink to={to} className={({ isActive }) => isActive? (defaultCSS + " bg-amber-600 rounded-lg") : defaultCSS}>
            <img src={picture} alt={text + " icon"} className="w-14 h-14" />
            <p className="text-gray-900">{ text }</p>
        </NavLink>
    )
}