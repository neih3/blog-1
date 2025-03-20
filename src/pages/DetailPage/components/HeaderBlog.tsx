import { timeAgo } from "../../../utils/date-utils";

export default function HeaderBlog({ title, authorImage, name, publishedAt }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-left">{title}</h2>

      <div className="flex items-center justify-start mt-10 gap-4">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={authorImage} />
          </div>
        </div>
        <div>
          <div>
            <h4 className="text-lg font-semibold">{name}</h4>
            <p className="text-gray-500">{timeAgo(publishedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
