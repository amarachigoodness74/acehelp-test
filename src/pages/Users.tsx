import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import PageLoader from "../components/PageLoader";
import Search from "../components/Search";
import UsersTable from "../components/UsersTable";
import { useUsers } from "../utils";
import { IUser } from "../types/user";

const Users = () => {
  const { data, error, isLoading } = useUsers();

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter users based on search input
  const filteredUsers = useMemo(() => {
    if (!data) return [];

    let searchedUsers = data;

    if (debouncedSearch.trim() !== "") {
      searchedUsers = searchedUsers.filter((user: IUser) =>
        user.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    return searchedUsers;
  }, [debouncedSearch, data]);

  const totalPages =
    filteredUsers.length > 0
      ? Math.ceil(filteredUsers.length / itemsPerPage)
      : 1;

  // Reset pagination when filtered users change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  if (isLoading) return <PageLoader />;
  if (error)
    return (
      <p className="flex items-center justify-center h-screen">
        Error: {error.message}
      </p>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Registered Users</h1>

      <Search
        search={search}
        setSearch={setSearch}
        filters={["users", "name"]}
        aria-label="Search users by name"
      />

      <UsersTable filteredUsers={paginatedUsers} />

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
            currentPage === totalPages || filteredUsers.length === 0
          }
          className="cursor-pointer p-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 disabled:cursor-none"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || filteredUsers.length === 0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
