import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface CategoryProps {
  categories: {
    name: string;
    isNew?: boolean;
    isActive?: boolean;
  }[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      // Check initial state
      handleScroll();
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="relative flex items-center border-b border-gray-200">
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 flex items-center justify-center h-full px-2 bg-white bg-opacity-90"
        >
          <ChevronRight className="w-5 h-5 transform rotate-180" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex items-center overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex items-center whitespace-nowrap px-4 py-3 cursor-pointer text-sm font-medium relative
              ${
                category.isActive
                  ? "text-black border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
          >
            {category.name}
            {category.isNew && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-medium text-white bg-green-600 rounded">
                New
              </span>
            )}
          </div>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 flex items-center justify-center h-full px-2 bg-white bg-opacity-90"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Category;
