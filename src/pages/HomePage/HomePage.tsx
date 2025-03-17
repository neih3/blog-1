import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Category from "../../components/Category";
import BlogCard from "../../components/BlogCard/BlogCard";
import { fetchPosts, fetchPostsInCategory } from "../../api/post.js";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const tag = searchParams.get("tag");
  const categoryId = location.state?.categoryId; // ✅ Tránh lỗi khi `categoryId` là undefined

  const {
    data: posts = [], // ✅ Tránh lỗi khi `posts` là undefined
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", tag],
    queryFn: () => {
      if (tag && categoryId) {
        return fetchPostsInCategory(categoryId);
      }
      return fetchPosts();
    },
    enabled: true, //
  });

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
    <div className="container mx-auto">
      <div className="max-w-screen-xl mx-auto mt-4">
        <Category />
      </div>

      <div className="max-w-screen-lg mx-auto mt-10">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts found</p>
        ) : (
          posts.map((post) => (
            <Link to={`/posts/${post.slug.current}`} key={post.slug.current}>
              <BlogCard
                title={post.title}
                authorName={post.authorName}
                image={post.mainImage.asset.url}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
