import { NavLink } from "react-router-dom";

export default function NavButton({
  text,
  iconComponent,
  to,
  isHeader = true,
}) {
  const defaultCSS = `flex items-center ${isHeader ? "max-xl:flex-col xl:gap-2 max-md:hidden" : "h-6"}`;

  const IconComponent = iconComponent;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? defaultCSS + " rounded-lg bg-white" : defaultCSS
      }
    >
      <IconComponent className="aspect-square h-10" />
      <p className="text-dark">{text}</p>
    </NavLink>
  );
}
