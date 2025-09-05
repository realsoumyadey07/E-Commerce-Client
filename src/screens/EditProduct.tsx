import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllCategories } from "@/redux/slices/category.slice";
import { editProduct, productDetails } from "@/redux/slices/product.slice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // Local state for form fields
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);

  const { product, isLoading } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setProductName(product.product_name || "");
      setCategory(
        typeof product?.category_id === "string"
          ? product.category_id
          : product?.category_id?._id || ""
      );
      setPrice(product.price?.toString() || "");
      setDescription(product.description || "");
      setQuantity(product.quantity?.toString() || "");
    }
  }, [product]);

  const isFormDirty =
    productName !== product?.product_name ||
    category !== (typeof product?.category_id === "string"
      ? product?.category_id
      : product?.category_id?._id || "") ||
    price !== product?.price?.toString() ||
    description !== product?.description ||
    quantity !== product?.quantity?.toString() ||
    productImage !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !productName &&
      !category &&
      !price &&
      !description &&
      !quantity &&
      !productImage
    ) {
      toast.error("Please update at least one field.");
      return;
    }

    const formData = new FormData();
    if (productName) formData.append("product_name", productName);
    if (category) formData.append("category_id", category);
    if (price) formData.append("price", price);
    if (description) formData.append("description", description);
    if (quantity) formData.append("quantity", quantity);
    if (productImage) formData.append("product_image", productImage);

    if (id)
      toast.promise(updatePromise({ id, formData }), {
        loading: "Updating product...",
        success: <b>Product updated successfully!</b>,
        error: (err) => <b>{err || "Could not update product."}</b>,
      }).then(()=> navigate("/admin/check-product"));
  };

  interface UpdatePromise {
    id: string;
    formData: FormData;
  }

  const updatePromise = async (data: UpdatePromise) => {
    return dispatch(
      editProduct({ productId: data.id, formData: data.formData })
    );
  };

  useEffect(() => {
    dispatch(getAllCategories()).then(() => {
      if (id) dispatch(productDetails(id));
    });
  }, [dispatch, id]);

  return (
    <div className="flex justify-center md:items-center w-full bg-gray-50 p-4 overflow-auto">
      <div className="w-full max-w-2xl rounded-2xl">
        <header className="my-5">
          <h1 className="text-2xl font-semibold">Edit Product</h1>
        </header>
        <section>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="product_name"
                  className="text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter the product name..."
                  id="product_name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories &&
                        categories.map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>
                            {cat.category_name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <Input
                  type="number"
                  placeholder="Enter the price..."
                  id="price"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Input
                  type="text"
                  placeholder="Enter the description..."
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="quantity"
                  className="text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <Input
                  type="number"
                  placeholder="Enter the quantity..."
                  id="quantity"
                  step="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label
                  htmlFor="product_image"
                  className="text-sm font-medium text-gray-700"
                >
                  Product Image
                </label>
                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                  className="cursor-pointer"
                  id="product_image"
                  onChange={(e) => setProductImage(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading || !isFormDirty}
                className="w-full md:w-auto px-6 py-2 cursor-pointer"
              >
                Update product
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
