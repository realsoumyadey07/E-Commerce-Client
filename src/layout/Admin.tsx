import { AppSidebar } from "@/components/app-sidebar";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useAdminav from "@/hooks/useAdminav";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { userProfile } from "@/redux/slices/user.slice";
import { useEffect } from "react";

import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const { isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navData = useAdminav();
  const path = location.pathname;

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  if (isLoading) return <ReactLoadingComp />;

  const isAdmin = window.localStorage.getItem("isAdmin");

  if (isAdmin !== "true")
    return <Navigate to="/authentication" replace />;

  // Find current section and item from useAdminav
  let currentSection, currentItem;
  for (const section of navData) {
    const found = section.items?.find((i) => i.url === path);
    if (found) {
      currentSection = section;
      currentItem = found;
      break;
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {currentSection && (
                  <>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink asChild>
                        <Link
                          to={
                            currentSection.url !== "#"
                              ? currentSection.url
                              : "#"
                          }
                        >
                          {currentSection.title}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {currentItem ? currentItem.title : ""}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
