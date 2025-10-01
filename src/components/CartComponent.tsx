import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import CustomDialogbox from "./CustomDialogbox";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteFromCart } from "@/redux/slices/cart.slice";
import toast from "react-hot-toast";
import { AdvancedImage } from "@cloudinary/react";
import { createOptimizedImage } from "@/lib/cloudinary";

interface Image {
  url: string;
  public_id: string;
}

interface CartProductProps {
  id: string;
  productId: string;
  product_name: string;
  price: number;
  image: Image;
  quantity: number;
}

export default function CartComponent({
  id,
  productId,
  product_name,
  price,
  image,
  quantity,
}: CartProductProps) {
  const dispatch = useAppDispatch();

  const deleteCartPromise = async () => {
    if (id) dispatch(deleteFromCart(id));
  };

  const handleDeleteCart = () => {
    toast.promise(deleteCartPromise(), {
      loading: "Removing product...",
      success: <b>Product removed from cart successfully!</b>,
      error: (err) => <b>{err || "Could not removed product."}</b>,
    });
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4 p-4 border rounded shadow-sm">
      <AdvancedImage
        cldImg={createOptimizedImage(image?.url || "")}
        alt={product_name}
        className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-md"
      />

      <div className="flex flex-col w-full md:flex-row md:justify-between gap-4 md:ml-4">
        <div className="flex flex-col text-center md:text-left">
          <Link
            to={`/product/${productId}`}
            className="text-base md:text-lg font-semibold hover:text-blue-700"
          >
            {product_name}
          </Link>
          <p className="text-gray-700 font-medium">₹{price}</p>
        </div>

        <div className="flex items-center justify-center md:justify-start space-x-2">
          <Button size="sm" variant="outline" disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-3 py-1 border rounded-md text-sm">
            {quantity}
          </span>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex  md:flex-row items-center justify-center gap-2">
          <Button variant="ghost" className="w-full flex-1 md:w-auto rounded bg-amber-400 hover:bg-amber-500 text-white hover:text-white">
            Save for Later
          </Button>
          <CustomDialogbox
            buttonName="Remove"
            dialogTitle="Remove Product"
            dialogDescription="Do you really want to remove this product?"
            Icon={Trash2}
            buttonClassName="flex-1 items-center justify-center gap-1 w-full md:w-auto rounded"
            extraButton="Remove"
            onClick={handleDeleteCart}
          />
        </div>
      </div>
    </div>
  );
}
