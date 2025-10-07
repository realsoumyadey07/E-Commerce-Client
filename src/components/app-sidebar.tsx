"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import useAdminav from "@/hooks/useAdminav"

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: AudioWaveform,
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: Command,
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Order Section",
//       url: "#",
//       icon: ListOrdered,
//       isActive: true,
//       items: [
//         {
//           title: "Check Order",
//           url: "/admin/check-order",
//         },
//       ],
//     },
//     {
//       title: "Category Section",
//       url: "#",
//       icon: ChartBarStacked,
//       items: [
//         {
//           title: "Add Category",
//           url: "/admin/add-category",
//         },
//         {
//           title: "Check Category",
//           url: "/admin/check-category",
//         },
//       ],
//     },
//     {
//       title: "Product Section",
//       url: "#",
//       icon: PackageSearch,
//       items: [
//         {
//           title: "Add Product",
//           url: "/admin/add-product",
//         },
//         {
//           title: "Check Product",
//           url: "/admin/check-product",
//         }
//       ],
//     },
//     {
//       title: "Employee Section",
//       url: "#",
//       icon: IdCardLanyard,
//       items: [
//         {
//           title: "Add Employee",
//           url: "/admin/add-employee",
//         },
//         {
//           title: "Edit Employee",
//           url: "/admin/edit-employee",
//         },
//         {
//           title: "Check Employee",
//           url: "/admin/check-employee",
//         }
//       ],
//     },
//     {
//       title: "Vendor Section",
//       url: "#",
//       icon: Store,
//       items: [
//         {
//           title: "Add Vendor",
//           url: "/admin/add-vendor",
//         },
//         {
//           title: "Edit Vendor",
//           url: "/admin/edit-vendor",
//         },
//         {
//           title: "Check Vendor",
//           url: "/admin/check-vendor",
//         }
//       ],
//     },
//   ],
// }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useAdminav();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
