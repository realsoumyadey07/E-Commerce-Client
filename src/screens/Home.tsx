import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProductComponent from "@/components/ProductComponent";
import { Link, useNavigate } from "react-router-dom";
import ExploreComponent from "@/components/ExploreComponent";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const exploreScrollRef = useRef<HTMLDivElement | null>(null); // new ref for explore section
  const navigation = useNavigate();

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollExploreRight = () => {
    if (exploreScrollRef.current) {
      exploreScrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const scrollExploreLeft = () => {
    if (exploreScrollRef.current) {
      exploreScrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-full px-4 py-4 md:py-0 overflow-y-auto no-scrollbar">
      <Link to="/" className="font-semibold text-xl flex md:hidden">
        Realestate
      </Link>

      <main className="w-full max-w-7xl mx-auto relative">
        {/* Product Section */}
        <h1 className="text-lg md:text-xl font-semibold text-gray-800 my-4">
          Best of Neckless
        </h1>

        <div className="relative">
          <div ref={scrollRef} className="overflow-x-auto no-scrollbar pr-6">
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex items-start gap-4">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <div onClick={()=> navigation(`/product/${i}`)} key={i} className="min-w-[220px] flex-shrink-0">
                    <ProductComponent
                      name="Sony Wireless Headphones WH-1000XM5"
                      rating={4.7}
                      price={15999}
                      cirtified={true}
                    />
                  </div>
                ))}
            </div>
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Explore Section */}
        <h1 className="text-lg md:text-xl font-semibold text-gray-800 my-4">
          Explore more like this
        </h1>

        <div className="relative">
          <div ref={exploreScrollRef} className="overflow-x-auto no-scrollbar pr-4">
            <button
              onClick={scrollExploreLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex gap-4 min-w-max">
              <ExploreComponent />
              <ExploreComponent />
              <ExploreComponent />
              <ExploreComponent />
            </div>
          </div>

          <button
            onClick={scrollExploreRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </main>
    </div>
  );
}
