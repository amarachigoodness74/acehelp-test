import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Table } from "lucide-react";
import { useDebounce } from "use-debounce";
import PageLoader from "../components/PageLoader";
import Search from "../components/Search";
import TodosTable from "../components/TodosTable";
import { useTodos } from "../utils";
import { ITodo } from "../types/todo";

enum types {
  CARD = "card",
  TABLE = "table",
}

const TodoList: React.FC = () => {
  const { data, error, isLoading } = useTodos();
  const [displyType, setDisplyType] = useState<string>(types.CARD);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState(24);
  const debouncedSearch = useDebounce(search, 300);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredTodos = useMemo(() => {
    if (!data) return [];
    let searchedTodos = data;

    if (debouncedSearch && String(debouncedSearch[0]).trim() !== "") {
      searchedTodos = searchedTodos.filter((todo: ITodo) =>
        todo.title?.toLowerCase().includes(debouncedSearch[0].toLowerCase())
      );
    }

    if (filter !== "all") {
      searchedTodos = searchedTodos.filter(
        (todo: ITodo) =>
          (filter === "completed" && todo.completed) ||
          (filter === "pending" && !todo.completed)
      );
    }

    return searchedTodos;
  }, [debouncedSearch, filter, data]);

  const visibleGridTodos = useMemo(() => {
    return filteredTodos ? filteredTodos.slice(0, visibleItems) : [];
  }, [filteredTodos, visibleItems]);
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

  const itemsPerPage = 30;
  const totalPages = filteredTodos
    ? Math.ceil(filteredTodos.length / itemsPerPage)
    : 0;
  const paginatedTodos = useMemo(() => {
    if (!filteredTodos) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTodos.slice(start, start + itemsPerPage);
  }, [filteredTodos, currentPage]);

  if (isLoading) return <PageLoader />;
  if (error)
    return (
      <p className="flex items-center justify-center h-screen">
        Error: {error.message}
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">List of Todos</h1>
      <div className="flex md:w-[10%] gap-4 ml-auto mb-12">
        <button
          onClick={() => setDisplyType(types.CARD)}
          disabled={displyType === types.CARD}
          className={`${
            displyType === types.CARD
              ? "p-3 rounded-md bg-gray-300"
              : "cursor-pointer"
          }`}
        >
          <LayoutGrid />
        </button>{" "}
        <button
          onClick={() => setDisplyType(types.TABLE)}
          disabled={displyType === types.TABLE}
          className={`${
            displyType === types.TABLE
              ? "p-3 rounded-md bg-gray-300"
              : "cursor-pointer"
          }`}
        >
          <Table />
        </button>
      </div>
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Search
          search={search}
          setSearch={setSearch}
          filters={["todos", "title"]}
          aria-label="Search todos by title"
        />
        <select
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-12"
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "completed" | "pending")
          }
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {displyType === types.TABLE && paginatedTodos && visibleGridTodos ? (
        <>
          <TodosTable filteredTodos={paginatedTodos} />
          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-6 mt-4">
            <button
              aria-label="Go to previous page"
              aria-disabled={currentPage === 1}
              className="cursor-pointer p-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 disabled:cursor-none"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }
              }}
            >
              Prev
            </button>

            <span className="text-md font-semibold" aria-live="polite">
              Page {currentPage} of {totalPages}
            </span>

            <button
              aria-label="Go to next page"
              aria-disabled={
                currentPage === totalPages || filteredTodos.length === 0
              }
              className="cursor-pointer p-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 disabled:cursor-none"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={
                currentPage === totalPages || filteredTodos.length === 0
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }
              }}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleGridTodos &&
              visibleGridTodos.map((todo: ITodo) => (
                <motion.div
                  key={todo.id}
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-lg shadow-lg border ${
                    todo.completed
                      ? "bg-green-100 border-green-400"
                      : "bg-red-100 border-red-400"
                  }`}
                >
                  <h3 className="font-semibold text-lg">{todo.title}</h3>
                  <p
                    className={`text-sm ${
                      todo.completed ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </p>
                </motion.div>
              ))}
          </div>
          {/* Lazy Load Observer */}
          <div
            ref={observerRef}
            className="h-10 flex justify-center items-center"
          >
            {loadingMore && (
              <span className="text-gray-500" aria-live="polite">
                Loading more...
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
