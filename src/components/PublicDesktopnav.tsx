import { Search, ShoppingCart } from "lucide-react";
import UserComponent from "./UserComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import StoreName from "./StoreName";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { userSearchProducts } from "@/redux/slices/product.slice";
import { useState } from "react";

export default function PublicDesktopnav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.get("searchKey") || "";
    const [useSearchKey, setUseSearchKey] = useState<string>(searchKey || "");


  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    if (searchKey) {
      await dispatch(userSearchProducts(searchKey)).then(() => {
        navigation(`/search?searchKey=${searchKey}`);
      });
    }
  };
  return (
      <div className="hidden md:flex items-center justify-between h-[60px] px-4 w-full max-w-7xl mx-auto fixed top-0 left-1/2 -translate-x-1/2 bg-white z-50 shadow">
        <StoreName />

        <div className="flex items-center gap-6 text-gray-700">
          <div className="relative flex items-center px-2 py-1 rounded-md w-72">
            <Input
              type="text"
              placeholder="Search here..."
              onChange={(e) => {
                setUseSearchKey(e.target.value);
                if (e.target.value) {
                  setSearchParams({ searchKey: e.target.value }, { replace: true });
                } else {
                  setSearchParams({}, { replace: true });
                }
              }}
              value={useSearchKey}
              className="w-full"
            />
            <Search
              className="absolute right-5 text-gray-400 cursor-pointer"
              size={20}
              onClick={handleSearch}
            />
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
