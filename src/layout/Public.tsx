import PublicDesktopnav from "@/components/PublicDesktopnav";
import PublicMobilenav from "@/components/PublicMobilenav";
// import LoadingComp from "@/components/LoadingComp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { userProfile } from "@/redux/slices/user.slice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  // const { isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  // if (isLoading) return <ReactLoadingComp />;
  
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
