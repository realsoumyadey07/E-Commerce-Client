import { House, Search, ShoppingCart } from "lucide-react";
import UserComponent from "./UserComponent";
import { Link } from "react-router-dom";

export default function PublicMobilenav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-[60px] bg-white shadow-md flex justify-around items-center md:hidden z-50">
      <Link
        to="/"
        className="flex flex-col items-center text-gray-600 hover:text-black transition"
      >
        <House className="w-6 h-6" />
      </Link>

      <Link
        to="/search"
        className="flex flex-col items-center text-gray-600 hover:text-black transition"
      >
        <Search className="w-6 h-6" />
      </Link>

      <Link
        to="/cart"
        className="flex flex-col items-center text-gray-600 hover:text-black transition"
      >
        <ShoppingCart className="w-6 h-6" />
      </Link>

      <div className="flex flex-col items-center text-gray-600 hover:text-black transition">
        <UserComponent />
      </div>
    </nav>
  );
}
