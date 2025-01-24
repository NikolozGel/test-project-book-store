import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import BasketIcon from "./BasketIcon";

interface HeaderProps {
  basketCount: number;
  bookData: TBooks;
  setFilteredBooks: React.Dispatch<React.SetStateAction<TBooks>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setNoResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  basketCount,
  bookData,
  setFilteredBooks,
  setCurrentPage,
  setNoResults,
}) => {
  const navigate = useNavigate();

  // ამ ფუნქციას ვიყენებ ფილტრების განულებისთვის როდესაც Logos ვაჭერთ
  const resetFilters = () => {
    setFilteredBooks([]); // ფილტრების განულება
    setCurrentPage(1); // პირველი გვერდზე დაბრუნება
    navigate("/"); // მთავარ გვერდზე დაბრუნება
    setNoResults(false);
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
        <BasketIcon basketCount={basketCount} />
      </header>
    </>
  );
};

export default Header;
