import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateBlog from './pages/CreateBlog';
import BlogDetailPage from './pages/BlogDetailPage';
import EditBlogPage from './pages/EditBlogPage';

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route 
              path="/create"
              element={user ? <CreateBlog /> : <Navigate to="/login" />}
            />
            <Route 
              path="/blogs/:id"
              element={<BlogDetailPage />}
            />
            <Route 
              path="/blogs/:id/edit"
              element={<EditBlogPage />}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;