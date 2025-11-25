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
            style={{display: "flex", flexDirection: "column", gap: "1rem"}}
        >
            <label>
                Title 
                <input 
                    type="text"
                    name="title"
                    value={form.title} 
                    onChange={handleChange}
                    required
                    autoComplete="off" 
                />
            </label>
            <label>
                Tags  
                <input 
                    type="text"
                    name="category"
                    value={form.category} 
                    onChange={handleChange}
                    required 
                />
            </label>

            <label>
                Status 
                <select
                    name='status'
                    value={form.status}
                    onChange={handleChange}
                    required
                >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
            </label>

            <label>
                Content
                <textarea
                    name='content'
                    value={form.content}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    rows={8}
                />
            </label>
            
        </form>
    )
}

export default PostForm
