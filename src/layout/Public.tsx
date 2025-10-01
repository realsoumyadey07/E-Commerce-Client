import PublicDesktopnav from "@/components/PublicDesktopnav";
import PublicMobilenav from "@/components/PublicMobilenav";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { userProfile } from "@/redux/slices/user.slice";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PublicLayout() {
  const { userData, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  if (isLoading) return <ReactLoadingComp />;

  if(!isLoading && userData && location.pathname.startsWith("/authentication")) return <Navigate to="/" replace />;
  
  return (
    <div className="flex flex-col-reverse justify-between md:flex-col w-full h-screen">
      <PublicDesktopnav />
      <PublicMobilenav />
      <main className="flex flex-col w-full h-full pt-0 md:pt-[60px]">
        <Outlet />
      </main>
    </div>
  );
}
