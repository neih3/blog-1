import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import sanityClient from "../../client.js";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import HeaderBlog from "./components/HeaderBlog.js";
import { fetchPost } from "../../api/post.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Heart, MessageCircle } from "lucide-react";

import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { createComment } from "../../api/comment.js";
import CommentSection from "./components/CommentSection.js";

// Hàm tạo URL ảnh từ Sanity
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function DetailPage() {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const { user } = useUser();

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

  console.log(postData);
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
        authorImage={postData.user.image}
        name={postData.user.name}
        publishedAt={postData.publishedAt}
      />

      <img
        className="w-full object-cover rounded-lg mt-6"
        src={urlFor(postData.mainImage).width(800).url() || ""}
        alt={postData.user.name}
      />
      {/* Hiển thị nội dung bài viết */}
      <div className="mt-6 px-4 text-gray-700">
        <PortableText
          value={postData.body}
          components={{
            types: {
              image: ({ value }) => (
                <img
                  src={urlFor(value.asset).url() || ""}
                  alt="Blog content"
                  className="w-full object-cover rounded-lg my-4"
                />
              ),
            },
          }}
        />
      </div>
      <div className="mt-4">
        <div className="flex gap-2 justify-end cursor-pointer">
          <Heart />
          <span>1</span>
        </div>
        <div className="flex gap-10 items-start">
          {/* Form bình luận */}
          <div className="flex flex-col w-1/2">
            <div className="flex flex-col mt-4">
              <label htmlFor="">Bình luận</label>

              <textarea
                className="textarea w-full"
                placeholder="Để lại bình luận..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
            </div>{" "}
            <button
              className="btn btn-success mt-2"
              onClick={async () => {
                await createComment({
                  postId: postData._id,
                  userId: user.id,
                  title: title, // Chuyển từ string sang blockContent
                });
                setTitle(""); // Reset textarea sau khi gửi
              }}
            >
              Bình luận
            </button>
          </div>
          {/* Bình luận */}
          <CommentSection postId={postData._id} />
        </div>
      </div>
    </div>
  );
}
