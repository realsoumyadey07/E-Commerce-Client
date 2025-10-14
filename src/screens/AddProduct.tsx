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

// --- Validation ---
const imageValidation = yup
  .mixed<FileList>()
  .required("Image is required")
  .test("fileType", "Only images are allowed", (fileList) => {
    if (!fileList || fileList.length === 0) return false;
    const file = fileList[0];
    return [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
    ].includes(file.type);
  });

const imageFields = ["image1", "image2", "image3", "image4"] as const;

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
  image1: imageValidation,
  image2: imageValidation,
  image3: imageValidation,
  image4: imageValidation,
});

export type ProductFormType = yup.InferType<typeof productSchema>;

export default function AddProduct() {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: yupResolver(productSchema),
  });

  const { categories, isLoading } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  // For image previews
  const [previews, setPreviews] = useState<{ [key: string]: string | null }>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCreateProduct = (data: ProductFormType) => {
    const files = imageFields.map((f) => data[f][0]);
    const uniqueFiles = new Set(files.map((f) => f?.name));
    if (uniqueFiles.size !== files.length) {
      toast.error("You cannot upload the same image twice!");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", data.product_name);
    formData.append("category_id", data.category_id);
    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("quantity", String(data.quantity));
    files.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });

    toast
      .promise(dispatch(createProduct(formData)), {
        loading: "Creating product...",
        success: <b>Product created successfully!</b>,
        error: (err) => <b>{err || "Could not create product."}</b>,
      })
      .then(() => {
        reset();
        setPreviews({ image1: null, image2: null, image3: null, image4: null });
      });
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (isLoading) return null;

  return (
    <div className="flex justify-center w-full bg-white overflow-auto px-4 md:py-8 py-4">
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
              <div className="flex flex-col space-y-2 md:col-span-2">
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
                    {String(errors.product_name.message)}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2 md:col-span-2">
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
                    {String(errors.category_id.message)}
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
              {imageFields.map((fieldName, idx) => (
                <div
                  className="flex flex-col space-y-2 md:col-span-1"
                  key={fieldName}
                >
                  <label
                    htmlFor={fieldName}
                    className="text-sm font-medium text-gray-700"
                  >
                    Upload Image {idx + 1}
                  </label>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                    className="cursor-pointer"
                    id={fieldName}
                    {...register(fieldName, {
                      required: `Image ${idx + 1} is required`,
                    })}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setPreviews((prev) => ({
                          ...prev,
                          [fieldName]: url,
                        }));
                      }
                    }}
                  />
                  {errors?.[fieldName]?.message && (
                    <span className="text-sm text-red-500">
                      {String(errors[fieldName]?.message)}
                    </span>
                  )}
                  {previews[fieldName] && (
                    <img
                      src={previews[fieldName] as string}
                      alt={`Preview ${idx + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border shadow cursor-pointer hover:opacity-80"
                      onClick={() => setSelectedImage(previews[fieldName])}
                    />
                  )}
                </div>
              ))}
            </div>
            {selectedImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                onClick={() => setSelectedImage(null)}
              >
                <img
                  src={selectedImage}
                  alt="Full Preview"
                  className="w-[600px] h-[400px] object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
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