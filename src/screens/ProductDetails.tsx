import { Button } from "@/components/ui/button";
import {
  Edit,
  ShoppingCart,
  Trash2,
  IndianRupee,
  Star,
  Share2,
  Heart,
  ChevronLeft,
  Search,
} from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { deleteProduct, productDetails } from "@/redux/slices/product.slice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomDialogbox from "@/components/CustomDialogbox";
import toast from "react-hot-toast";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import Footer from "@/components/Footer";
import { addToCart, getAllCarts } from "@/redux/slices/cart.slice";
import { Input } from "@/components/ui/input";
import {
  addToWishlist,
  getAllWishlists,
  removeFromWishlist,
} from "@/redux/slices/wishlist.slice";
import { AdvancedImage } from "@cloudinary/react";
import { createOptimizedImage, isCloudinaryUrl } from "@/lib/cloudinary";

interface WishlistItem {
  _id: string;
}

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { product, isLoading } = useAppSelector((state) => state.product);
  const { userData } = useAppSelector((state) => state.user);
  const { allWishlists } = useAppSelector((state) => state.wishlist);
  const [allWishlistedProductId, setAllWishlistedProductId] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) dispatch(productDetails(id));

    dispatch(getAllWishlists())
      .unwrap()
      .then((res) => {
        setAllWishlistedProductId(
          res?.products?.map((i: WishlistItem) => i._id) || []
        );
      });
  }, [id, dispatch]);

  if (isLoading) return <ReactLoadingComp />;

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        No product found
      </div>
    );
  }

  const deleteProductPromise = async () => {
    if (id) await dispatch(deleteProduct(id));
  };

  const handleDeleteProduct = () => {
    if (id)
      toast
        .promise(deleteProductPromise(), {
          loading: "Deleting product...",
          success: <b>Product deleted successfully!</b>,
          error: (err) => <b>{err || "Could not delete product."}</b>,
        })
        .then(() => navigate("/admin/check-product"));
  };

  const cartProductPromise = async () => {
    if (id && userData?._id)
      dispatch(addToCart({ userId: userData._id, productId: id }));
  };

  const handleCartProduct = () => {
    if (id && userData?._id)
      toast
        .promise(cartProductPromise(), {
          loading: "Adding product to cart...",
          success: <b>Product added to cart successfully!</b>,
          error: (err) => <b>{err || "Could not add product to cart!"}</b>,
        })
        .then(() => {
          dispatch(getAllCarts());
          navigate("/cart");
        });
  };

  const handleAddWishlist = async () => {
    if (allWishlists && id) {
      if (allWishlistedProductId?.includes(product?._id)) {
        await dispatch(removeFromWishlist({ productId: id })).then(() =>
          dispatch(getAllWishlists())
            .unwrap()
            .then((res) =>
              setAllWishlistedProductId(
                res?.products?.map((i: WishlistItem) => i._id) || []
              )
            )
        );
      } else {
        await dispatch(addToWishlist({ productId: id })).then(() =>
          dispatch(getAllWishlists())
            .unwrap()
            .then((res) =>
              setAllWishlistedProductId(
                res?.products?.map((i: WishlistItem) => i._id) || []
              )
            )
        );
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow container md:py-8 w-full max-w-7xl mx-auto">
        {/* Mobile Search Bar */}
        <div className="md:hidden flex items-center w-full p-2 gap-2">
          <ChevronLeft
            color="gray"
            onClick={() => {
              navigate(-1);
            }}
          />
          <Input
            placeholder="Search here"
            onClick={() => navigate("/search")}
          />
          <Search color="gray" />
        </div>

        <div className="bg-white overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Images Section */}
            <div className="flex flex-col md:flex-row-reverse gap-4">
              {/* Main Image */}
              <div className="w-full h-80 md:h-[500px] flex items-center justify-center border rounded-lg shadow">
                {isCloudinaryUrl(selectedImage || product.images[0]?.url) ? (
                  <AdvancedImage
                    cldImg={createOptimizedImage(selectedImage || product.images[0].url)}
                    alt={product.product_name}
                    className="object-contain w-full h-full rounded-lg"
                  />
                ) : (
                  <img
                    src={selectedImage || product.images[0]?.url}
                    alt={product.product_name}
                    className="object-contain w-full h-full rounded-lg"
                  />
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 md:grid-cols-1 md:h-[500px] md:overflow-y-auto">
                {product.images.map((i, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer border rounded-lg overflow-hidden hover:opacity-80"
                    onMouseOver={() => setSelectedImage(i.url)}
                  >
                    {isCloudinaryUrl(i.url) ? (
                      <AdvancedImage
                        cldImg={createOptimizedImage(i.url)}
                        alt={`product-${idx}`}
                        className="object-cover w-full h-24"
                      />
                    ) : (
                      <img
                        src={i.url}
                        alt={`product-${idx}`}
                        className="object-cover w-full h-24"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col gap-4 p-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {product.product_name}
                </h1>

                <p className="text-gray-600 text-base leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star className="w-5 h-5 fill-yellow-500" />
                      <span>4.7</span>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs">
                      Certified
                    </span>
                  </div>
                  {userData &&
                    product &&
                    allWishlists &&
                    userData.role === "user" && (
                      <Heart
                        color={
                          allWishlistedProductId?.includes(product?._id)
                            ? "red"
                            : "gray"
                        }
                        onClick={handleAddWishlist}
                        fill={
                          allWishlistedProductId?.includes(product?._id)
                            ? "red"
                            : "#fff"
                        }
                      />
                    )}
                </div>

                <div className="flex items-center gap-1 text-2xl font-semibold text-blue-600">
                  <IndianRupee className="w-5 h-5" />
                  <span>{product?.price?.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Admin Actions */}
              {userData && userData.role === "admin" ? (
                <div className="mt-6 flex flex-col md:flex-row gap-2 w-full">
                  <Button
                    className="flex items-center gap-2 md:w-1/2 w-full cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/edit-product/${product?._id}`)
                    }
                  >
                    <Edit className="h-5 w-5" />
                    <span>Edit product</span>
                  </Button>

                  <CustomDialogbox
                    buttonName="Delete product"
                    dialogTitle="Delete Product"
                    dialogDescription="Do you really want to delete the product?"
                    extraButton="Delete"
                    onClick={handleDeleteProduct}
                    Icon={Trash2}
                    buttonClassName="flex items-center gap-2 w-full md:w-1/2"
                  />
                </div>
              ) : null}

              {/* User Actions */}
              <div className="flex flex-col gap-2 w-full md:items-center md:justify-between">
                {userData?.role === "user" && (
                  <div className="flex flex-col md:flex-row gap-2 w-full">
                    <Button
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                      onClick={handleCartProduct}
                    >
                      <ShoppingCart />
                      Cart
                    </Button>
                    <Button
                      onClick={() => navigate(`/checkout/${product._id}`)}
                      className="flex-1 bg-amber-400 hover:bg-amber-500"
                    >
                      Buy now
                    </Button>
                  </div>
                )}

                <Button className="flex items-center gap-2 w-full">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {!location.pathname.includes("admin") && <Footer />}
    </div>
  );
}
