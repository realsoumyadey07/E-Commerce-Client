import MinFooter from "@/components/MinFooter";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getMyOrders } from "@/redux/slices/order.slice";
import { ChevronLeft, Search } from "lucide-react";
import { useEffect } from "react";
import EmptyCart from "@/assets/images/no-item.png";
import { useNavigate } from "react-router-dom";

export default function OrderScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { allOrders, isLoading } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (isLoading) return <ReactLoadingComp />;

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-gray-50">
      <main className="max-w-7xl w-full mx-auto p-4 flex gap-6">
        {/* Orders List */}
        <section className="flex-1 space-y-4">
          <div className="flex justify-between items-center bg-white p-2 rounded-lg gap-2">
            <ChevronLeft
              color="gray"
              onClick={() => {
                navigate(-1);
              }}
            />
            <Input
              type="text"
              placeholder="Search your wishlist here"
              className="flex-1 rounded px-3 py-2 text-sm"
            />
            <button className="ml-2 px-4 py-2 hidden md:block bg-blue-600 text-white rounded text-sm">
              Search Order
            </button>
            <Search className="md:hidden block" color="gray" />
          </div>

          {/* Orders */}
          {allOrders && allOrders?.length > 0 ? (
            allOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow p-4 flex gap-4"
              >
                {/* Product image */}
                <img
                  src={
                    order.products[0]?.productId?.product_image ||
                    "/placeholder.png"
                  }
                  alt={order.products[0]?.productId?.product_name}
                  className="w-20 h-20 object-contain"
                />

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 line-clamp-1">
                    {order.products[0]?.productId?.product_name}
                  </h3>
                  <p className="text-sm text-gray-500">₹{order.totalAmount}</p>
                  <p className="text-sm text-gray-500">
                    {order.products.length} item(s)
                  </p>

                  {/* Status */}
                  {order.status === "delivered" ? (
                    <p className="text-green-600 text-sm mt-1">
                      ● Delivered on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  ) : order.status === "cancelled" ? (
                    <p className="text-red-600 text-sm mt-1">
                      ● Refund completed
                    </p>
                  ) : (
                    <p className="text-yellow-600 text-sm mt-1">
                      ● {order.status}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg space-y-1">
              <img
                src={EmptyCart}
                alt="Empty Cart"
                className="w-40 h-30 mb-4"
              />
              <h2 className="text-2xl font-semibold">
                Your Order list is empty!
              </h2>
              <p className="text-gray-600 mt-2">
                Looks like you haven’t order anything yet.
              </p>
            </div>
          )}
        </section>
      </main>
      <MinFooter />
    </div>
  );
}
