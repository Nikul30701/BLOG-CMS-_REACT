import React, {useContext} from 'react'
import {BlogContext} from '../context/BlogContext'
import { AuthContext } from '../context/AuthContext'
import {useParams, Link} from "react-router-dom";

const PostDetails = () => {
    const {slug} = useParams();
    const {getPostBySlug} = useContext(BlogContext);
    const {isAuthenticated} = useContext(AuthContext)

    const post = getPostBySlug(slug)

    if (!post) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm text-slate-200">Post not found.</p>
        </div>
        );
    }

    return (
        <article className='space-y-4'>
            <div className='flext items-start justify-between gap-4'>
                <div>
                    <h1 className='text-2xl sm:text-3xl font-semibold text-white mb-1'>
                        {post.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400">
                        By {post.author} •{" "}
                        {new Date(post.createdAt).toLocaleDateString(undefined, {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"  
                        })}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                        Category: {" "}
                        <span className="font-medium text-slate-200">
                            {post.category}
                        </span>{" "}
                        • Status:{" "}
                        <span className="uppercase text-[11px] text-slate-300">
                            {post.status}
                        </span>
                    </p>
                </div>

                {isAuthenticated && (
                    <Link 
                        to={`/edit/${post.id}`}
                        className="hidden sm:inline-flex items-center rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 border border-slate-700"
                    >
                        Edit
                    </Link>
                )}
            </div>

            {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6">
                <p className="whitespace-pre-wrap text-sm sm:text-base text-slate-100 leading-relaxed">
                    {post.content}
                </p>
            </div>

            {isAuthenticated && (
                <div className='sm:hidden'>
                    <Link
                        to={`edit/${post.id}`}
                        className='inline-flex items-center rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 border border-slate-700'
                    >
                        Edit this post
                    </Link>
                </div>
            )}
        </article>
    )
}

export default PostDetails
