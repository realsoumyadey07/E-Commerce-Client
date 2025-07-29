import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import CustomDialogbox from "./CustomDialogbox";

export default function UserComponent() {
  const LoggedIn = true;

  const handleLogout = ()=> {
    console.log("Handle logout clicked");
    
  }

  return (
    <>
      {LoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <User className="w-6 h-6 hover:text-black" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64 p-4 shadow-xl">
            <div className="flex flex-col items-center text-center gap-2">
              <User size={40} className="text-gray-500" />
              <div>
                <p className="font-semibold text-sm">Soumyadip Dey</p>
                <p className="text-xs text-muted-foreground">
                  soumyadipdey802@gmail.com
                </p>
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className="flex flex-col justify-between gap-2 px-1">
              <CustomDialogbox buttonName="Logout" dialogTitle="Do you really want to logout?" extraButton="Logout" onClick={handleLogout}/>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Admin
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="outline">
          <Link to="/authentication">Login</Link>
        </Button>
      )}
    </>
  );
}
