import { createOptimizedImage } from "@/lib/cloudinary";
import { AdvancedImage } from "@cloudinary/react";
import { Link } from "react-router-dom";

interface Image {
  url: string;
  public_id: string;
}

export default function WishlistComponent({
  id,
  product_name,
  price,
  image
}: {
  id: string;
  product_name: string;
  price: number;
  image: Image;
}) {

  // if (isLoading) return <ReactLoadingComp />;

  return (
    <Link
      to={`/product/${id}`}
      key={id}
      className="bg-white rounded-lg shadow p-4 flex gap-4 cursor-pointer"
    >
      <AdvancedImage
        cldImg={createOptimizedImage(image.url)}
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
