import { Search, ShoppingCart } from "lucide-react";
import UserComponent from "./UserComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import StoreName from "./StoreName";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { userSearchProducts } from "@/redux/slices/product.slice";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllCarts } from "@/redux/slices/cart.slice";

export default function PublicDesktopnav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.get("searchKey") || "";
  const [useSearchKey, setUseSearchKey] = useState<string>(searchKey || "");
  const {allCarts} = useAppSelector(state=> state.cart);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(getAllCarts());
  }, [dispatch])

  const handleSearch = async () => {
    if (searchKey) {
      await dispatch(userSearchProducts(searchKey)).then(() => {
        navigation(`/search?searchKey=${searchKey}`);
      });
    }
  };
  return (

    <div className="hidden md:flex items-center justify-between h-[40px] md:h-[60px] px-4 w-full max-w-7xl mx-auto fixed top-0 left-1/2 -translate-x-1/2 bg-white z-50">
      <StoreName />

      <div className="flex items-center gap-6 text-gray-700">
        <div className="relative flex items-center px-2 py-1 rounded-md w-72">
          <Input
            type="text"
            placeholder="Search here..."
            onChange={(e) => {
              setUseSearchKey(e.target.value);
              if (e.target.value) {
                setSearchParams(
                  { searchKey: e.target.value },
                  { replace: true }
                );
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
        <div className="relative cursor-pointer" onClick={() => navigation("/cart")}>
          <ShoppingCart
          onClick={() => navigation("/cart")}
          className="w-6 h-6 hover:text-black"
        />
        {
          allCarts && allCarts?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {allCarts.length}
            </span>
          )
        }
        </div>
        
        <UserComponent />
      </div>
    </div>

  );
}
