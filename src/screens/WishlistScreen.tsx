import MinFooter from "@/components/MinFooter";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllWishlists } from "@/redux/slices/wishlist.slice";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import { Search } from "lucide-react";
import { useEffect } from "react";
import WishlistComponent from "@/components/WishlistComponent";
import EmptyCart from "@/assets/images/no-item.png";
import { Input } from "@/components/ui/input";

export default function WishlistScreen() {
  const dispatch = useAppDispatch();
  const { allWishlists, isLoadingList } = useAppSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(getAllWishlists());
  }, [dispatch]);

  if (isLoadingList) return <ReactLoadingComp />;

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-gray-50">
      <main className="max-w-7xl w-full mx-auto p-4 flex gap-6">
        {/* Wishlist List */}
        <section className="flex-1 space-y-4">
          {/* Search bar */}
          <div className="flex justify-between items-center bg-white p-3 rounded-lg">
            <Input
              type="text"
              placeholder="Search your wishlist here"
              className="flex-1 rounded px-3 py-2 text-sm"
            />
            <button className="ml-2 px-4 py-2 hidden md:block bg-blue-600 text-white rounded text-sm">
              Search Wishlist
            </button>
            <button className="ml-2 block md:hidden px-4 py-2 bg-blue-600 text-white rounded text-sm">
              <Search />
            </button>
          </div>

          {/* Wishlist Items */}
          {allWishlists && allWishlists.products?.length > 0 ? (
            allWishlists.products.map((product) => (
              <WishlistComponent productId={product} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg space-y-1">
              <img
                src={EmptyCart}
                alt="Empty Cart"
                className="w-40 h-30 mb-4"
              />
              <h2 className="text-2xl font-semibold">Your wishlist is empty!</h2>
              <p className="text-gray-600 mt-2">
                Looks like you haven’t added anything to your wishlist yet.
              </p>
            </div>
          )}
        </section>
      </main>
      <MinFooter />
    </div>
  );
}
