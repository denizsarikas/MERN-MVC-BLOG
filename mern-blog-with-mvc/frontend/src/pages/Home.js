import { useEffect }from 'react'
import { useBlogsContext } from "../hooks/useBlogsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import BlogDetails from '../components/BlogDetails'
import BlogForm from '../components/BlogForm'

const Home = () => {

    const {blogs, dispatch} = useBlogsContext()
    const {user} = useAuthContext()

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_BLOGS', payload: json})
      }
    }

     if (user) {
       fetchBlogs()
     }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="blogs">
        {blogs && blogs.map((blog) => (
          <BlogDetails key={blog._id} blog={blog} />
        ))}
      </div>
     {/* <BlogForm /> */}
    </div>
  )
}

export default Home