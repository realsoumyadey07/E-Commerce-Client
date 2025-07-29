import PublicDesktopnav from "@/components/PublicDesktopnav";
import PublicMobilenav from "@/components/PublicMobilenav";
import { Outlet } from "react-router-dom";

export default function PublicLayout(){
    return (
        <div className="flex flex-col-reverse md:flex-col w-full h-full">
            <PublicDesktopnav/>
            <PublicMobilenav/>
            <main className="flex w-full h-full pt-0 md:pt-[60px]">
                <Outlet/>
            </main>
        </div>
    )
}