import { useQuery } from "@tanstack/react-query";
import { timeAgo } from "../../../utils/date-utils";
import { fetchCommentsInPost } from "../../../api/comment";

export default function CommentSection({ postId }) {
  const {
    data: commentData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchCommentsInPost(postId),
    enabled: !!postId, // Chỉ fetch khi slug có giá trị
  });
  console.log(commentData);
  return (
    <>
      <div className="flex-1 max-h-96 overflow-y-auto">
        {commentData &&
          commentData.map((comment) => (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-start mt-10 gap-4">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src={comment.user.image} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-semibold">
                      {comment.user.name}
                    </h4>
                    <p className="text-gray-500 ml-1">
                      {timeAgo(comment.publishedAt)}
                    </p>
                  </div>
                </div>
              </div>
              <p>{comment.title}</p>
              <button className="btn w-1/12 px-4">Thích</button>
            </div>
          ))}
      </div>
    </>
  );
}
