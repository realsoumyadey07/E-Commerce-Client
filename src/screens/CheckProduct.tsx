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
    <div className="px-6 w-full">
      <section className="w-full md:w-1/3 flex items-center relative mb-6">
        <Search className="absolute left-3 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder="Search here..."
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
            if (e.target.value.trim() === "") {
              dispatch(getAllProducts());
            } else {
              dispatch(searchProduct(searchKeyword));
            }
          }}
          className="pl-10 w-full"
        />
      </section>

      <div className="overflow-x-auto rounded-lg shadow pb-2">
        <Table className="min-w-full bg-white">
          <TableCaption className="text-gray-500">
            {productsData && productsData.length > 0
              ? "A list of your recent products."
              : "No product found"}
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[120px] font-semibold">Photo</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Quantity</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="text-right font-semibold">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData &&
              productsData.map((product) => (
                <TableRow onClick={()=> navigate(`/admin/product-details/${product._id}`)} key={product._id} className="hover:bg-gray-50 cursor-pointer">
                  <TableCell>
                    <Avatar>
                      <AdvancedImage cldImg={createOptimizedImage(product?.images?.[0]?.url)}/>
                      <AvatarFallback>Icon</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{product?.product_name}</TableCell>
                  <TableCell>{product?.quantity}</TableCell>
                  <TableCell>{product?.category_id?.category_name}</TableCell>
                  <TableCell className="text-right">
                    ₹{product?.price?.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
