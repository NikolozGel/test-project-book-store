import { useOutletContext, useNavigate } from "react-router-dom";
import { BookList } from "../components/BookList";

export default function Home({
  addToBasket,
  handleDelete,
}: {
  addToBasket: (book: number, increase: boolean) => void;
  handleDelete: (id: number) => void;
}) {
  const navigate = useNavigate();
  const { bookData, currentPage } = useOutletContext<{
    bookData: TBooks;
    currentPage: number;
  }>();

  const itemsPerPage = 15;
  const paginatedBooks = bookData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="py-10">
      {paginatedBooks.length === 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/addNewBook")}
            className="mt-4 px-7 py-2 hover:bg-[#2699fb] text-blue-600 border
                  border-[#2699fb] hover:text-white rounded-lg bg-white
                "
          >
            Add New Book
          </button>
        </div>
      )}

      <BookList addToBasket={addToBasket} handleDelete={handleDelete} />
    </div>
  );
}
