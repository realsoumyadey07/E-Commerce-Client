import { Button } from "@/components/ui/button";
import {
  Edit,
  ShoppingCart,
  Trash2,
  IndianRupee,
  Star,
  Share2,
} from "lucide-react";
// import LoadingComp from "@/components/LoadingComp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { deleteProduct, productDetails } from "@/redux/slices/product.slice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomDialogbox from "@/components/CustomDialogbox";
import toast from "react-hot-toast";
import ReactLoadingComp from "@/components/ReactLoadingComp";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { product, isLoading } = useAppSelector((state) => state.product);
  const { userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id) dispatch(productDetails(id));
  }, [id, dispatch]);

  if (isLoading) return <ReactLoadingComp/>;

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

  return (
    <div className="container mx-auto h-full flex md:items-center justify-center">
      <div className="rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              src={product.product_image || "/placeholder.png"}
              alt={product.product_name}
              className="object-cover w-full max-w-md h-80 shadow-md rounded-2xl"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between gap-2">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {product.product_name}
              </h1>
              <p className="text-gray-600 text-base leading-relaxed">
                {product.description}
              </p>

              {/* Rating + Certified */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-yellow-600">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <span>4.7</span>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs">
                  Certified
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-1 text-2xl font-semibold text-blue-600">
                <IndianRupee className="w-5 h-5" />
                <span>{product?.price?.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Admin Actions */}
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

            {/* User Actions */}
            <div className="flex flex-col gap-2 w-full md:items-center md:justify-between">
              {/* Left actions */}
              {userData?.role !== "admin" && (
                <div className="flex flex-col md:flex-row md:gap-2 w-full">
                  <CustomDialogbox
                    buttonName="Cart"
                    dialogTitle="Cart product"
                    dialogDescription="Do you want to cart this product"
                    Icon={ShoppingCart}
                    buttonClassName="w-full md:w-1/2 mb-2 md:mb-0"
                  />
                  <Button className="w-full md:w-1/2">Buy now</Button>
                </div>
              )}

              {/* Share button */}
              <Button className="flex items-center gap-2 w-full mt-2 md:mt-0">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
