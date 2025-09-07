import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getCategoryById, updateCategory } from "@/redux/slices/category.slice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

type CategoryImage = {
  url: string;
  public_id: string;
};

type Category = {
  _id: string;
  category_name: string;
  category_images: CategoryImage[];
};

const imageFields = ["image1", "image2", "image3", "image4"] as const;

export default function EditCategory() {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState<string>("");

  // store both file & preview
  const [images, setImages] = useState<{
    [key: string]: { file: File | null; preview: string | null };
  }>({
    image1: { file: null, preview: null },
    image2: { file: null, preview: null },
    image3: { file: null, preview: null },
    image4: { file: null, preview: null },
  });

  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.category) as {
    category: Category | null;
  };

  // Fetch category by ID
  useEffect(() => {
    if (id) dispatch(getCategoryById(id));
  }, [id, dispatch]);

  // Preload existing category data
  useEffect(() => {
    if (category) {
      setCategoryName(category.category_name);

      if (category.category_images && category.category_images.length > 0) {
        const updatedImages: Record<
          string,
          { file: File | null; preview: string | null }
        > = {};
        category.category_images.forEach((img, idx) => {
          updatedImages[`image${idx + 1}`] = {
            file: null,
            preview: img.url,
          };
        });
        setImages((prev) => ({ ...prev, ...updatedImages }));
      }
    }
  }, [category]);

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      toast.error("Category ID not found");
      return;
    }

    const formData = new FormData();
    formData.append("category_name", categoryName);

    // attach files by field name
    imageFields.forEach((fieldName) => {
      const file = images[fieldName].file;
      if (file) {
        formData.append(fieldName, file);
      }
    });

    // dispatch redux thunk
    toast.promise(dispatch(updateCategory({ categoryId: id, formData })), {
      loading: "Updating category...",
      success: <b>Category updated successfully!</b>,
      error: (err) => <b>{err || "Could not update category."}</b>,
    });
  };

  return (
    <>
      {category && (
        <div className="flex justify-center md:items-center w-full bg-gray-50 p-4 overflow-auto">
          <div className="w-full max-w-2xl rounded-2xl">
            <header className="my-5">
              <h1 className="text-2xl font-semibold">Edit Category</h1>
            </header>
            <section>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
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
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          if (file) {
                            const preview = URL.createObjectURL(file);
                            setImages((prev) => ({
                              ...prev,
                              [fieldName]: { file, preview },
                            }));
                          }
                        }}
                      />
                      {/* Preview section */}
                      {images[fieldName].preview && (
                        <img
                          src={images[fieldName].preview}
                          alt={`preview-${fieldName}`}
                          className="w-full h-32 object-cover rounded-md border mt-2"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="w-full md:w-auto px-6 py-2 cursor-pointer"
                  >
                    Update Category
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
