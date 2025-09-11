import { Button } from "@/components/ui/button";
import {
  Edit,
  ShoppingCart,
  Trash2,
  IndianRupee,
  Star,
  Share2,
  Heart,
} from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { deleteProduct, productDetails } from "@/redux/slices/product.slice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomDialogbox from "@/components/CustomDialogbox";
import toast from "react-hot-toast";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import Footer from "@/components/Footer";
import { addToCart } from "@/redux/slices/cart.slice";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [wishListed, setWishListed] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { product, isLoading } = useAppSelector((state) => state.product);
  const { userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id) dispatch(productDetails(id));
  }, [id, dispatch]);

  if (isLoading) return <ReactLoadingComp />;

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        No product found
      </div>
    );
  }

  const deleteProductPromise = async () => {
    if (id) await dispatch(deleteProduct(id));
  };

  const handleDeleteProduct = () => {
    if (id)
      toast
        .promise(deleteProductPromise(), {
          loading: "Deleting product...",
          success: <b>Product deleted successfully!</b>,
          error: (err) => <b>{err || "Could not delete product."}</b>,
        })
        .then(() => navigate("/admin/check-product"));
  };

  const cartProductPromise = async () => {
    if (id && userData?._id)
      dispatch(addToCart({ userId: userData._id, productId: id }));
  };
  const handleCartProduct = () => {
    if (id && userData?._id)
      toast
        .promise(cartProductPromise(), {
          loading: "Add product to cart...",
          success: <b>Product added to cart successfully!</b>,
          error: (err) => <b>{err || "Could not add product to the cart!"}</b>,
        })
        .then(() => navigate("/cart"));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto md:my-8 md:py-8">
        <div className="rounded-2xl bg-white overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="flex justify-center items-center">
              <img
                src={product.product_image || "/placeholder.png"}
                alt={product.product_name}
                className="object-cover w-full max-w-md h-80 shadow-md rounded"
              />
            </div>

            <div className="flex flex-col justify-between gap-2">
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {product.product_name}
                </h1>

                <p className="text-gray-600 text-base leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star className="w-5 h-5 fill-yellow-500" />
                      <span>4.7</span>
                    </div>

                    <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs">
                      Certified
                    </span>
                  </div>
                  {userData && userData.role === "user" && (
                    <Heart
                      color={wishListed ? "red" : "gray"}
                      onClick={() => setWishListed(!wishListed)}
                      fill={wishListed ? "red" : "#fff"}
                    />
                  )}
                </div>

                <div className="flex items-center gap-1 text-2xl font-semibold text-blue-600">
                  <IndianRupee className="w-5 h-5" />
                  <span>{product?.price?.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {userData && userData.role === "admin" ? (
                <div className="mt-6 flex flex-col md:flex-row gap-2 w-full">
                  <Button
                    className="flex items-center gap-2 md:w-1/2 w-full cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/edit-product/${product?._id}`)
                    }
                  >
                    <Edit className="h-5 w-5" />
                    <span>Edit product</span>
                  </Button>

                  <CustomDialogbox
                    buttonName="Delete product"
                    dialogTitle="Delete Product"
                    dialogDescription="Do you really want to delete the product?"
                    extraButton="Delete"
                    onClick={handleDeleteProduct}
                    Icon={Trash2}
                    buttonClassName="flex items-center gap-2 w-full md:w-1/2"
                  />
                </div>
              ) : null}

              <div className="flex flex-col gap-2 w-full md:items-center md:justify-between">
                {userData?.role === "user" && (
                  <div className="flex flex-col md:flex-row gap-2 w-full">
                    <Button
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                      onClick={handleCartProduct}
                    >
                      <ShoppingCart />
                      Cart
                    </Button>
                    <Button className="flex-1 bg-amber-400 hover:bg-amber-500">
                      Buy now
                    </Button>
                  </div>
                )}

                <Button className="flex items-center gap-2 w-full">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {!location.pathname.includes("admin") && <Footer />}
    </div>
  );
}
