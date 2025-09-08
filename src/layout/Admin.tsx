import AdminDesktopnav from "@/components/AdminDesktopnav";
import AdminMobilenav from "@/components/AdminMobilenav";
// import LoadingComp from "@/components/LoadingComp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { userProfile } from "@/redux/slices/user.slice";
import { useEffect } from "react";

import { Navigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const { userData, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  // if(isLoading) return <ReactLoadingComp/>

  if (!isLoading && userData && userData?.role !== "admin")
    return <Navigate to="/" replace />;

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
