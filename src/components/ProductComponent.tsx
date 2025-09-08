import { IndianRupee, Star } from "lucide-react";
import { AdvancedImage } from "@cloudinary/react";
import { createOptimizedImage, isCloudinaryUrl } from "@/lib/cloudinary";
// import { fill } from "@cloudinary/url-gen/actions/resize";
// import {  quality } from '@cloudinary/url-gen/actions/delivery';
// import { auto as formatAuto } from '@cloudinary/url-gen/qualifiers/format';

interface ProductComponentProps {
  name: string;
  rating: number;
  price: number;
  cirtified: boolean;
  image: string;
}

export default function ProductComponent({
  name = "Thomson AlphaBeat80 Soundbar, 80W, Virtual 3D Sound, EQ modes, with BT v5.1, 80 W 80 W Bluetooth Soundbar  (Black, 2.1 Channel)",
  rating = 4.5,
  price = 299999,
  cirtified = true,
  image
}: ProductComponentProps) {
  
  // Function to extract public ID from Cloudinary URL
  // const getPublicIdFromUrl = (url: string): string => {
  //   if (!url) return '';
    
  //   try {
  //     const urlObj = new URL(url);
  //     const pathParts = urlObj.pathname.split('/');
  //     const uploadIndex = pathParts.findIndex(part => part === 'upload');
      
  //     if (uploadIndex !== -1 && pathParts.length > uploadIndex + 2) {
  //       return pathParts[uploadIndex + 2].split('.')[0];
  //     }
      
  //     const lastPart = pathParts[pathParts.length - 1];
  //     return lastPart.split('.')[0];
  //   } catch {
  //     const parts = url.split('/');
  //     const lastPart = parts[parts.length - 1];
  //     return lastPart.split('.')[0];
  //   }
  // };

  // Check if URL is from Cloudinary
  // const isCloudinaryUrl = (url: string): boolean => {
  //   return url.includes('cloudinary.com');
  // };

  // Create optimized Cloudinary image
  // const createOptimizedImage = (imageUrl: string) => {
  //   if (isCloudinaryUrl(imageUrl)) {
  //     const publicId = getPublicIdFromUrl(imageUrl);
  //     return cld.image(publicId)
  //       .resize(fill().width(250).height(150))
  //       .delivery(quality('auto:good'))
  //   }
  //   return cld.image('fallback');
  // };

  return (
    <div className="w-full h-full rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {isCloudinaryUrl(image) ? (
        <AdvancedImage
          cldImg={createOptimizedImage(image)}
          alt="product"
          className="w-full h-[150px] object-cover rounded-tl-xl rounded-tr-xl"
        />
      ) : (
        <img
          src={image}
          alt="product"
          className="w-full h-[150px] object-cover rounded-tl-xl rounded-tr-xl"
          loading="lazy"
        />
      )}

      <div className="mt-3 space-y-2 flex flex-col flex-1 p-3">
        <h2 className="text-sm font-medium line-clamp-2 text-blue-700 hover:underline">
          {name}
        </h2>

        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{rating}</span>
          </div>
          {cirtified && (
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px]">
              Certified
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-gray-800 font-semibold text-sm mt-auto">
          <IndianRupee className="w-4 h-4" />
          <span>{price.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}