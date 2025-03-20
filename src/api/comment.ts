import sanityClient from "../client";

export const createComment = async (comment) => {
  console.log(comment);
  const data = await sanityClient.create({
    _type: "comment",
    post: {
      _type: "reference",
      _ref: comment.postId, // Tham chiếu đúng schema
    },
    user: {
      _type: "reference",
      _ref: comment.userId, // Tham chiếu đúng userId
    },
    title: comment.title,
    publishedAt: new Date().toISOString(), // Khớp với schema
    isPublished: false,
  });

  return data;
};
export const fetchCommentsInPost = async (postId: string) => {
  const data = await sanityClient.fetch(
    `*[_type == "comment" && references($postId)] | order(publishedAt desc) {
      title,
      slug,
    user-> {
              name,
          "image": mainImage.asset->url
            },
      body,
      publishedAt,
    }`,
    { postId } // ✅ Lọc bài viết theo categoryId
  );

  return data; // ✅ Trả về danh sách bài viết liên quan đến category
};
