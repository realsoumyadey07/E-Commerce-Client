import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { createOptimizedImage } from "@/lib/cloudinary";
import { productDetails } from "@/redux/slices/product.slice";
import { AdvancedImage } from "@cloudinary/react";
import { EllipsisVertical } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AdminProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product, isLoading } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (id) dispatch(productDetails(id));
  }, [id, dispatch]);

  if (isLoading) return <ProductDetailsLoading />;

  return (
    <>
      {product && (
        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {product?.product_name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Product / {product.category_id.category_name}
              </p>
            </div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Edit
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Delete
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Product Images
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {product.images.map((i, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <AdvancedImage cldImg={createOptimizedImage(i.url)} className="object-cover w-full h-40" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Product Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Price:</span> ₹{product.price}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Stock:</span> {product.quantity < 2 ? <>{product.quantity} unit</>: <>{product.quantity} units</>}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Status:</span>{" "}
                  {product.quantity > 0? <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                    In Stock
                  </span>: <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                    Out of Stock
                  </span>}
                  
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Category:</span> {product.category_id.category_name}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Wireless", "Bluetooth", "Noise Cancelling", "Headphones"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProductDetailsLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Product Images */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <Skeleton className="h-6 w-20 mb-4" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
