import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { ChevronDown, HeartHandshake } from "lucide-react";
import PageLoader from "../components/PageLoader";
import Search from "../components/Search";
import { usePosts } from "../utils";
import { IPost } from "../types/post";

const Blog = () => {
  const { data, error, isLoading } = usePosts();
  const [visibleItems, setVisibleItems] = useState(24);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [loadingMore, setLoadingMore] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!data) return [];
    let searchedPosts = data;

    if (debouncedSearch && String(debouncedSearch[0]).trim() !== "") {
      searchedPosts = searchedPosts.filter((post: IPost) =>
        post.title?.toLowerCase().includes(debouncedSearch[0].toLowerCase())
      );
    }
    return searchedPosts;
  }, [debouncedSearch, data]);

  const visibleGridPosts = useMemo(() => {
    return filteredPosts ? filteredPosts.slice(0, visibleItems) : [];
  }, [filteredPosts, visibleItems]);

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleItems((prev) => prev + 24);
      setLoadingMore(false);
    }, 500);
  };

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loadingMore) {
            loadMore();
          }
        },
        { threshold: 1.0 }
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [loadingMore]
  );

  if (isLoading) return <PageLoader />;
  if (error)
    return (
      <p className="flex items-center justify-center h-screen">
        Error: {error.message}
      </p>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

      <Search
        search={search}
        setSearch={setSearch}
        filters={["posts", "title"]}
        aria-label="Search posts by title"
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleGridPosts.map((post: IPost) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.02 }}
            className="p-5 bg-white shadow-lg rounded-lg transition-all duration-300 flex flex-col h-full"
          >
            <h2 className="font-mono font-bold text-xl md:text-3xl mb-3 text-gray-800">
              {post.title}
            </h2>

            <p className="text-gray-600 leading-relaxed flex-grow">
              {post.body}
            </p>

            {/* Footer Section */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
              <Link
                to={`/post/${post.id}`}
                className="flex items-center text-blue-900 font-medium hover:scale-105 transition-transform duration-200"
                aria-label={`Read more about ${post.title}`}
              >
                Read More
                <span className="ml-1 mt-0.5">
                  <ChevronDown width="20" height="20" />
                </span>
              </Link>

              <div className="relative">
                <HeartHandshake
                  width="36"
                  height="36"
                  className="cursor-pointer transition-transform hover:scale-110 text-blue-900"
                />
                <span className="absolute -top-3 -right-4 px-[0.4rem] py-[0.2rem] min-w-[22px] min-h-[22px] flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-md text-gray-500 text-xs font-semibold">
                  {Math.floor(Math.random() * 71)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lazy Load Observer */}
      <div ref={observerRef} className="h-10 flex justify-center items-center">
        {loadingMore && (
          <span className="text-gray-500" aria-live="polite">
            Loading more...
          </span>
        )}
      </div>
    </div>
  );
};

export default Blog;
