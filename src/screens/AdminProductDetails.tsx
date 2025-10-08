export default function AdminProductDetails() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Wireless Headphones
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Electronics / Audio
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            ✏️ Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition">
            🗑 Delete
          </button>
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Product Images
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <img
                src={`https://via.placeholder.com/200?text=Image+${i}`}
                alt={`Product ${i}`}
                className="object-cover w-full h-40"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Product Details
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Price:</span> ₹3,499
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Stock:</span> 120 units
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">SKU:</span> WH-12345
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Status:</span>{" "}
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                In Stock
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Category:</span> Audio Devices
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Description
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Experience crystal-clear sound and deep bass with our premium wireless
          headphones. Designed for comfort and long listening hours, featuring
          noise-cancellation and a 20-hour battery life.
        </p>
      </div>

      {/* Tags */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {["Wireless", "Bluetooth", "Noise Cancelling", "Headphones"].map(
            (tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                #{tag}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
