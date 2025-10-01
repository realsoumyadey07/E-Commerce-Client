import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllCategories } from "@/redux/slices/category.slice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function CategoryHeader() {
  const dispatch = useAppDispatch();
  const { categories, isLoading } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (isLoading) return null;

  return (
    <ul className="hidden md:flex items-center gap-4 my-2 text-red-600 mx-auto">
      {categories &&
        categories.map(
          (category) =>
            category.is_header && (
              <Link
                key={category._id}
                to={`/${category._id}/products`}
                className="hover:underline cursor-pointer font-semibold text-xl"
              >
                {category.category_name}
              </Link>
            )
        )}
    </ul>
  );
}
