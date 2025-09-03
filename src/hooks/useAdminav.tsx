import { IdCardLanyard, ListOrdered, PackageSearch, Store } from "lucide-react";

export default function useAdminav() {
  return [
    {
      title: "Order Section",
      icon: <ListOrdered />,
      subMenu: [
        {
          title: "Check Order",
          href: "/admin/check-order",
        },
      ],
    },
    {
      title: "Product Section",
      icon: <PackageSearch />,
      subMenu: [
        {
          title: "Add Product",
          href: "/admin/add-product",
        },
        {
          title: "Check Product",
          href: "/admin/check-product",
        },
      ],
    },
    {
      title: "Employee Section",
      icon: <IdCardLanyard />,
      subMenu: [
        {
          title: "Add Employee",
          href: "/admin/add-employee",
        },
        { title: "Edit Employee", href: "/admin/edit-employee" },
        { title: "Check Employee", href: "/admin/check-employee" },
      ],
    },
    {
      title: "Vendor Section",
      icon: <Store />,
      subMenu: [
        { title: "Add Vendor", href: "/admin/add-vendor" },
        { title: "Edit Vendor", href: "/admin/edit-vendor" },
        { title: "Check Vendor", href: "/admin/check-vendor" },
      ],
    },
  ];
}
