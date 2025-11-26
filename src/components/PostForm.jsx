import React, {useState} from 'react'

const slugify = (title) => {
    return title
        .toLoweCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
}

const PostForm = ({initalValues, onSubmit}) => {

    const [form, setForm] = useState(
        initalValues || {
            title: "",
            content: '',
            category:"",
            tags:"",
            status: "published"
        }
    )

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const tagsArray = form.tags 
            ? form.tags.split(",").map((tag) => tag.trim())
            : [];

        const slug = initalValues?.slug || slugify(form.title);

        onSubmit({
            ...form,
            slug,
            tags: tagsArray
        })
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="space-y-4 bg-slate-900/70 border border-slate-800 rounded-xl p-4 sm:p-6"
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-200">
                    Title 
                    <input 
                        type="text"
                        name="title"
                        value={form.title} 
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    />
                </label>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-200">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-200">
                        Tags (comma separated)
                    </label>
                    <input
                        type="text"
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        placeholder="react, javascript, frontend"
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-200">Status</label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-200">Content</label>
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        rows={8}
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                Save Post
                </button>
            </div>
            
        </form>
    )
}

export default PostForm
