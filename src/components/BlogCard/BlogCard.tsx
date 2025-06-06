import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  title: string;
  authorName: string;
  image: string;
  id: string;
  slug: string;
}

export default function BlogCard({
  title,
  authorName,
  image,
  id,
  slug,
}: BlogCardProps) {
  return (
    <div className="flex justify-center">
      <Link
        to={`/posts/${id}/${slug}`}
        className="flex gap-4 border-b border-gray-200 p-4 w-full hover:bg-gray-50"
      >
        <div className="w-4/5">
          <h3 className="text-sm text-gray-600">{authorName}</h3>
          <h2 className="font-bold text-xl line-clamp-2">{title}</h2>
          {/* <span className="text-gray-500">
            How to start cyber security in 2025
          </span> */}
        </div>
        <div className="w-1/5">
          <div className="">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image}
              alt="Blog image"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
