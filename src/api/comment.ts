import sanityClient from "../client";
import { v4 as uuidv4 } from "uuid";
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
      _id,
      slug,
      likes,
    user-> {
              name,
              _id,
          "image": mainImage.asset->url
            },
      body,
      publishedAt,
    }`,
    { postId } // ✅ Lọc bài viết theo categoryId
  );

  return data; // ✅ Trả về danh sách bài viết liên quan đến category
};
export const deleteComment = async (userId: string, commentId: string) => {
  try {
    const data = await sanityClient.delete({
      query:
        '*[_type == "comment" && _id == $commentId && references($userId)]',
      params: { userId, commentId },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const likeComment = async (commentId: string, userId: string) => {
  console.log("commentId:", commentId);

  try {
    // ✅ Fetch the comment and ensure `likes` field is included
    const comment = await sanityClient.fetch(
      `*[_type == "comment" && _id == $commentId][0] {  likes }`,
      { commentId }
    );

    if (!comment) throw new Error("Comment not found.");

    // ✅ Ensure `likes` is defined (default to empty array)
    const likes = comment.likes || [];

    // ✅ Check if user already liked the comment
    const hasLiked = likes.some((like) => like._ref === userId);

    if (hasLiked) {
      // ✅ Unlike: Remove user from `likes` array
      await sanityClient
        .patch(commentId)
        .unset([`likes[_ref=="${userId}"]`])
        .commit();
    } else {
      // ✅ Like: Add user to `likes` array with a unique `_key`
      await sanityClient
        .patch(commentId)
        .setIfMissing({ likes: [] }) // ✅ Ensure `likes` field exists
        .append("likes", [{ _key: uuidv4(), _ref: userId, _type: "reference" }])
        .commit();
    }

    return { success: true };
  } catch (error) {
    console.error("Error liking/unliking comment:", error);
    throw error;
  }
};
