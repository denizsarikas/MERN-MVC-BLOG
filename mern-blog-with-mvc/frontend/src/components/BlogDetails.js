import { useBlogsContext } from "../hooks/useBlogsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";


const BlogDetails = ({ blog }) => {
  console.log(blog)
  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/blogs/" + blog._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json)
      //dispatch({ type: "DELETE_BLOG", payload: json });
      //dispatch({ type: "DELETE_BLOG", payload: { _id: blog._id } });
      dispatch({ type: "DELETE_BLOG", payload: { _id: json.blog._id } });
    }
  };


  return (
    
    <div className="blog-details">
      <Link className="blogLink" to={`/blogs/${blog._id}`}>
      <h4>{blog.title}</h4>
      <p>
        <strong></strong>
        {blog.content}
      </p>
      <p>
        {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
        <Link className="blog-p" to={`/blogs/${blog._id}/edit`}>Edit</Link>
      </p>
      </Link>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default BlogDetails;