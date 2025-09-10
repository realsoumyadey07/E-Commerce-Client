import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import CustomDialogbox from "./CustomDialogbox";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { userLogout } from "@/redux/slices/user.slice";
import { useAppSelector } from "@/hooks/useAppSelector";
import toast from "react-hot-toast";

export default function UserComponent() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData, isLoading } = useAppSelector((state) => state.user);

  const logoutPromise = async () => {
    await dispatch(userLogout()).unwrap();
    navigate("/authentication");
  };

  const handleLogout = () => {
    console.log("Handle logout clicked");
    toast.promise(logoutPromise(), {
      loading: "Logging out...",
      success: <b>User logged out successfully!</b>,
      error: (err) => <b>{err || "Could not logout."}</b>,
    });
  };

  if (isLoading) return null;

  return (
    <div className="cursor-pointer">
      {userData ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <User className="w-6 h-6 hover:text-black" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64 p-4 shadow-xl">
            <div className="flex flex-col items-center text-center gap-2">
              <User size={40} className="text-gray-500" />
              <div>
                <p className="font-semibold text-sm">{userData?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {userData?.email}
                </p>
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className="flex flex-col justify-between gap-2 px-1">
              <CustomDialogbox
                buttonName="Logout"
                dialogTitle="Do you really want to logout?"
                extraButton="Logout"
                onClick={handleLogout}
              />
              {userData?.role === "admin" && (
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </Button>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="outline"
          className="bg-white text-black md:bg-gray-900 md:text-white md:hover:bg-gray-950 md:hover:text-white font-semibold"
        >
          <Link to="/authentication">Login</Link>
        </Button>
      )}
    </div>
  );
}
