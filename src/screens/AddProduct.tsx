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

function AddProduct() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-50 p-4">
      <div className="w-full max-w-2xl rounded-2xl">
        <header className="my-5">
          <h1 className="text-2xl font-semibold">
            Add New Product
          </h1>
        </header>
        <section>
          <form className="space-y-6">
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
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
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
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label
                  htmlFor="image"
                  className="text-sm font-medium text-gray-700"
                >
                  Product Image
                </label>
                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  className="cursor-pointer"
                  id="image"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="px-6 py-2 cursor-pointer">
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
