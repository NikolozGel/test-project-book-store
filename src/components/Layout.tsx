import { Outlet } from "react-router-dom";
import Header from "./Header";
import Pagination from "./Pagination";
import Footer from "./Footer";
import FilterOptions from "./FilterOptions";
import { useEffect, useState } from "react";
import PriceRangeSlider from "./PriceRangeSlider";

export default function Layout({
  filteredBooks,
  setFilteredBooks,
  bookData,
  getTotalQuantity,
  setNoResults,
  noResults,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  isLoading,
}: {
  filteredBooks: TBooks;
  setFilteredBooks: React.Dispatch<React.SetStateAction<TBooks>>;
  bookData: TBooks;
  getTotalQuantity: number;
  error: string;
  setNoResults: React.Dispatch<React.SetStateAction<boolean>>;
  noResults: boolean;
  minValue: number;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  maxValue: number;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}) {
  // ფეიჯინგის ლოგიკა, საწყისი გვერდის განლაგება
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const page = localStorage.getItem("currentPage");
    return page ? parseInt(page) : 1;
  });

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  // ფეიჯინგის ლოგიკა
  const booksPerPage = 15;
  const booksToPaginate = filteredBooks.length > 0 ? filteredBooks : bookData;
  const totalPages = Math.ceil(booksToPaginate.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = booksToPaginate.slice(indexOfFirstBook, indexOfLastBook);
  // ფეიჯინგის ლოგიკას ვიყენებ აქ იმიტომ რომ გადავცე მთავარ გვერდს პროპსად.

  return (
    <div>
      <Header
        setCurrentPage={setCurrentPage}
        bookData={bookData}
        setFilteredBooks={setFilteredBooks}
        getTotalQuantity={getTotalQuantity}
        setNoResults={setNoResults}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
      />
      <PriceRangeSlider
        bookData={bookData}
        setFilteredBooks={setFilteredBooks}
        minValue={minValue}
        setMinValue={setMinValue}
        maxValue={maxValue}
        setMaxValue={setMaxValue}
      />
      <FilterOptions
        getTotalQuantity={getTotalQuantity}
        bookData={bookData}
        setFilteredBooks={setFilteredBooks}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content */}
      <main>
        <Outlet
          context={{
            bookData,
            currentPage,
            currentBooks,
            setCurrentPage,
            booksToPaginate,
            noResults,
            setFilteredBooks,
          }}
        />
      </main>

      <Pagination
        booksToPaginate={booksToPaginate}
        currentBooks={currentBooks}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        noResults={noResults}
        isLoading={isLoading}
      />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
