import type { Category } from "@/redux/slices/category.slice";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { AdvancedImage } from "@cloudinary/react";
import { createOptimizedImage } from "@/lib/cloudinary";
import first from "@/assets/images/1.jpg";
import { useNavigate } from "react-router-dom";


interface ExploreProps {
  category: Category;
}

export default function ExploreComponent({ category }: ExploreProps) {
  const navigate = useNavigate();

  return (
    <Card className="w-[320px] rounded-2xl cursor-pointer transition-shadow duration-300 shadow-sm hover:shadow-md" onClick={()=> navigate(`/${category?._id}/products`)}>
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-600">
          {category?.category_name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {category?.category_images?.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              {item?.url ? (
                <AdvancedImage
                  cldImg={createOptimizedImage(item.url)}
                  alt="category-image"
                  className="w-[150px] h-[100px] object-cover rounded"
                />
              ) : (
                <img
                  src={first}
                  alt="category-image"
                  className="w-[150px] h-[100px] object-cover rounded"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-blue-700 text-sm hover:underline">Explore all</p>
      </CardFooter>
    </Card>
  );
}