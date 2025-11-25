import { Link } from "react-router-dom";

export const PostCard = ({post}) => {
    return (
        <article>
            <h2>
                <Link to={`/post/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>
                By {post.author} * {new Date(post.createdAt.toLocaleDateString())}
            </p>
            <p>{post.excerpt}</p>
            <p style={{fontSize: "0.85rem", color:"#555"}}>
                Category: {post.category}
            </p>
        </article>
    )
}
