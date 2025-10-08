import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getAllProducts, searchProduct } from "@/redux/slices/product.slice";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { createOptimizedImage } from "@/lib/cloudinary";

export default function CheckProduct() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { productsData } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="px-6 md:py-8 w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 min-h-screen transition-colors">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight mb-2">
          Product Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          View, search, and manage all your products.
        </p>
      </header>

      {/* Search */}
      <section className="w-full md:w-1/3 flex items-center relative mb-6">
        <Search className="absolute left-3 text-gray-400 dark:text-gray-500" size={20} />
        <Input
          type="text"
          placeholder="Search product..."
          value={searchKeyword}
          onChange={(e) => {
            const value = e.target.value;
            setSearchKeyword(value);
            if (value.trim() === "") {
              dispatch(getAllProducts());
            } else {
              dispatch(searchProduct(value));
            }
          }}
          className="pl-10 w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </section>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <Table className="min-w-full">
          <TableCaption className="text-gray-500 dark:text-gray-400">
            {productsData && productsData.length > 0
              ? "A list of your available products."
              : "No products found."}
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">
                Photo
              </TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                Name
              </TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                Quantity
              </TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                Category
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
                Price
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {productsData && productsData.length > 0 ? (
              productsData.map((product) => (
                <TableRow
                  key={product._id}
                  onClick={() => navigate(`/admin/product-details/${product._id}`)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors cursor-pointer"
                >
                  {/* Product Image */}
                  <TableCell>
                    <Avatar className="w-10 h-10 border border-gray-200 dark:border-gray-700">
                      {product?.images?.[0]?.url ? (
                        <AdvancedImage
                          cldImg={createOptimizedImage(product.images[0].url)}
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <AvatarFallback className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                          N/A
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </TableCell>

                  {/* Product Name */}
                  <TableCell className="font-medium text-gray-600 dark:text-gray-100">
                    {product?.product_name || "Unnamed Product"}
                  </TableCell>

                  {/* Quantity */}
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {product?.quantity ?? 0}
                  </TableCell>

                  {/* Category */}
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {product?.category_id?.category_name || "Uncategorized"}
                  </TableCell>

                  {/* Price */}
                  <TableCell className="text-right font-semibold text-gray-800 dark:text-gray-100">
                    ₹{product?.price?.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
