import PublicDesktopnav from "@/components/PublicDesktopnav";
import PublicMobilenav from "@/components/PublicMobilenav";
import LoadingComp from "@/components/LoadingComp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { userProfile } from "@/redux/slices/user.slice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  const { isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  if (isLoading) return <LoadingComp />;
  
  return (
    <div className="flex flex-col-reverse md:flex-col w-full h-full">
      <PublicDesktopnav />
      <PublicMobilenav />
      <main className="flex w-full h-full pt-0 md:pt-[60px]">
        <Outlet />
      </main>
    </div>
  );
}
