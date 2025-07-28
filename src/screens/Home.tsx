import ProductTypeComp from "@/components/ProductTypeComp";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home(){
    return (
        <div className="w-full h-full px-4 py-4 md:py-0">
            <div className="flex items-center gap-2 md:hidden w-full">
                <Input type="text" placeholder="Search here..." />
                <Search color="gray" />
            </div>
            <main className="w-full max-w-7xl mx-auto">
                <div className="flex md:justify-center gap-8 overflow-x-auto no-scrollbar py-4">
                    <ProductTypeComp title="Mobile"/>
                    <ProductTypeComp title="Mobile"/>
                    <ProductTypeComp title="Mobile"/>
                    <ProductTypeComp title="Mobile"/>
                    <ProductTypeComp title="Mobile"/>
                    <ProductTypeComp title="Mobile"/>
                    <ProductTypeComp title="Mobile"/>
                    <ProductTypeComp title="Mobile"/>
                    <ProductTypeComp title="Mobile"/>
                    <ProductTypeComp title="Mobile"/>
                </div>
            </main>
        </div>
    )
}