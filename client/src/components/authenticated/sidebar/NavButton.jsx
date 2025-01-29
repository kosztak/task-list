import { NavLink } from "react-router-dom";

export default function NavButton({ text, picture, to }) {
    const defaultCSS = "group w-32 p-2 flex flex-col items-center";

    return(
        <NavLink to={to} className={({ isActive }) => { isActive? defaultCSS : defaultCSS + " bg-amber-600 rounded"}}>
            <img src={picture} alt={text + " icon"} className="w-14 h-14" />
            <p className="text-gray-900">{ text }</p>
        </NavLink>
    )
}