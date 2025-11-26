import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import {AuthContext} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

const CreatePost = () => {
    const {user} = useContext(AuthContext);
    const {addPost} = useContext(BlogContext);
    const navigate = useNavigate();

    const handleCreate = (data) => {
        const now = new Date().toISOString();
        const newPost = {
            id: crypto.randomUUID(),
            ...data,
            excerpt: contentString.slice(0,150) + (contentString.length > 150 ? "..." : ""),
            author: user?.name || "Admin",
            createdAt: now,
            updatedAt: now,
        }

        addPost(newPost);
        navigate("/dashboard")
    }

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2-xl font-semibold text-center text-white">Create New Post</h1>
                <p className="text-sm text-state-400">
                    Draft a new article and share it with the world.
                </p>
            </div>
            <PostForm onSubmit={handleCreate} />
        </div>
    )
}

export default CreatePost;
