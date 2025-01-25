import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PaginationProps {
  currentPage: number;
  currentBooks: TBooks;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  booksToPaginate: TBooks;
  noResults: boolean;
  isLoading: boolean;
}

export default function Pagination({
  currentPage,
  currentBooks,
  setCurrentPage,
  totalPages,
  booksToPaginate,
  noResults,
  isLoading,
}: PaginationProps) {
  const visiblePages = 5;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && currentBooks.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      navigate(`/page/${currentPage - 1}`);
    }
  }, [currentBooks, currentPage, setCurrentPage, navigate, isLoading]);

  const pages = (() => {
    if (currentPage <= 0 || visiblePages <= 0 || totalPages <= 0) return [];

    let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    let endPage = startPage + visiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  })();

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber === currentPage) return;
    setCurrentPage(pageNumber);
    navigate(`/page/${pageNumber}`);
    window.scrollTo({ top: 0 });
  };

  const handlePrevious = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  return (
    <div
      className={`${
        location.pathname.includes("/basket") ||
        location.pathname.includes("/book") ||
        location.pathname.includes("/edit-product") ||
        noResults === true ||
        currentBooks.length < 15 ||
        location.pathname.includes("/addNewBook") ||
        booksToPaginate.length === 0
          ? "hidden"
          : "flex justify-center space-x-2 mt-10 mb-12"
      }`}
    >
      <button
        className="px-4 py-2 text-black hover:bg-[#2699fb] hover:text-white rounded-lg shadow-md"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pages.map((number) => {
        const buttonColor =
          number === currentPage ? "bg-[#2699fb] text-white" : "bg-gray-200";
        return (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 rounded ${buttonColor}  transition duration-300`}
          >
            {number}
          </button>
        );
      })}
      <button
        className="px-4 py-2 text-black hover:bg-[#2699fb] hover:text-white rounded-lg shadow-md"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
