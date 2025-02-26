import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Post from "../pages/Post";
import Blog from "../pages/Blog";
import Users from "../pages/Users";
import TodoList from "../pages/Todos";
import Albums from "../pages/Albums";
import ScrollToTop from "./ScroolToTopBtn";

const PostWrapper = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/users" element={<Users />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/albums" element={<Albums />} />
        </Routes>
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default PostWrapper;
