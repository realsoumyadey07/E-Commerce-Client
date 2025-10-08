import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

export default function AdminUserScreen() {
  return (
    <div className="md:p-6 p-4 space-y-6 w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="md:flex hidden items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Soumyadip Dey
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Registered User</p>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Edit
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Delete
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
        <img
          src="https://via.placeholder.com/120"
          alt="User Avatar"
          className="w-32 h-32 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
        />
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Soumyadip Dey
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            soumyadip@example.com
          </p>
          <p className="text-gray-600 dark:text-gray-300">+91 9876543210</p>
          <span className="inline-block mt-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
            Active
          </span>
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Account Details
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">User ID:</span> U12345
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Joined On:</span> 12 May 2023
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Last Login:</span> 7 Oct 2025,
              10:42 AM
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Role:</span> Customer
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Total Orders:</span> 12
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Total Spent:</span> ₹23,499
            </p>
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Address Details
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Shipping Address
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Barajaguli, Nadia
              <br />
              West Bengal, India - 741221
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Billing Address
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Barajaguli, Nadia
              <br />
              West Bengal, India - 741221
            </p>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <th className="text-left p-3 font-semibold">Order ID</th>
                <th className="text-left p-3 font-semibold">Date</th>
                <th className="text-left p-3 font-semibold">Amount</th>
                <th className="text-left p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "ORD1234",
                  date: "8 Oct 2025",
                  amount: "₹1,899",
                  status: "Delivered",
                },
                {
                  id: "ORD1233",
                  date: "28 Sep 2025",
                  amount: "₹999",
                  status: "Shipped",
                },
                {
                  id: "ORD1232",
                  date: "15 Sep 2025",
                  amount: "₹2,499",
                  status: "Cancelled",
                },
              ].map((order, idx) => (
                <tr
                  key={idx}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition"
                >
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.amount}</td>
                  <td className="p-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-md ${
                        order.status === "Delivered"
                          ? "bg-green-500 text-white"
                          : order.status === "Shipped"
                          ? "bg-blue-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
