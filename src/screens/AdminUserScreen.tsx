import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getUserProfileById } from "@/redux/slices/user.slice";
import { EllipsisVertical } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminUserScreen() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { userDetailsForAdmin, isUserDetailsForAdminLoading } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (id) dispatch(getUserProfileById(id));
  }, [id, dispatch]);

  if (isUserDetailsForAdminLoading) return <UserDetailsSkeleton />;

  return (
    <>
      {userDetailsForAdmin && (
        <div className="md:p-6 p-4 space-y-6">
          <div className="md:flex hidden items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {userDetailsForAdmin.name.charAt(0).toUpperCase() +
                  userDetailsForAdmin.name.slice(1)}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Registered User
              </p>
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

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
            <img
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              alt="User Avatar"
              className="w-30 h-30 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
            />
            <div className="space-y-2 text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {userDetailsForAdmin.name.charAt(0).toUpperCase() +
                  userDetailsForAdmin.name.slice(1)}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {userDetailsForAdmin.email}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {userDetailsForAdmin.address?.phoneNumber
                  ? userDetailsForAdmin.address?.phoneNumber
                  : "No phone number!"}
              </p>
              <span className="inline-block mt-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Account Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">User ID:</span>{" "}
                  {userDetailsForAdmin._id}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Joined On:</span>{" "}
                  {new Date(userDetailsForAdmin.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Role:</span>{" "}
                  {userDetailsForAdmin.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Total Orders:</span>{" "}
                  {userDetailsForAdmin.orders?.length}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Total Spent:</span> ₹
                  {userDetailsForAdmin.orders?.reduce(
                    (sum, order) => sum + order.totalAmount,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Address Details
            </h2>
            {userDetailsForAdmin.address ? (
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Shipping Address
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {userDetailsForAdmin.address.city}, {userDetailsForAdmin.address.district}
                    <br />
                    {userDetailsForAdmin.address.state}, India - {userDetailsForAdmin.address.pincode}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Billing Address
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {userDetailsForAdmin.address.city}, {userDetailsForAdmin.address.district}
                    <br />
                    {userDetailsForAdmin.address.state}, India - {userDetailsForAdmin.address.pincode}
                  </p>
                </div>
              </div>
            ) : (
              <p>No address fond!</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Recent Orders
            </h2>
            <div className="overflow-x-auto">
              <Table className="min-w-full text-sm">
                <TableCaption className="text-gray-500 dark:text-gray-400">
                  {userDetailsForAdmin.orders
                    ? "List of user orders."
                    : "No order has been placed yet!"}
                </TableCaption>

                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <TableHead className="text-left font-semibold">
                      Order ID
                    </TableHead>
                    <TableHead className="text-left font-semibold">
                      Date
                    </TableHead>
                    <TableHead className="text-left font-semibold">
                      Amount
                    </TableHead>
                    <TableHead className="text-left font-semibold">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {userDetailsForAdmin.orders ? (
                    userDetailsForAdmin.orders.map((order, idx) => (
                      <TableRow
                        key={idx}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition"
                      >
                        <TableCell className="p-3">{order._id}</TableCell>
                        <TableCell className="p-3">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="p-3">
                          {order.totalAmount}
                        </TableCell>
                        <TableCell className="p-3">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              order.status === "delivered"
                                ? "bg-green-500 text-white"
                                : order.status === "shipped"
                                ? "bg-blue-500 text-white"
                                : order.status === "pending"
                                ? "bg-orange-400 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-4 text-gray-500"
                      >
                        No order has been placed yet!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function UserDetailsSkeleton() {
  return (
    <div className="md:p-6 p-4 space-y-6">
      {/* Header */}
      <div className="md:flex hidden items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-6 rounded-md" />
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
        <Skeleton className="w-32 h-32 rounded-full" />
        <div className="space-y-3 text-center sm:text-left w-full sm:w-auto">
          <Skeleton className="h-5 w-40 mx-auto sm:mx-0" />
          <Skeleton className="h-4 w-56 mx-auto sm:mx-0" />
          <Skeleton className="h-4 w-40 mx-auto sm:mx-0" />
          <Skeleton className="h-5 w-16 rounded-md mx-auto sm:mx-0" />
        </div>
      </div>

      {/* Account Details Section */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          {[...Array(2)].map((_, colIdx) => (
            <div key={colIdx} className="space-y-3">
              {[...Array(3)].map((_, idx) => (
                <Skeleton key={idx} className="h-4 w-48" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Address Details Section */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <Skeleton className="h-5 w-36 mb-4" />
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          {[...Array(2)].map((_, idx) => (
            <div key={idx}>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-56 mb-1" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <Skeleton className="h-5 w-40 mb-4" />
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-md mb-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="grid grid-cols-4 gap-4 p-3 border-b dark:border-gray-700"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
