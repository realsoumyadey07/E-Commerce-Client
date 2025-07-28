import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchScreen() {
  return (
    <div className="flex-1 w-full h-full p-4">
      <div className="flex items-center gap-2 md:hidden w-full mb-4">
        <Input type="text" placeholder="Search here..." />
        <Search color="gray" />
      </div>
      <p>search screen</p>
    </div>
  );
}
