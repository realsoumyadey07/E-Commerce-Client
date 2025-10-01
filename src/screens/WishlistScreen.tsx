import MinFooter from "@/components/MinFooter";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllWishlists } from "@/redux/slices/wishlist.slice";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import { ChevronLeft, Search } from "lucide-react";
import { useEffect } from "react";
import WishlistComponent from "@/components/WishlistComponent";
import EmptyCart from "@/assets/images/no-item.png";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function WishlistScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { allWishlists, isLoadingList } = useAppSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(getAllWishlists());
  }, [dispatch]);

  if (isLoadingList) return <ReactLoadingComp />;

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-white">
      <main className="max-w-7xl w-full mx-auto flex gap-6">
        {/* Wishlist List */}
        <section className="flex-1 space-y-4">
          {/* Search bar */}
          <div className="flex items-center gap-2 md:hidden w-full p-3 shadow bg-white sticky top-0 z-10">
            <ChevronLeft
              color="gray"
              className="cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}
            />
            <Input
              type="text"
              placeholder="Search your wishlist here"
              className="flex-1"
            />
            <button className="ml-2 px-4 py-2 hidden md:block bg-blue-600 text-white rounded text-sm">
              Search Wishlist
            </button>
            <Search className="md:hidden block cursor-pointer" color="gray" />
          </div>

          {/* Wishlist Items */}
          {allWishlists && allWishlists.products?.length > 0 ? (
            allWishlists.products.map((product) => (
              <WishlistComponent
                key={product?._id}
                id={product?._id}
                product_name={product?.product_name}
                image={product?.images?.[0]}
                price={product?.price}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg space-y-1">
              <img
                src={EmptyCart}
                alt="Empty Cart"
                className="w-40 h-30 mb-4"
              />
              <h2 className="text-2xl font-semibold">
                Your wishlist is empty!
              </h2>
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
