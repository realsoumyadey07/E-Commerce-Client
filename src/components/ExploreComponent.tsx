import type { Category } from "@/redux/slices/category.slice";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/lib/cloudinary";
import { fill } from '@cloudinary/url-gen/actions/resize';
import { quality } from '@cloudinary/url-gen/actions/delivery';
// import { auto as formatAuto } from '@cloudinary/url-gen/qualifiers/format';
import first from "@/assets/images/1.jpg";

interface ExploreProps {
  category: Category;
}

export default function ExploreComponent({ category }: ExploreProps) {
  // Function to extract public ID from Cloudinary URL
  const extractPublicId = (url: string): string => {
    try {
      // Remove the base URL and get the public ID part
      // Example: https://res.cloudinary.com/demo/image/upload/v1234567/folder/image.jpg -> "folder/image"
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const uploadIndex = pathParts.findIndex(part => part === 'upload');
      
      if (uploadIndex !== -1) {
        // Skip the version part (v1234567) if it exists
        const publicIdParts = pathParts.slice(uploadIndex + 2);
        let publicId = publicIdParts.join('/');
        
        // Remove file extension
        const lastDotIndex = publicId.lastIndexOf('.');
        if (lastDotIndex !== -1) {
          publicId = publicId.substring(0, lastDotIndex);
        }
        
        return publicId;
      }
      return url; // Fallback to full URL if not a standard Cloudinary URL
    } catch {
      return url; // Fallback to full URL if URL parsing fails
    }
  };

  // Function to create optimized Cloudinary image
  const createOptimizedImage = (imageUrl: string | undefined) => {
    if (!imageUrl) {
      // Return a fallback image configuration
      return cld.image('fallback-image')
        .resize(fill().width(150).height(100))
        .delivery(quality('auto:good'));
    }

    const publicId = extractPublicId(imageUrl);
    
    return cld.image(publicId)
      .resize(fill().width(150).height(100)) // Exact dimensions for your layout
      .delivery(quality('auto:good')) // Auto quality optimization
      // .delivery(formatAuto()) // Auto format selection (WebP, AVIF, etc.)
      .format('auto'); // Fallback format
  };

  return (
    <Card className="w-[320px] rounded-2xl cursor-pointer transition-shadow duration-300 shadow-sm hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
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