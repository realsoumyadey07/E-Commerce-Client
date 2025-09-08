import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  getAllCategories,
  searchCategory,
} from "@/redux/slices/category.slice";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { createOptimizedImage } from "@/lib/cloudinary"; 

export default function CheckCategory() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categories } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="p-6 w-full">
      {/* Search Bar */}
      <section className="w-full md:w-1/3 flex items-center relative mb-6">
        <Search className="absolute left-3 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder="Search here..."
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
            if (e.target.value.trim() === "") {
              dispatch(getAllCategories());
            } else {
              dispatch(searchCategory(e.target.value));
            }
          }}
          className="pl-10 w-full"
        />
      </section>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow pb-2">
        <Table className="min-w-full bg-white">
          <TableCaption className="text-gray-500">
            {categories && categories.length > 0
              ? "A list of your recent categories."
              : "No category found"}
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[120px] font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Image 1</TableHead>
              <TableHead className="font-semibold">Image 2</TableHead>
              <TableHead className="font-semibold">Image 3</TableHead>
              <TableHead className="font-semibold">Image 4</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories &&
              categories.map((category) => (
                <TableRow
                  onClick={() =>
                    navigate(`/admin/category-details/${category._id}`)
                  }
                  key={category._id}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  {/* Category Name */}
                  <TableCell>{category?.category_name}</TableCell>

                  {/* Images */}
                  {category?.category_images?.map((img, idx) => {
                    const optimizedImg = createOptimizedImage(img?.url);
                    return (
                      <TableCell key={idx}>
                        <Avatar>
                          <AdvancedImage
                            cldImg={optimizedImg}
                            className="object-cover w-12 h-12 rounded-full"
                          />
                          <AvatarFallback>I</AvatarFallback>
                        </Avatar>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
