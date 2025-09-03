import AdminDesktopnav from "@/components/AdminDesktopnav";
import AdminMobilenav from "@/components/AdminMobilenav";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <AdminDesktopnav />
      <AdminMobilenav />
      <main className="flex h-full w-full">
        <Outlet />
      </main>
    </div>
  );
}
