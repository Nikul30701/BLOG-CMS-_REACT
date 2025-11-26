import { Link } from "react-router-dom";

const PostCard = ({post}) => {
    return (
        <article className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 sm:p-5 mb-4 shadow-sm hover:shadow-md hover:border-slate-700 transition">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">
                <Link to={`/post/${post.slug}`}
                    className="hover:text-indigo-400 transition"
                >
                    {post.title}
                </Link>
            </h2>
            <p className="text-xs text-slate-400 mb-2">
                By {post.author} •{" "}
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </p>
            <p className="text-sm text-slate-200 mb-3 line-clamp-2">
                {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200">
                    {post.category}
                </span>
                <span className="text-[11px] uppercase tracking-wide text-slate-500">
                    {post.status}
                </span>
            </div>
        </article>
    )
}

export default PostCard;
