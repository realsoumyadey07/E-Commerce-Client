import { Search, ShoppingCart } from "lucide-react";
import UserComponent from "./UserComponent";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import StoreName from "./StoreName";

export default function PublicDesktopnav() {
  const navigation = useNavigate();
  return (
    <div className="hidden md:flex items-center justify-between h-[60px] px-4 w-full max-w-7xl mx-auto fixed top-0 left-1/2 -translate-x-1/2 bg-white z-50 shadow">
      <StoreName/>

      <div className="flex items-center gap-6 text-gray-700">
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-md w-72"
          onClick={() => navigation("/search")}
        >
          <Input type="text" placeholder="Search here..." />
          <Search className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
        <ShoppingCart
          onClick={() => navigation("/cart")}
          className="w-6 h-6 cursor-pointer hover:text-black"
        />
        <UserComponent />
      </div>
    </div>
  );
}
