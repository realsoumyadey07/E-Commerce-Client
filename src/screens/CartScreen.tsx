import CartComponent from "@/components/CartComponent";
import CategoryHeader from "@/components/CategoryHeader";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllCarts } from "@/redux/slices/cart.slice";
import { useEffect, useMemo } from "react";
import EmptyCart from "@/assets/images/no-item.png";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import MinFooter from "@/components/MinFooter";
import { useNavigate } from "react-router-dom";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  // if (isLoading) return <ReactLoadingComp />;

  return (
    <div className="w-full h-full flex flex-col">
      <CategoryHeader />
      <div className="flex items-center bg-white w-full">
        <ChevronLeft
          className="md:hidden block m-3"
          color="gray"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>

      {!isLoading ? (
        <main className="flex-1 w-full bg-white py-4">
          <div className="max-w-7xl mx-auto w-full px-4 flex flex-col lg:flex-row gap-6">
            {/* LEFT: CART ITEMS */}
            <div className="flex-1">
              {allCarts && allCarts.length > 0 ? (
                <div className="space-y-2">
                  {allCarts.map((cart, index) => (
                    <CartComponent
                      id={cart?._id}
                      productId={cart?.productId?._id}
                      key={index}
                      product_name={cart?.productId?.product_name}
                      price={cart?.productId?.price}
                      product_image={cart?.productId?.product_image}
                      quantity={cart?.quantity}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg space-y-1">
                  <img
                    src={EmptyCart}
                    alt="Empty Cart"
                    className="w-40 h-30 mb-4"
                  />
                  <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                  <p className="text-gray-600 mt-2">
                    Looks like you haven’t added anything to your cart yet.
                  </p>
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
                  <Button className="rounded bg-amber-400 hover:bg-amber-500 w-full md:w-auto">
                    Place Order
                  </Button>
                  <p className="border-t pt-2 text-gray-600 font-semibold flex gap-2 items-center">
                    <ShieldCheck size={30} />
                    Safe and Secure Payments.Easy returns.100% Authentic
                    products.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      ) : (
        <ReactLoadingComp />
      )}

      {/* Footer */}
      <MinFooter />
    </div>
  );
}
