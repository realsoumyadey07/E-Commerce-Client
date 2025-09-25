import { Link } from "react-router-dom";

export default function WishlistComponent({
  id,
  product_name,
  price,
  product_image
}: {
  id: string;
  product_name: string;
  price: number;
  product_image: string
}) {

  // if (isLoading) return <ReactLoadingComp />;

  return (
    <Link
      to={`/product/${id}`}
      key={id}
      className="bg-white rounded-lg shadow p-4 flex gap-4 cursor-pointer"
    >
      <img
        src={product_image || "/placeholder.png"}
        alt={product_name}
        className="w-20 h-20 object-contain"
      />

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-medium text-gray-800 line-clamp-1">
          {product_name}
        </h3>
        <p className="text-sm text-gray-500">
          ₹{price?.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
}
