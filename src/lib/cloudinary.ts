import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality } from "@cloudinary/url-gen/actions/delivery";

export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

// Create optimized Cloudinary image
export const createOptimizedImage = (imageUrl: string) => {
  if (isCloudinaryUrl(imageUrl)) {
    const publicId = getPublicIdFromUrl(imageUrl);
    return cld
      .image(publicId)
      .resize(fill().width(250).height(150))
      .delivery(quality("auto:good"));
  }
  return cld.image("fallback");
};

// Check if URL is from Cloudinary
export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes("cloudinary.com");
};

// Function to extract public ID from Cloudinary URL
const getPublicIdFromUrl = (url: string): string => {
  if (!url) return "";

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const uploadIndex = pathParts.findIndex((part) => part === "upload");

    if (uploadIndex !== -1 && pathParts.length > uploadIndex + 2) {
      return pathParts[uploadIndex + 2].split(".")[0];
    }

    const lastPart = pathParts[pathParts.length - 1];
    return lastPart.split(".")[0];
  } catch {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    return lastPart.split(".")[0];
  }
};
