import { House, ShoppingCart } from "lucide-react";
import UserComponent from "./UserComponent";
import { Link } from "react-router-dom";

export default function PublicMobilenav() {
  return (
    <div className="flex md:hidden gap-2 w-full justify-around h-[70px] items-center">
      <div>
        <House />
      </div>
      {/* <Link to="/">
        <Search />
      </Link> */}
      <Link to="/cart">
        <ShoppingCart />
      </Link>
      <div>
        <UserComponent />
      </div>
    </div>
  );
}
