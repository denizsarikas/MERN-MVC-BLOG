import { useState } from "react";
import { useCommentsContext } from "../hooks/useCommentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router";

const CommentForm = () => {
  const { dispatch } = useCommentsContext();
  const { user } = useAuthContext();
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const comment = { content };

    const response = await fetch(`/api/blogs/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
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
      setContent("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_COMMENT", payload: json });
    }
  };


  return (
    <form className="createComment" onSubmit={handleSubmit} >
      <input
        type="text"
        required
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className={emptyFields.includes("content") ? "error" : ""}
      />
      <button>Send your comment</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CommentForm;