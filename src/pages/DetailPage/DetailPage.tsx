import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import sanityClient from "../../client.js";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import HeaderBlog from "./components/HeaderBlog.js";
import { fetchPost } from "../../api/post.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Hàm tạo URL ảnh từ Sanity
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function DetailPage() {
  const { slug } = useParams();

  // Sử dụng React Query để fetch dữ liệu
  const {
    data: postData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug, // Chỉ fetch khi slug có giá trị
  });

  if (isLoading)
    return (
      <div className="container mx-auto p-6 max-w-5xl">
        <Skeleton count={3} />
        <Skeleton circle count={1} />

        <div className="mt-6 px-4 text-gray-700">
          <Skeleton count={10} />
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">Error loading post.</div>
    );
  if (!postData) return <div className="text-center mt-10">No data found.</div>;

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <HeaderBlog
        title={postData.title}
        authorImage={postData.authorImage}
        name={postData.name}
        publishedAt={postData.publishedAt}
      />
      <img
        className="w-full object-cover rounded-lg mt-6"
        src={urlFor(postData.mainImage).width(800).url()}
        alt={postData.title}
      />
      <div></div>
      // Simple, single-line loading skeleton // Five-line loading skeleton
      {/* Hiển thị nội dung bài viết */}
      <div className="mt-6 px-4 text-gray-700">
        <PortableText
          value={postData.body}
          components={{
            types: {
              image: ({ value }) => (
                <img
                  src={urlFor(value.asset).url()}
                  alt="Blog content"
                  className="w-full object-cover rounded-lg my-4"
                />
              ),
            },
          }}
        />
      </div>
    </div>
  );
}
