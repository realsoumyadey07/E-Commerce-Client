import { Search, ShoppingCart } from "lucide-react";
import UserComponent from "./UserComponent";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";

export default function PublicDesktopnav() {
  const navigation = useNavigate();
  return (
    <div className="hidden md:flex items-center justify-between h-[60px] px-8 w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
        Realestate
      </h1>

      <div className="flex items-center gap-6 text-gray-700">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md w-72">
          <Input
            type="text"
            placeholder="Search here..."
          />
          <Search className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
        <ShoppingCart onClick={()=> navigation("/cart")} className="w-6 h-6 cursor-pointer hover:text-black" />
        <UserComponent />
      </div>
    </div>
  );
}
