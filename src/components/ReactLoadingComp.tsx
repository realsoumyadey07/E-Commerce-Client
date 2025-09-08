import { ClipLoader } from "react-spinners";

interface ReactLoadingCompProps {
  color?: string;
  loading?: boolean;
  size?: number;
  speedMultiplier?: number;
  text?: string;
}

export default function ReactLoadingComp({
  color = "#000000",
  loading = true,
  size = 80,
  speedMultiplier = 0.5, // slower by default
  text = "Loading...",   // default text
}: ReactLoadingCompProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-50 space-y-4">
      <ClipLoader
        color={color}
        loading={loading}
        size={size}
        speedMultiplier={speedMultiplier}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="text-gray-700 text-lg font-medium">{text}</p>
    </div>
  );
}
