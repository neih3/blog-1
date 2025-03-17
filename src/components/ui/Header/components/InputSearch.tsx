import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { fetchSearchPost } from "../../../../api/post";
import { Link } from "react-router-dom";
import BlogCard from "../../../BlogCard/BlogCard";

export default function InputSearch() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchPosts", debouncedQuery],
    queryFn: () => {
      setOpenDropdown(true);
      return fetchSearchPost(debouncedQuery);
    },
    enabled: !!debouncedQuery,
  });

  // Xử lý click outside dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex items-center flex-col gap-2 relative"
      ref={dropdownRef}
    >
      <label className="input flex items-center border rounded-md p-2 group">
        <svg
          className="h-[1em] opacity-50 group-focus-within:opacity-100 group-focus-within:stroke-[3]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setOpenDropdown(true); // Mở dropdown khi nhập
          }}
          required
          placeholder="Search"
          className="outline-none border-none focus:ring-0 focus:outline-none p-2"
        />
      </label>

      {/* Hiển thị kết quả tìm kiếm */}
      {openDropdown && (
        <div className="absolute top-16 z-50 bg-white shadow-lg mt-2 w-full rounded-md p-2">
          {isLoading && <p>Loading...</p>}
          {isError && <p className="text-red-500">Error fetching results</p>}
          {searchResults && searchResults.length === 0 ? (
            <p className="text-gray-500">No results found</p>
          ) : (
            searchResults?.map((post) => (
              <div key={post.slug.current} className="p-2 hover:bg-gray-100">
                <Link to={"/posts/" + post.slug.current}>
                  <BlogCard
                    title={post.title}
                    authorName={post.authorName}
                    image={post.mainImage.asset.url}
                  />
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
