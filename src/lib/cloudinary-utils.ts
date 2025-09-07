// utils/cloudinary-utils.ts
export function getCloudinaryPublicId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    
    // Check if it's a Cloudinary URL
    if (!urlObj.hostname.includes('cloudinary.com')) {
      return null;
    }
    
    const pathParts = urlObj.pathname.split('/');
    const uploadIndex = pathParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1 || uploadIndex >= pathParts.length - 1) {
      return null;
    }
    
    // The public ID starts after the upload segment, skip version if present
    let publicIdStartIndex = uploadIndex + 1;
    if (pathParts[publicIdStartIndex]?.startsWith('v')) {
      publicIdStartIndex++;
    }
    
    const publicIdParts = pathParts.slice(publicIdStartIndex);
    let publicId = publicIdParts.join('/');
    
    // Remove file extension
    const lastDotIndex = publicId.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      publicId = publicId.substring(0, lastDotIndex);
    }
    
    return publicId;
  } catch {
    return null;
  }
}