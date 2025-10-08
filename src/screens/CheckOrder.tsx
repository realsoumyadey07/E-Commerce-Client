import LoadingComp from "@/components/LoadingComp";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllOrders } from "@/redux/slices/order.slice";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckOrder() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, allOredrsForAdmin } = useAppSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (isLoading) return <LoadingComp />;

  return (
    <div className="px-6 md:py-8 w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 min-h-screen transition-colors">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight mb-2">
          Orders Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Manage and track all your customer orders in one place.
        </p>
      </header>

      {/* Search Bar */}
      <section className="w-full md:w-1/3 flex items-center relative mb-6">
        <Search className="absolute left-3 text-gray-400 dark:text-gray-500" size={20} />
        <Input
          type="text"
          placeholder="Search by customer or product..."
          className="pl-10 w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </section>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <Table className="min-w-full">
          <TableCaption className="text-gray-500 dark:text-gray-400">
            A list of your recent orders.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead className="text-gray-700 dark:text-gray-300">Customer</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Product</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Date</TableHead>
              <TableHead className="text-right text-gray-700 dark:text-gray-300">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allOredrsForAdmin && allOredrsForAdmin.length > 0 ? (
              allOredrsForAdmin.map((order) => (
                <TableRow
                  key={order._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors cursor-pointer"
                  onClick={()=> navigate(`/admin/order-details/${order._id}`)}
                >
                  <TableCell className="font-medium text-gray-800 dark:text-gray-100">
                    {order.userId?.name || "Unknown"}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {order.products.map((i) => i.productId.product_name).join(", ")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-800 dark:text-gray-100">
                    ₹{order.totalAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
