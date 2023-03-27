import React from 'react'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'


const EditBlog = () => {
  const { user } = useAuthContext()
  const { id } = useParams();

  const [redirect, setRedirect] = useState(false)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const blog = { title, content };

    const response = await fetch(`/api/blogs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setContent("");
      setError(null);
      setEmptyFields([]);
      //dispatch({ type: "CREATE_BLOG", payload: json });
      setRedirect(true)
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />
  }
  
  return (
<form className="create" onSubmit={handleSubmit}>
      <h3>Edit Blog</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Content</label>
      <input
        type="text"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className={emptyFields.includes("content") ? "error" : ""}
      />

      <button>Add This Blog</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EditBlog