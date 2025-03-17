import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../api/category";
import { Link, useLocation } from "react-router-dom";

const Category: React.FC = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const categoryId = location.state?.categoryId;

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

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

  if (isLoading)
    return (
      <div className="text-center mt-10">
        <div className="skeleton h-32 w-32"></div>
      </div>
    );
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error loading posts.</p>
    );

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
        {categories.map((category) => (
          <Link
            to={`?tag=${category.slug.current}`}
            state={{ categoryId: category._id }}
            key={category.slug.current}
            className={`flex items-center whitespace-nowrap px-4 py-3 cursor-pointer text-sm font-medium relative
              ${
                category._id === categoryId
                  ? "text-black border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
          >
            {category.title}
            {category.isNew && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-medium text-white bg-green-600 rounded">
                New
              </span>
            )}
          </Link>
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
