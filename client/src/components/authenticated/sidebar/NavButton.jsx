import { NavLink } from "react-router-dom";

export default function NavButton({ text, picture, to }) {
    const defaultCSS = "group w-28 p-2 flex flex-col items-center";

    return(
        <NavLink to={to} className={({ isActive }) => isActive? (defaultCSS + " bg-orange rounded-lg") : defaultCSS}>
            <img src={picture} alt={text + " icon"} className="w-14 h-14" />
            <p className="text-dark">{ text }</p>
        </NavLink>
    )
}