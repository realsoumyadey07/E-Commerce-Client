import { lazy, Suspense, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, CirclePlus } from "lucide-react";
const ProductComponent = lazy(() => import("@/components/ProductComponent"));
import { Link, useNavigate } from "react-router-dom";
const ExploreComponent = lazy(() => import("@/components/ExploreComponent"));
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getAllProducts } from "@/redux/slices/product.slice";
import { getAllCategories } from "@/redux/slices/category.slice";
import NoItem from "../assets/images/no-item.png";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const exploreScrollRef = useRef<HTMLDivElement | null>(null);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { productsData, isLoading } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  const { userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  if (isLoading) return <ReactLoadingComp />;

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollExploreRight = () => {
    if (exploreScrollRef.current) {
      exploreScrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const scrollExploreLeft = () => {
    if (exploreScrollRef.current) {
      exploreScrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-4 md:py-0 overflow-y-auto no-scrollbar pb-[60px] md:pb-0">
      <Link to="/" className="font-semibold text-xl flex md:hidden px-4">
        Realestate
      </Link>

      <main className="w-full max-w-7xl mx-auto relative px-4">
        <h1 className="text-lg md:text-xl font-semibold text-gray-800 my-4">
          Best of us
        </h1>

        <div className="relative">
          <div ref={scrollRef} className="overflow-x-auto no-scrollbar pr-6">
            {productsData && productsData.length > 0 && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
            )}

            <div className="flex items-start gap-4">
              {productsData && productsData.length > 0 ? (
                productsData.map((product, i) => (
                  <div
                    onClick={() => navigation(`/product/${product._id}`)}
                    key={i}
                    className="min-w-[220px] flex-shrink-0 cursor-pointer"
                  >
                    <Suspense fallback={<div>Loading products...</div>}>
                      <ProductComponent
                        name={product?.product_name}
                        rating={4.7}
                        price={product?.price}
                        cirtified={true}
                        image={product?.product_image}
                      />
                    </Suspense>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-col items-center justify-center py-10 text-gray-500">
                  <img
                    src={NoItem}
                    alt="no-item"
                    className="w-32 h-32 object-contain opacity-80"
                  />
                  <p className="text-lg font-medium">No items available.</p>
                  {userData && userData?.role?.toString() === "admin" && (
                    <div
                      className="flex items-center gap-2 text-sm md:text-base cursor-pointer hover:underline text-blue-700 transition"
                      onClick={() => navigation("/admin/add-product")}
                    >
                      <p>To add product click here</p>
                      <CirclePlus className="w-5 h-5" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {productsData && productsData.length > 0 && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>

        <h1 className="text-lg md:text-xl font-semibold text-gray-800 my-4">
          Explore more like this
        </h1>

        <div className="relative">
          <div
            ref={exploreScrollRef}
            className="overflow-x-auto no-scrollbar pr-4"
          >
            {categories && categories.length > 0 ? (
              <button
                onClick={scrollExploreLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10"
              >
                <Suspense fallback={<div>Loading categories...</div>}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
                </Suspense>
              </button>
            ) : null}

            <div className="flex gap-4 min-w-max">
              {categories && categories.length > 0 ? (
                categories.map((i) => <ExploreComponent key={i?._id} category={i} />)
              ) : (
                <div className="w-full flex flex-col items-center justify-center py-10 text-gray-500">
                  <p className="text-lg font-medium">No categories available</p>
                  {userData && userData.role.toString() === "admin" && (
                    <div
                      className="flex items-center gap-2 text-sm md:text-base cursor-pointer hover:underline text-blue-700 transition"
                      onClick={() => navigation("/admin/add-category")}
                    >
                      <p>To add category click here</p>
                      <CirclePlus className="w-5 h-5" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {categories && categories.length > 0 ? (
            <button
              onClick={scrollExploreRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          ) : null}
        </div>
      </main>
      <Footer/>
    </div>
  );
}
