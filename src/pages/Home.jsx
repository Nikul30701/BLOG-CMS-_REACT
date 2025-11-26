import React, {useState, useContext} from 'react'
import { BlogContext } from '../context/BlogContext'
import  PostCard  from '../components/PostCard';

const Home = () => {
    const {posts} = useContext(BlogContext);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase()
            .includes(search.toLowerCase());
        const matchesCategory = categoryFilter 
            ? post.category.toLowerCase() === categoryFilter.toLowerCase()
            : true;
        return matchesSearch && matchesCategory
    })

    const uniqueCategories  = Array.from(
        new Set(posts.map((post) => post.category).filter(Boolean))
    )
    // Array.from use to create new array and Set is built in feature that return a unique values from the array

    const handleChangeInput = (e) => {
        setSearch(e.target.value)
    } 

    const handleChangeSelect = (e) => {
        setCategoryFilter(e.target.value);
    }

    return (
        <div className="space-y-4 ml-4">
            <div className="flex items-baseline justify-between gap-3 ">
                <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-white flex justify-center">
                    All Posts
                </h1>
                <p className="flex justify-center text-sm text-slate-400 ">
                    Browse, search and filter blog posts.
                </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={handleChangeInput}
                    className="w-full sm:max-w-xs rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <select
                    value={categoryFilter}
                    onChange={handleChangeSelect}
                    className="w-full sm:w-48 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                <option value="">All Categories</option>
                {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>
                    {cat}
                    </option>
                ))}
                </select>
            </div>

            {filteredPosts.length === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-center">
                <p className="text-sm text-slate-300">
                    No posts found. Try changing search or filters.
                </p>
                </div>
            ) : (
                <div className="mt-4">
                {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
                </div>
            )}
    </div>
    )
}

export default Home
