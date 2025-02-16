import { Link } from "react-router-dom";

export default function PageLink({to, children, ...props }) {
    return(
        <Link className="underline text-gray-900 hover:text-amber-600" to={to} {...props}>
            { children }
        </Link>
    );
}