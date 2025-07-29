import { Link } from "react-router-dom";

interface StoreName {
  title?: string;
}

export default function StoreName({ title = "Realestate" }: StoreName) {
  return (
    <Link
      to="/"
      className="text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent cursor-pointer"
    >
      {title}
    </Link>
  );
}
