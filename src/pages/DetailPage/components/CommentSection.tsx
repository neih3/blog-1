import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { timeAgo } from "../../../utils/date-utils";
import {
  deleteComment,
  fetchCommentsInPost,
  likeComment,
} from "../../../api/comment";
import { Ellipsis, Heart } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

export default function CommentSection({ postId }) {
  const { user } = useUser(); // ✅ Initialize user
  const queryClient = useQueryClient();

  const {
    data: commentData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsInPost(postId),
    enabled: !!postId, // ✅ Only fetch when postId is available
  });
  console.log(commentData);
  // ✅ Delete comment mutation
  const deleteMutation = useMutation({
    mutationFn: async (commentId) => await deleteComment(user.id, commentId),
    onSuccess: () => {
      toast.success("Bình luận đã được xóa");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (commentId) => await likeComment(commentId, user.id),
    onSuccess: () => {
      toast.success("Đã thích bình luận");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  return (
    <>
      <div className="flex-1 max-h-96 overflow-y-auto">
        {commentData &&
          commentData.map((comment) => (
            <div className="flex flex-col gap-3" key={comment._id}>
              <div className="flex">
                <div className="flex items-center justify-start mt-10 gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src={comment.user.image} alt={comment.user.name} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <h4 className="text-lg font-semibold">
                        {comment.user.name}
                      </h4>
                      <p className="text-gray-500 ml-2">
                        {timeAgo(comment.publishedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Dropdown for Delete */}
                  {user?.id === comment.user._id && (
                    <details className="dropdown">
                      <summary className="btn btn-ghost m-1">
                        <Ellipsis />
                      </summary>
                      <ul className="menu dropdown-content bg-base-200 rounded-box z-1 w-full text-center p-2 shadow-sm">
                        <li
                          className="cursor-pointer"
                          onClick={() => deleteMutation.mutate(comment._id)}
                        >
                          Xóa
                        </li>
                      </ul>
                    </details>
                  )}
                </div>
              </div>
              <p>{comment.title}</p>

              {/* ✅ Like Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (user) {
                      likeMutation.mutate(comment._id);
                    } else {
                      toast.error("Vui lòng đăng nhập để thích bình luận");
                    }
                  }}
                  className="px-2"
                >
                  <Heart
                    fill={
                      comment.likes?.some((like) => like._ref === user?.id)
                        ? "red"
                        : "none"
                    }
                  />
                </button>
                <span>{comment.likes?.length || 0}</span>{" "}
                {/* ✅ Dynamic like count */}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
