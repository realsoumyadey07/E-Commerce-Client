import Footer from "@/components/Footer";
import ProductComponent from "@/components/ProductComponent";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ChevronLeft, Search } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import NoItem from "@/assets/images/no-item.png";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { userSearchProducts } from "@/redux/slices/product.slice";

export default function SearchScreen() {
  const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const searchKey = searchParams.get("searchKey") || "";

  const { userSearchedProduts, isLoading } = useAppSelector(
    (state) => state.product
  );

  const handleSearch = ()=> {
    if(searchKey) dispatch(userSearchProducts(searchKey));
  }

  if (isLoading) return <ReactLoadingComp />;

  return (
    <div className="h-screen w-full bg-gray-50">
      <div className="flex items-center gap-2 md:hidden w-full p-3 shadow bg-white sticky top-0 z-10">
        <ChevronLeft
          color="gray"
          className="cursor-pointer"
          onClick={() => {
            navigation(-1);
          }}
        />
        <Input
          type="text"
          placeholder="Search here..."
          value={searchKey}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              setSearchParams({ searchKey: value }, { replace: true });
            } else {
              setSearchParams({}, { replace: true });
            }
          }}
          className="flex-1"
        />
        <Search color="gray" className="cursor-pointer" onClick={handleSearch} />
      </div>

      <main className="max-w-7xl mx-auto p-4 h-full">
        {searchKey && (
          <h2 className="text-gray-600 text-sm mb-4">
            Showing {userSearchedProduts?.length || 0} results for{" "}
            <span className="font-semibold text-black">"{searchKey}"</span>
          </h2>
        )}

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userSearchedProduts && userSearchedProduts.length > 0 ? (
            userSearchedProduts.map((product, index) => (
              <Link key={product?._id || index} to={`/product/${product?._id}`}>
                <ProductComponent
                  name={product?.product_name}
                  price={product?.price}
                  image={product?.product_image}
                />
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col justify-center items-center py-10 text-gray-500">
              <img
                src={NoItem}
                alt="no-item"
                className="w-40 h-40 object-contain opacity-80"
              />
              No products found
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
