import AdminDesktopnav from "@/components/AdminDesktopnav";
import AdminMobilenav from "@/components/AdminMobilenav";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-screen gap-4">
      <AdminDesktopnav />
      <AdminMobilenav />
      <main className="flex h-full w-full">
        <Outlet />
      </main>
    </div>
  );
}
