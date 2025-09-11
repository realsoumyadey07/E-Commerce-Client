import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartProductProps {
  product_name: string;
  price: number;
  product_image: string;
  quantity: number;
}

export default function CartComponent({
  product_name,
  price,
  product_image,
  quantity,
}: CartProductProps) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4 p-4 border rounded shadow-sm">
      <img
        src={product_image}
        alt={product_name}
        className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-md"
      />

      <div className="flex flex-col w-full md:flex-row md:justify-between gap-4 md:ml-4">
        <div className="flex flex-col text-center md:text-left">
          <h2 className="text-base md:text-lg font-semibold">{product_name}</h2>
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

        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <Button variant="ghost" className="w-full md:w-auto rounded">
            Save for Later
          </Button>
          <Button
            variant="destructive"
            className="flex items-center justify-center gap-1 w-full md:w-auto rounded"
          >
            <Trash2 className="h-4 w-4" /> Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
