import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import PageLoader from "../components/PageLoader";
import Search from "../components/Search";
import AlbumsTable from "../components/AlbumsTable";
import { useAlbums } from "../utils";
import { IAlbum } from "../types/album";

const Albums = () => {
  const { data, error, isLoading } = useAlbums();

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter albums based on search input
  const filteredAlbums: IAlbum[] = useMemo(() => {
    if (!data) return [];

    let searchedAlbums = data;

    if (debouncedSearch.trim() !== "") {
      searchedAlbums = searchedAlbums.filter((album: IAlbum) =>
        album.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    return searchedAlbums;
  }, [debouncedSearch, data]);

  const totalPages =
    filteredAlbums.length > 0
      ? Math.ceil(filteredAlbums.length / itemsPerPage)
      : 1;

  // Reset pagination when filtered users change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredAlbums]);

  const paginatedAlbums = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAlbums.slice(start, start + itemsPerPage);
  }, [filteredAlbums, currentPage]);

  if (isLoading) return <PageLoader />;
  if (error)
    return (
      <p className="flex items-center justify-center h-screen">
        Error: {error.message}
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Released Albums</h1>

      <Search
        search={search}
        setSearch={setSearch}
        filters={["albums", "title"]}
        aria-label="Search albums by title"
      />

      <AlbumsTable filteredAlbums={paginatedAlbums} />

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
            currentPage === totalPages || filteredAlbums.length === 0
          }
          className="cursor-pointer p-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 disabled:cursor-none"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || filteredAlbums.length === 0}
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

export default Albums;
