import { useState } from "react";
import SearchImg from "../assets/search.png";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  bookData,
  setFilteredBooks,
  setNoResults,
  setCurrentPage,
}: {
  bookData: TBooks;
  setFilteredBooks: React.Dispatch<React.SetStateAction<TBooks>>;
  setNoResults: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [filterValue, setfilterValue] = useState("");
  const navigate = useNavigate();

  // ინპუტის მნიშვნელობის განახლება
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfilterValue(e.target.value);
  };

  // ფილტრაცია button-ზე დაკლიკებისას
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredOptions = bookData.filter(
      (book) =>
        book.author.toLowerCase().includes(filterValue.toLowerCase()) ||
        book.category.toLowerCase().includes(filterValue.toLowerCase()) ||
        book.description.toLowerCase().includes(filterValue.toLowerCase()) ||
        book.name.toLowerCase().includes(filterValue.toLowerCase())
    );

    setFilteredBooks(filteredOptions);

    if (filteredOptions.length === 0 && filterValue !== "") {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    if (filterValue.length > 0) {
      navigate(`/product/${filterValue}`);
      setCurrentPage(1);
    }
    setfilterValue("");
  };

  return (
    <form className="flex" onSubmit={handleSubmit} id="searchForm">
      <input
        name="searchText"
        type="text"
        value={filterValue}
        className="w-full md:w-[406px] px-5 rounded-l-md border-[1px] border-gray-150 text-gray-400 focus:border-[#2699fb] outline-none"
        placeholder="Find your Product"
        onChange={handleFilterChange}
      />
      <button
        className="flex items-center justify-center gap-3 px-5 bg-[#2699fb] hover:opacity-80 lg:w-[100px] h-[54px] rounded-r-md text-white"
        type="submit"
      >
        <img src={SearchImg} className="w-5 invert" alt="Search" />
        Search
      </button>
    </form>
  );
};

export default SearchBar;
