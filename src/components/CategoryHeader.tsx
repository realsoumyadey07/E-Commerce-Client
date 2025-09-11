import { Link } from "react-router-dom";

export default function CategoryHeader() {
  return (
    <ul className="hidden md:flex items-center gap-4 my-4 text-red-600 mx-auto">
      <Link to="/" className="hover:underline cursor-pointer font-semibold text-xl">
        Home
      </Link>
      <Link to="/gold-section" className="hover:underline cursor-pointer text-xl font-semibold">
        Gold
      </Link>
      <Link to="/diamond-section" className="hover:underline cursor-pointer font-semibold text-xl">
        Diamond
      </Link>
      <Link to="/silver-section" className="hover:underline cursor-pointer font-semibold text-xl">
        Silver
      </Link>
    </ul>
  );
}
