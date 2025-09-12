import CartComponent from "@/components/CartComponent";
import CategoryHeader from "@/components/CategoryHeader";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllCarts } from "@/redux/slices/cart.slice";
import { useEffect, useMemo } from "react";
import EmptyCart from "@/assets/images/no-item.png";
import { CirclePlus, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const { allCarts, isLoading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAllCarts());
  }, [dispatch]);

  // Price calculation (mocked discounts for demo)
  const { totalPrice, totalItems, discount } = useMemo(() => {
    const total =
      allCarts?.reduce(
        (acc, item) =>
          acc + (item?.productId?.price || 0) * Number(item?.quantity),
        0
      ) || 0;

    return {
      totalPrice: total,
      totalItems: allCarts?.length || 0,
      discount: Math.round(total * 0.1),
    };
  }, [allCarts]);

  if (isLoading) return <ReactLoadingComp />;

  return (
    <div className="w-full h-full flex flex-col">
      <CategoryHeader />
      <main className="flex-1 w-full bg-gray-50 py-6 md:py-0">
        <div className="max-w-7xl mx-auto w-full px-4 flex flex-col lg:flex-row gap-6">
          {/* LEFT: CART ITEMS */}
          <div className="flex-1">
            {allCarts && allCarts.length > 0 ? (
              <div className="space-y-2">
                {allCarts.map((cart, index) => (
                  <CartComponent
                    id={cart?.productId?._id}
                    key={index}
                    product_name={cart?.productId?.product_name}
                    price={cart?.productId?.price}
                    product_image={cart?.productId?.product_image}
                    quantity={parseInt(cart?.quantity)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg shadow-sm space-y-1">
                <img
                  src={EmptyCart}
                  alt="Empty Cart"
                  className="w-40 h-30 mb-4"
                />
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="text-gray-600 mt-2">
                  Looks like you haven’t added anything to your cart yet.
                </p>
                <Link
                  to="/search"
                  className="text-blue-700 hover:underline flex items-center gap-2"
                >
                  Add products to cart
                  <CirclePlus />
                </Link>
              </div>
            )}
          </div>

          {allCarts && allCarts.length > 0 && (
            <div className="w-full lg:w-1/3 ">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-24 space-y-6">
                <h2 className="text-lg font-semibold border-b pb-2">
                  PRICE DETAILS
                </h2>
                <div className="mt-4 space-y-6 text-sm">
                  <div className="flex justify-between">
                    <span>Price ({totalItems} items)</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total Amount</span>
                    <span>₹{totalPrice - discount}</span>
                  </div>
                </div>
                <p className="text-green-600 mt-3 text-sm font-medium">
                  You will save ₹{discount} on this order
                </p>
                <Button className="rounded bg-amber-400 hover:bg-amber-500">
                  Place Order
                </Button>
                <p className="border-t pt-2 text-gray-600 font-semibold flex gap-2 items-center">
                  <ShieldCheck size={30} />
                  Safe and Secure Payments.Easy returns.100% Authentic products.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#ff0000] text-gray-300 p-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a href="#" className="text-white">
              Returns Policy
            </a>
            <span>|</span>
            <a href="#" className="text-white">
              Terms of Use
            </a>
            <span>|</span>
            <a href="#" className="text-white">
              Security
            </a>
            <span>|</span>
            <a href="#" className="text-white">
              Privacy
            </a>
          </div>
          <p className="text-sm text-gray-400">
            © 2024-2025{" "}
            <span className="font-semibold text-white">Bijoyjewellers.com</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
