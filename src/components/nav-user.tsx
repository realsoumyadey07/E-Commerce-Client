import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  House
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/hooks/useAppSelector";
import CustomDialogbox from "./CustomDialogbox";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { userLogout } from "@/redux/slices/user.slice";
import toast from "react-hot-toast";

export function NavUser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isMobile } = useSidebar();

  const { userData } = useAppSelector((state) => state.user);

  const logoutPromise = async () => {
    await dispatch(userLogout())
      .unwrap()
      .then(() => navigate("/authentication"));
  };

  const handleLogout = () => {
    toast.promise(logoutPromise(), {
      loading: "Logging out...",
      success: <b>User logged out successfully!</b>,
      error: (err) => <b>{err || "Could not logout."}</b>,
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="/avatars/shadcn.jpg" alt={userData?.name} />
                <AvatarFallback className="rounded-lg">
                  {userData?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userData?.name}</span>
                <span className="truncate text-xs">{userData?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/avatars/shadcn.jpg" alt={userData?.name} />
                  <AvatarFallback className="rounded-lg">
                    {userData?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userData?.name}</span>
                  <span className="truncate text-xs">{userData?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={()=> navigate("/")}>
                <House />
                Home Screen
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <div className="p-2 w-full">
              <CustomDialogbox
                buttonName="Logout"
                dialogTitle="Logout"
                dialogDescription="Do you really want to logout?"
                extraButton="Logout"
                onClick={handleLogout}
                buttonClassName="w-full"
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
