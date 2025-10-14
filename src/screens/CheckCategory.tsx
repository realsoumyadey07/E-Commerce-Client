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
import { Skeleton } from "@/components/ui/skeleton";

export default function CheckCategory() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categories, isLoading } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="px-6 md:py-8 w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 min-h-screen transition-colors">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight mb-2">
          Category Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Browse and manage all available categories with their images.
        </p>
      </header>

      <section className="w-full md:w-1/3 flex items-center relative mb-6">
        <Search
          className="absolute left-3 text-gray-400 dark:text-gray-500"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search category..."
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
            if (e.target.value.trim() === "") {
              dispatch(getAllCategories());
            } else {
              dispatch(searchCategory(e.target.value));
            }
          }}
          className="pl-10 w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </section>
      {isLoading ? (
        <CheckCategoryLoading />
      ) : (
        <div className="overflow-x-auto rounded shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <Table className="min-w-full border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <TableCaption className="text-gray-500 dark:text-gray-400 mt-2">
              {categories && categories.length > 0
                ? "A list of your available categories."
                : "No category found."}
            </TableCaption>

            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800">
                <TableHead className="w-[140px] font-semibold text-gray-700 dark:text-gray-300 py-3">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-center py-3">
                  Image 1
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-center py-3">
                  Image 2
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-center py-3">
                  Image 3
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-center py-3">
                  Image 4
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow
                    key={category._id}
                    onClick={() =>
                      navigate(`/admin/category-details/${category._id}`)
                    }
                    className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                  >
                    {/* Category Name */}
                    <TableCell className="font-medium text-gray-800 dark:text-gray-100 py-4">
                      {category?.category_name}
                    </TableCell>

                    {/* Category Images */}
                    {Array.from({ length: 4 }).map((_, idx) => {
                      const img = category?.category_images?.[idx];
                      const optimizedImg = img
                        ? createOptimizedImage(img.url)
                        : null;
                      return (
                        <TableCell key={idx} className="text-center">
                          <Avatar className="w-10 h-10 mx-auto border border-gray-200 dark:border-gray-700">
                            {optimizedImg ? (
                              <AdvancedImage
                                cldImg={optimizedImg}
                                className="object-cover w-full h-full rounded-full"
                              />
                            ) : (
                              <AvatarFallback className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                N/A
                              </AvatarFallback>
                            )}
                          </Avatar>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function CheckCategoryLoading() {
  return (
    <div className="overflow-x-auto rounded shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {[...Array(5)].map((_, i) => (
              <th key={i} className="p-3 text-left">
                <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...Array(6)].map((_, i) => (
            <tr
              key={i}
              className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              {/* Category name */}
              <td className="p-4">
                <Skeleton className="h-5 w-36 bg-gray-200 dark:bg-gray-700" />
              </td>

              {/* Category images */}
              {[...Array(4)].map((_, j) => (
                <td key={j} className="text-center p-3">
                  <Skeleton className="h-10 w-10 rounded-full mx-auto bg-gray-200 dark:bg-gray-700" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
