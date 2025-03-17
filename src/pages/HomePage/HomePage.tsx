import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Category from "../../components/Category";
import sanityClient from "../../client.js";
import BlogCard from "../../components/BlogCard/BlogCard";
import { fetchPosts } from "../../api/post.js";

const categories = [
  { name: "For you", isActive: true },
  { name: "Following" },
  { name: "Featured", isNew: true },
  { name: "Cybersecurity" },
  { name: "Software Engineering" },
  { name: "Web Development" },
  { name: "Mobile Development" },
  { name: "Data Science" },
  { name: "Machine Learning" },
  { name: "DevOps" },
  { name: "Cloud Computing" },
];

// Hàm fetch dữ liệu từ Sanity

export default function HomePage() {
  // Sử dụng React Query để fetch dữ liệu
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading)
    return (
      <p className="text-center mt-10">
        <div className="skeleton h-32 w-32"></div>
      </p>
    );
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error loading posts.</p>
    );

  return (
    <div className="container mx-auto">
      <div className="max-w-screen-xl mx-auto mt-4">
        <Category categories={categories} />
      </div>

      <div className="max-w-screen-lg mx-auto mt-10">
        {posts.map((post) => (
          <Link to={"/" + post.slug.current} key={post.slug.current}>
            <BlogCard
              title={post.title}
              authorName={post.authorName}
              image={post.mainImage.asset.url}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
