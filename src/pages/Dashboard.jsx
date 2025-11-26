import {Link} from "react-router-dom";
import {useContext} from "react";
import { BlogContext } from "../context/BlogContext";

const Dashboard = () => {
    const {posts, deletePost} = useContext(BlogContext);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this post?")){
            deletePost(id);
        }   
    }
    
    return (
        <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
            <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <p className="text-sm text-slate-400 ml-4">
                Manage your posts from a single place.
            </p>
            </div>
            <Link
            to="/create"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-2"
            >
            + Create New Post
            </Link>
        </div>

        {posts.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-center">
            <p className="text-sm text-slate-300">
                No posts yet. Create your first post to get started.
            </p>
            </div>
        ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/70">
            <table className="min-w-full text-sm">
                <thead className="bg-slate-900">
                <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                {posts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/60">
                    <td className="px-4 py-3 text-slate-100">{p.title}</td>
                    <td className="px-4 py-3 text-slate-300">{p.category}</td>
                    <td className="px-4 py-3 text-slate-300">
                        <span className="inline-flex rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-200">
                        {p.status}
                        </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                        <Link
                        to={`/edit/${p.id}`}
                        className="text-xs font-medium text-indigo-400 hover:text-indigo-300 mr-3"
                        >
                        Edit
                        </Link>
                        <button
                        onClick={() => handleDelete(p.id)}
                        className="text-xs font-medium text-rose-400 hover:text-rose-300"
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
    </div>
    )
}

export default Dashboard;
