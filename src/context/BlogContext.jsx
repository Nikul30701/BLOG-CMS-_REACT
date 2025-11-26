import React, { createContext, useState, useEffect } from 'react'


export const BlogContext = createContext();

const STORAGE_KEY = "blog_posts";

const initailPosts = [
    {
        id: "1",
        title: "Welcome to My Blog",
        slug: "welcome-to-my-blog",
        content: "This is the first post of the blog CMS.",
        excerpt: "This is the first post of the blog CMS.",
        author: "Admin User",
        category: "General",
        tags: ["intro", "welcome"],
        status: "published",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
]

const BlogProvider = ({children}) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setPosts(JSON.parse(stored));
        } else {
            setPosts(initailPosts);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initailPosts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }, [posts]);

    const addPost = (post) => {
        setPosts((prev) => [...prev, post])
    }

    const updatePost = (id, updatePost) => {
        setPosts((prev) => prev.map((post) => post.id === id ? updatePost : post))
    }

    const deletePost = (id) => {
        setPosts((prev) => prev.filter((post) => post.id !== id))
    }

    const getPostBySlug = (slug) => posts.find((post) => post.slug === slug);
    const getPostById = (id) => posts.find((post) => post.id === id)

    const value = {
        posts,
        addPost,
        updatePost,
        deletePost,
        getPostById,
        getPostBySlug
    }
    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogProvider
