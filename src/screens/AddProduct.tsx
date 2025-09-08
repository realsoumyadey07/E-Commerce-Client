import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getAllCategories } from "@/redux/slices/category.slice";
import { useAppSelector } from "@/hooks/useAppSelector";
import { createProduct } from "@/redux/slices/product.slice";
import toast from "react-hot-toast";

const productSchema = yup.object({
  product_name: yup.string().required("Product name is required!"),
  category_id: yup.string().required("Category is required!"),
  price: yup
    .number()
    .required("Price is required!")
    .positive("Price must be positive!")
    .typeError("Price must be a number!"),
  description: yup.string().required("Description is required!"),
  quantity: yup
    .number()
    .required("Quantity is required!")
    .integer("Quantity must be an integer!")
    .min(1, "Quantity must be at least 1")
    .typeError("Quantity must be a number!"),
  product_image: yup
    .mixed<File>()
    .required("Product image is required!")
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return false;
      return [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/webp",
      ].includes(value.type);
    }),
});

export type ProductFormType = yup.InferType<typeof productSchema>;

function AddProduct() {
  const [fileKey, setFileKey] = useState(Date.now());
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: yupResolver(productSchema),
  });

  const { categories, isLoading } = useAppSelector((state) => state.category);

  const handleCreateProduct = (data: ProductFormType) => {
    // Build FormData for file upload
    const formData = new FormData();
    formData.append("product_name", data.product_name);
    formData.append("category_id", data.category_id);
    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("quantity", String(data.quantity));
    if (data.product_image) {
      formData.append("product_image", data.product_image);
    }

    toast
      .promise(
        dispatch(createProduct(formData)),
        {
          loading: "Creating product...",
          success: <b>Product created successfully!</b>,
          error: (err) => <b>{err || "Could not create product."}</b>,
        }
      )
      .then(() => {
        reset({
          product_name: "",
          category_id: "",
          price: "" as unknown as number, // 👈 force empty string
          description: "",
          quantity: "" as unknown as number, // 👈 force empty string
          product_image: undefined,
        });
        setFileKey(Date.now());
      });
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (isLoading) return null;

  return (
    <div className="flex justify-center w-full bg-gray-50 overflow-auto p-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl">
        <header className="my-5">
          <h1 className="text-2xl font-semibold">Add New Product</h1>
        </header>
        <section>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleCreateProduct)}
          >
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
                  {...register("product_name")}
                />
                {errors?.product_name?.message && (
                  <span className="text-sm text-red-500">
                    {errors.product_name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categories &&
                            categories.map((cat) => (
                              <SelectItem key={cat?._id} value={cat?._id}>
                                {cat?.category_name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.category_id?.message && (
                  <span className="text-sm text-red-500">
                    {errors.category_id.message}
                  </span>
                )}
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
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />
                {errors?.price?.message && (
                  <span className="text-sm text-red-500">
                    {errors.price.message}
                  </span>
                )}
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
                  {...register("description")}
                />
                {errors?.description?.message && (
                  <span className="text-sm text-red-500">
                    {errors.description.message}
                  </span>
                )}
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
                  {...register("quantity", {
                    valueAsNumber: true,
                  })}
                />
                {errors?.quantity?.message && (
                  <span className="text-sm text-red-500">
                    {errors.quantity.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label
                  htmlFor="product_image"
                  className="text-sm font-medium text-gray-700"
                >
                  Product Image
                </label>
                <Controller
                  name="product_image"
                  control={control}
                  render={({ field }) => (
                    <Input
                      key={fileKey}
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                      className="cursor-pointer"
                      id="product_image"
                      onChange={(e) => field.onChange(e.target.files?.[0])} // ✅ single File
                    />
                  )}
                />
                {errors?.product_image?.message && (
                  <span className="text-sm text-red-500">
                    {errors.product_image.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-6 py-2 cursor-pointer"
              >
                Add Product
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AddProduct;
