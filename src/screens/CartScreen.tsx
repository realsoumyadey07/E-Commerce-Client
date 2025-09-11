import CartComponent from "@/components/CartComponent";
import CategoryHeader from "@/components/CategoryHeader";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllCarts } from "@/redux/slices/cart.slice";
import { useEffect } from "react";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const { allCarts, isLoading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAllCarts());
  }, [dispatch]);

  if (isLoading) return <ReactLoadingComp />;

  return (
    <div className="w-full h-full flex flex-col">
      <CategoryHeader />

      {/* <div className="p-2 mx-auto">
        <h1 className="font-bold text-xl text-red-600">My Carts</h1>
      </div> */}
      <main className="flex-1 w-full bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto w-full px-4">
          {allCarts && allCarts.length > 0 ? (
            <div className="space-y-2">
              {allCarts.map((cart, index) => (
                <CartComponent
                  key={index}
                  product_name={cart?.productId?.product_name}
                  price={cart?.productId?.price}
                  product_image={cart?.productId?.product_image}
                  quantity={parseInt(cart?.quantity)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg shadow-sm">
              <img
                src="/empty-cart.png"
                alt="Empty Cart"
                className="w-40 h-40 mb-4"
              />
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <p className="text-gray-600 mt-2">
                Looks like you haven’t added anything to your cart yet.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#ff0000] text-gray-300 p-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Policies */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Returns Policy
            </a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © 2024-2025{" "}
            <span className="font-semibold text-white">Bijoyjewellers.com</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
