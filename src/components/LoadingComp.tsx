import { Spinner } from "./ui/spinner";

export default function LoadingComp() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <Spinner className="w-10 h-10" />
        <p className="text-gray-700 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
