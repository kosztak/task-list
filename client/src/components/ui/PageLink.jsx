import { Link } from "react-router-dom";

export default function PageLink({ to, children, ...props }) {
  return (
    <Link className="underline text-dark hover:text-orange" to={to} {...props}>
      {children}
    </Link>
  );
}
