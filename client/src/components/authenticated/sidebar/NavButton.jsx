import { NavLink } from "react-router-dom";

export default function NavButton({ text, iconComponent, to }) {
    const defaultCSS = "group ~md:~w-20/28 p-2 flex flex-col items-center";
    const IconComponent = iconComponent;

    return(
        <NavLink to={to} className={({ isActive }) => isActive? (defaultCSS + " bg-white rounded-lg") : defaultCSS}>
            <IconComponent className="~md:~w-10/16 ~md:~h-10/16 mb-2" />
            <p className="text-dark">{ text }</p>
        </NavLink>
    )
}