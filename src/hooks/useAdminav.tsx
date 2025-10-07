import { useLocation } from "react-router-dom";
import {
  ChartBarStacked,
  IdCardLanyard,
  ListOrdered,
  PackageSearch,
  Store,
} from "lucide-react";

export default function useAdminav() {
  const location = useLocation();
  const path = location.pathname;

  const data = [
    {
      title: "Order Section",
      url: "#",
      icon: ListOrdered,
      items: [
        { title: "Check Order", url: "/admin/check-order" },
      ],
    },
    {
      title: "Category Section",
      url: "#",
      icon: ChartBarStacked,
      items: [
        { title: "Add Category", url: "/admin/add-category" },
        { title: "Check Category", url: "/admin/check-category" },
      ],
    },
    {
      title: "Product Section",
      url: "#",
      icon: PackageSearch,
      items: [
        { title: "Add Product", url: "/admin/add-product" },
        { title: "Check Product", url: "/admin/check-product" },
      ],
    },
    {
      title: "Employee Section",
      url: "#",
      icon: IdCardLanyard,
      items: [
        { title: "Add Employee", url: "/admin/add-employee" },
        { title: "Edit Employee", url: "/admin/edit-employee" },
        { title: "Check Employee", url: "/admin/check-employee" },
      ],
    },
    {
      title: "Vendor Section",
      url: "#",
      icon: Store,
      items: [
        { title: "Add Vendor", url: "/admin/add-vendor" },
        { title: "Edit Vendor", url: "/admin/edit-vendor" },
        { title: "Check Vendor", url: "/admin/check-vendor" },
      ],
    },
  ];

  // Add isActive automatically
  const withActiveFlag = data.map((section) => {
    const isSectionActive = section.items?.some((sub) => sub.url === path);
    return {
      ...section,
      isActive: isSectionActive,
      items: section.items?.map((sub) => ({
        ...sub,
        isActive: sub.url === path,
      })),
    };
  });

  return withActiveFlag;
}
