import PublicDesktopnav from "@/components/PublicDesktopnav";
import PublicMobilenav from "@/components/PublicMobilenav";
import { Outlet } from "react-router-dom";

export default function PublicLayout(){
    return (
        <div className="flex flex-col-reverse md:flex-col w-full h-screen">
            <PublicDesktopnav/>
            <PublicMobilenav/>
            <main className="flex w-full h-full">
                <Outlet/>
            </main>
        </div>
    )
}