import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BlogsContextProvider } from "./context/BlogsContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CommentsContextProvider } from "./context/CommentsContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <BlogsContextProvider>
      <CommentsContextProvider>
      <App />
      </CommentsContextProvider>
    </BlogsContextProvider>
  </AuthContextProvider>
);
