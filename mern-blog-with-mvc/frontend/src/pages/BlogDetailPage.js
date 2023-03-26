import { useEffect, useState, useContext } from "react";
import { useBlogsContext } from "../hooks/useBlogsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { CommentsContext } from "../context/CommentsContext";
import { useParams } from "react-router";

// components
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";

const BlogDetailPage = () => {
  const [blogPost, setBlogPost] = useState(null)
  const { id } = useParams();
  const { blogs, dispatch } = useBlogsContext();
  const { user } = useAuthContext();
  const { comments, dispatch: dispatchComment } = useContext(CommentsContext);
  

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blogs", {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: "SET_BLOGS", payload: json });
      }
      
      const filteredBlog = await blogs.find((blog) => blog._id === id);
      setBlogPost(filteredBlog)
    };
    const fetchComments = async () => {
      const responseComment = await fetch(`/api/blogs/${id}/comments`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await responseComment.json()

      if (responseComment.ok) {
        dispatchComment({ type: "SET_COMMENTS", payload: json });
      }
    };

    if (user) {
      fetchBlogs();
      fetchComments();
    }
  }, [dispatch, user, dispatchComment]);

  return (
    <>
      <div className="blog">
        {blogPost ? (
          <>
            <h1>Title: {blogPost.title}</h1>
            <p>Content: {blogPost.content}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div>
          <CommentForm />
          <h1>Comments...</h1>
          <div className="blogs">
            {comments && comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
