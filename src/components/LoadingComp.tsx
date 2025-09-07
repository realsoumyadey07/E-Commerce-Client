export default function LoadingComp() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-gray-700 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
