// import LoadingComp from "@/components/LoadingComp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getCategoryById } from "@/redux/slices/category.slice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import first from "@/assets/images/1.jpg";
import ReactLoadingComp from "@/components/ReactLoadingComp";

export default function CategoryDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const { category, isLoading } = useAppSelector((state) => state.category);

  useEffect(() => {
    if (id) dispatch(getCategoryById(id));
  }, [id, dispatch]);

  if (isLoading) return <ReactLoadingComp />;

  if (!category) {
    return <p className="text-center text-gray-500">Category not found</p>;
  }

  return (
    <div className="w-full h-full flex justify-center items-start p-6">
      <Card className="w-full max-w-2xl rounded-2xl shadow-md">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            {category.category_name}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => navigation(`/admin/edit-category/${id}`)}
            >
              <Pencil className="w-4 h-4" /> Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => console.log("Delete category", category._id)}
            >
              <Trash2 className="w-4 h-4" /> Delete
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {category?.category_images?.length ? (
              category.category_images.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 border rounded-lg overflow-hidden"
                >
                  <img
                    src={item?.url || first}
                    alt="category-image"
                    className="w-full h-[150px] object-cover"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm col-span-2">
                No images available.
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-gray-600">
            Manage this category by editing details or deleting it.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
