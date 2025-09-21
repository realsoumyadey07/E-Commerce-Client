import { House, Search, ShoppingCart } from "lucide-react";
import UserComponent from "./UserComponent";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getAllCarts } from "@/redux/slices/cart.slice";

export default function PublicMobilenav() {
  const location = useLocation();
  const { allCarts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCarts());
  }, [dispatch]);
  return (
    <nav
      className={`${
        location?.pathname?.includes("search") && "hidden"
      } fixed bottom-0 left-0 w-full h-[60px] bg-[#ff0000] shadow-md flex justify-around items-center md:hidden z-50`}
    >
      <Link
        to="/"
        className="flex flex-col items-center text-gray-300 hover:text-black transition"
      >
        <House className="w-6 h-6" />
      </Link>

      <Link
        to="/search"
        className="flex flex-col items-center text-gray-300 hover:text-black transition"
      >
        <Search className="w-6 h-6" />
      </Link>

      <Link
        to="/cart"
        className="flex flex-col items-center text-gray-300 hover:text-black transition relative"
      >
        <ShoppingCart className="w-6 h-6" />
        {allCarts && allCarts.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
            {allCarts.length}
          </span>
        )}
      </Link>

      <div className="flex flex-col items-center text-gray-300 hover:text-black transition">
        <UserComponent />
      </div>
    </nav>
  );
}
