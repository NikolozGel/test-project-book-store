import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import BasketIcon from "./BasketIcon";

interface HeaderProps {
  getTotalQuantity: number;
  bookData: TBooks;
  setFilteredBooks: React.Dispatch<React.SetStateAction<TBooks>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setNoResults: React.Dispatch<React.SetStateAction<boolean>>;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
}

const Header: React.FC<HeaderProps> = ({
  getTotalQuantity,
  bookData,
  setFilteredBooks,
  setCurrentPage,
  setNoResults,
  setMinValue,
  setMaxValue,
}) => {
  const navigate = useNavigate();

  // ამ ფუნქციას ვიყენებ ფილტრების განულებისთვის როდესაც Logos ვაჭერთ
  const resetFilters = () => {
    setFilteredBooks([]); // ფილტრების განულება
    setCurrentPage(1); // პირველი გვერდზე დაბრუნება
    navigate("/"); // მთავარ გვერდზე დაბრუნება
    setNoResults(false);
    setMinValue(0);
    setMaxValue(200);
  };
  return (
    <>
      <header className="max-w-screen-xl mx-auto flex flex-col md:items-center  md:flex-row md:justify-between text-white pt-14 px-4">
        <h1 className="text-4xl text-[#2699fb] font-serif">
          <Link to="/" onClick={resetFilters}>
            BookShop
          </Link>
        </h1>

        {/* SearchBar Component */}
        <SearchBar
          bookData={bookData}
          setFilteredBooks={setFilteredBooks}
          setNoResults={setNoResults}
          setCurrentPage={setCurrentPage}
        />

        {/* BasketIcon Component */}
        <BasketIcon getTotalQuantity={getTotalQuantity} />
      </header>
    </>
  );
};

export default Header;
