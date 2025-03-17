import React from "react";
import { timeAgo } from "../../../utils/date-utils";

export default function HeaderBlog({ title, authorImage, name, publishedAt }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-left">{title}</h2>

      <div className="flex items-center justify-start mt-4">
        {authorImage && (
          <img
            src={authorImage}
            className="w-12 h-12 rounded-full mr-2"
            alt={name}
          />
        )}
        <div>
          <h4 className="text-xl font-semibold">{name}</h4>
          <p className="text-gray-500">{timeAgo(publishedAt)}</p>
        </div>
      </div>
    </div>
  );
}
