import { useParams, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import {PostForm} from "../components/PostFrom";

const EditPost = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const {getPostById, updatePost} = useContext(BlogContext);

    const [initialValues, setInitialValues] = useState(null)

    useEffect(() => {
        const post = getPostById(id);
        if (post) {
            setInitialValues({
                title: post.title,
                category: post.category,
                content: post.content,
                status: post.status,
                tags: post.tags,
                slug: post.slug,                
            });
        }
    }, [id, getPostById]);

    const handleUpdate = () => {
        const now = new Date().toISOString();
        const existing = getPostById(id);
        if (!existing) return;

        const updated = {
            ...existing,
            ...data,
            excerpt: contentString.slice(0,150) + (contentString.length > 150 ? "..." : ""),
            updatedAt: now,
        };
        updatePost(updated);
        navigate("/dashboard");
    }
    if (!initialValues) {
        return (
            <div className="rounded-xl border border-state-800 bg-slate-900/70 p-6 text-center">
                <p className="text-sm text-slate-300">Post not found.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-semibold text-white">Edit Post</h1>
                <p className="text-sm text-slate-400">
                    Update the content, category, status or tags
                </p>
            </div>
            <PostForm initialValues={initialValues} onSubmit={handleUpdate}/>
        </div>
    )
}

export default EditPost;
