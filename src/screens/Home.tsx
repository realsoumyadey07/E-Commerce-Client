import { lazy, Suspense, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, CirclePlus, Menu } from "lucide-react";
const ProductComponent = lazy(() => import("@/components/ProductComponent"));
import { useNavigate } from "react-router-dom";
const ExploreComponent = lazy(() => import("@/components/ExploreComponent"));
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getAllProducts } from "@/redux/slices/product.slice";
import { getAllCategories } from "@/redux/slices/category.slice";
import NoItem from "../assets/images/no-item.png";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import Footer from "@/components/Footer";
import StoreName from "@/components/StoreName";
import ImageSlider from "@/components/ImageSlider";
import first from "@/assets/images/new.jpg";
import second from "@/assets/images/new1.jpg";
import third from "@/assets/images/new2.jpg";
import CategoryHeader from "@/components/CategoryHeader";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import AnimationPageWrapper from "@/components/AnimationPageWrapper";
import { AdvancedImage } from "@cloudinary/react";
import { createOptimizedImage } from "@/lib/cloudinary";
import forth from "@/assets/images/simran-sood-Xm9M3H_Jtuc-unsplash.jpg";
import sixth from "@/assets/images/dollar-gill-oH-PNVWykUo-unsplash.jpg";

const imageSlids = [first, second, third];

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
    <AnimationPageWrapper>
      <div className="w-full h-full flex flex-col justify-between py-4 md:py-0 overflow-y-auto no-scrollbar pb-[60px] md:pb-0">
        <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-20 md:hidden">
          <div className="flex justify-between items-center p-4">
            <StoreName />

            <Drawer>
              <DrawerTrigger asChild>
                <button className="rounded-md hover:bg-gray-100 transition">
                  <Menu className="w-6 h-6 text-red-600" />
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="font-contentHeader text-gray-700">
                    Choose any category from here
                  </DrawerTitle>
                  <DrawerDescription>
                    Select from the options below
                  </DrawerDescription>
                </DrawerHeader>

                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {categories &&
                      categories.map(
                        (category, index) =>
                          category.is_header && (
                            <CarouselItem
                              key={index}
                              onClick={() =>
                                navigation(`/${category._id}/products`)
                              }
                            >
                              <div className="p-1">
                                <Card>
                                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                    <p className="my-2 text-red-600 font-bold">
                                      {category.category_name}
                                    </p>
                                    <AdvancedImage
                                      cldImg={createOptimizedImage(
                                        category.category_images?.[0]?.url || ""
                                      )}
                                      className="rounded"
                                    />
                                  </CardContent>
                                </Card>
                              </div>
                            </CarouselItem>
                          )
                      )}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </DrawerContent>
            </Drawer>
          </div>
        </header>

        <CategoryHeader />

        <main className="w-full max-w-7xl mx-auto relative md:px-4 pt-3 pb-2">
          {imageSlids && <ImageSlider images={imageSlids} />}
          <h1 className="font-contentHeader text-center py-4 text-lg md:text-2xl text-gray-600">Check our <span className="text-red-600">wedding</span> collections...</h1>
          <div className="flex flex-col md:flex-row w-full gap-4 my-8 mt-0 px-4 md:px-0 md:mt-0">
            <img
              src={forth}
              alt="catelog"
              className="w-full md:w-2/5 h-[280px] object-cover rounded-lg shadow-md"
            />
            <img
              src={sixth}
              alt="catelog"
              className="w-full md:w-3/5 h-[280px] object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="px-2">
            <h1 className="text-lg md:text-3xl text-gray-800 my-4 text-center font-contentHeader font-[400]">
              Explore{" "}
              <span className="text-yellow-600">our new collections</span>
            </h1>
            <div className="relative">
              <div
                ref={scrollRef}
                className="overflow-x-auto no-scrollbar pr-6"
              >
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
                        className="w-[200px] h-[300px] flex-shrink-0 cursor-pointer py-4"
                      >
                        <Suspense fallback={<div>Loading products...</div>}>
                          <ProductComponent
                            name={product?.product_name}
                            rating={4.7}
                            price={product?.price}
                            cirtified={true}
                            image={product?.images[i]}
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

            <h1 className="text-lg md:text-3xl text-center  my-4 font-contentHeader font-[400]">
              Explore <span className="text-yellow-600">more like this</span>
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
                    categories.map((i) => (
                      <ExploreComponent key={i?._id} category={i} />
                    ))
                  ) : (
                    <div className="w-full flex flex-col items-center justify-center py-10 text-gray-500">
                      <img
                        src={NoItem}
                        alt="no-item"
                        className="w-32 h-32 object-contain opacity-80"
                      />
                      <p className="text-lg font-medium">
                        No categories available
                      </p>
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
          </div>
        </main>
        <Footer />
      </div>
    </AnimationPageWrapper>
  );
}
