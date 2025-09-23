import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { productDetails } from "@/redux/slices/product.slice";
import { useEffect } from "react";
import ReactLoadingComp from "./ReactLoadingComp";
import { Link } from "react-router-dom";

export default function WishlistComponent({
  productId,
}: {
  productId: string;
}) {
  const dispatch = useAppDispatch();
  const { product, isLoading } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(productDetails(productId));
  }, [dispatch, productId]);

  if (isLoading) return <ReactLoadingComp />;
  return (
    <Link
      to={`/product/${product?._id}`}
      key={product?._id}
      className="bg-white rounded-lg shadow p-4 flex gap-4 cursor-pointer"
    >
      {/* Product image */}
      <img
        src={product?.product_image || "/placeholder.png"}
        alt={product?.product_name}
        className="w-20 h-20 object-contain"
      />

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-medium text-gray-800 line-clamp-1">
          {product?.product_name}
        </h3>
        <p className="text-sm text-gray-500">
          ₹{product?.price?.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
}
