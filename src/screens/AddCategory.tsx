import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { createCategory } from "@/redux/slices/category.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

// ✅ Validation
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

const categorySchema = yup.object({
  category_name: yup.string().required("Category name is required"),
  image1: imageValidation,
  image2: imageValidation,
  image3: imageValidation,
  image4: imageValidation,
});

export type CategoryFormType = yup.InferType<typeof categorySchema>;
const imageFields = ["image1", "image2", "image3", "image4"] as const;

export default function AddCategory() {
  const {
    handleSubmit,
    register,
    reset,
    // watch,
    formState: { errors },
  } = useForm<CategoryFormType>({
    resolver: yupResolver(categorySchema),
  });

  const { isLoading } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const [previews, setPreviews] = useState<{ [key: string]: string | null }>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // ✅ Track which image is clicked
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCreateCategory = (data: CategoryFormType) => {
    const files = imageFields.map((f) => data[f][0]);
    const uniqueFiles = new Set(files.map((f) => f?.name));
    if (uniqueFiles.size !== files.length) {
      toast.error("You cannot upload the same image twice!");
      return;
    }

    const formData = new FormData();
    formData.append("category_name", data.category_name);

    files.forEach((file) => {
      if (file) {
        formData.append("category_images", file);
      }
    });

    toast
      .promise(dispatch(createCategory(formData)), {
        loading: "Creating category...",
        success: <b>Category created successfully!</b>,
        error: (err) => <b>{err || "Could not create category."}</b>,
      })
      .then(() => {
        reset();
        setPreviews({ image1: null, image2: null, image3: null, image4: null });
      });
  };

  return (
    <div className="flex justify-center md:items-center w-full bg-gray-50 p-4 overflow-auto">
      <div className="w-full max-w-2xl rounded-2xl">
        <header className="my-5">
          <h1 className="text-2xl font-semibold">Add New Category</h1>
        </header>
        <section>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleCreateCategory)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Name */}
              <div className="flex flex-col space-y-2 md:col-span-2">
                <label
                  htmlFor="category_name"
                  className="text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter the category name..."
                  id="category_name"
                  {...register("category_name")}
                />
                {errors?.category_name?.message && (
                  <span className="text-sm text-red-500">
                    {String(errors.category_name.message)}
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

                  {/* ✅ Preview with modal trigger */}
                  {previews[fieldName] && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <img
                          src={previews[fieldName] as string}
                          alt={`Preview ${idx + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border shadow cursor-pointer hover:opacity-80"
                          onClick={() => setSelectedImage(previews[fieldName])}
                        />
                      </DialogTrigger>
                      <DialogContent
                        className="max-w-3xl p-0 bg-transparent shadow-none border-none" // 👈 remove the close button
                        showCloseButton={false}
                      >
                        {selectedImage && (
                          <img
                            src={selectedImage}
                            alt="Full Preview"
                            className="w-[600px] h-[400px] object-contain rounded-lg"
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-6 py-2 cursor-pointer"
              >
                Add Category
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
