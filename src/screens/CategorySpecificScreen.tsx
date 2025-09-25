import Footer from "@/components/Footer";
import ProductComponent from "@/components/ProductComponent";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllCategoryProducts } from "@/redux/slices/product.slice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmptyCart from "@/assets/images/no-item.png";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CategorySpecificScreen() {
  const { category } = useParams<{ category: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categorySpecificProducts, isLoading } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (category) dispatch(getAllCategoryProducts(category));
  }, [dispatch, category]);

  if (isLoading) return <ReactLoadingComp />;

  return (
    <div className="flex flex-col min-h-screen w-full justify-between">
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
          placeholder="Search here..."
          className="flex-1"
        />
        <Search
          color="gray"
          className="cursor-pointer"
        />
      </div>
      <main className="flex-1 w-full min-h-screen bg-white py-2 md:py-6">
        <div className="max-w-7xl mx-auto w-full md:px-4 px-2">
          {categorySpecificProducts && categorySpecificProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {categorySpecificProducts.map((product) => (
                <div
                  key={product._id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <ProductComponent
                    name={product.product_name}
                    image={product.product_image}
                    price={product.price}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg space-y-2">
              <img
                src={EmptyCart}
                alt="Empty Cart"
                className="w-40 h-30 mb-4"
              />
              <h2 className="text-2xl font-semibold">No product found here!</h2>
              <p className="text-gray-600 mt-2">
                Looks like this category doesn&apos;t have any product assigned yet!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
