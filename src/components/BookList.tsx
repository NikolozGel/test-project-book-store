import { useNavigate, useOutletContext } from "react-router-dom";
import AddBasket from "./AddToBasket";

interface BookListProps {
  handleDelete: (id: number) => void;
  addToBasket: (bookId: number, increase: boolean) => void;
}

export function BookList({ addToBasket, handleDelete }: BookListProps) {
  const { currentBooks, noResults } = useOutletContext<{
    currentBooks: TBooks;
    noResults: boolean;
  }>();
  const navigate = useNavigate();
  const handleNavigate = (id: number) => navigate(`/book/${id}`);
  return (
    <>
      {noResults ? (
        <h1 className="text-xl text-center my-7 text-gray-500">
          book Not Found
        </h1>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentBooks.map((book) => {
            return (
              <div key={book.id} className="relative  group">
                <img
                  src={book.image}
                  alt="bookImg"
                  className="w-full h-[400px] object-contain cursor-pointer"
                  onClick={() => handleNavigate(book.id)}
                />
                <div className="px-10">
                  <h2 className="text-md font-semibold text-gray-800">
                    {book.name}
                  </h2>
                  <h3 className="text-md text-gray-600 mt-1">{book.author}</h3>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[30px] text-[#cb0e4e]">${book.price}</p>
                  </div>
                </div>

                <div className="absolute px-6 lg:px-9 bottom-2 w-full bg-white text-white opacity-0  group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-[30px] text-[#cb0e4e]">${book.price}</p>
                  <h1
                    className="text-lg text-gray-900 cursor-pointer"
                    onClick={() => handleNavigate(book.id)}
                  >
                    {book.name}
                  </h1>
                  <p
                    className="text-md text-gray-700 cursor-pointer"
                    onClick={() => handleNavigate(book.id)}
                  >
                    {book.author}
                  </p>
                  <div className="flex flex-col items-center">
                    <AddBasket addToBasket={addToBasket} bookId={book.id} />
                    <button
                      className="mt-4 px-5 py-2 hover:bg-[#2699fb] text-blue-600 border border-[#2699fb] hover:text-white rounded-lg bg-white focus:outline-none transition duration-200 flex items-center"
                      onClick={() => {
                        handleDelete(book.id);
                      }}
                    >
                      Delete the Book
                    </button>

                    <button
                      onClick={() => navigate(`/edit-product/${book.id}`)}
                      className="mt-4 px-7 py-2 hover:bg-[#2699fb] text-blue-600 border
                  border-[#2699fb] hover:text-white rounded-lg bg-white
                  focus:outline-none transition duration-200 flex items-center"
                    >
                      Edit The Book
                    </button>
                    <button
                      onClick={() => navigate("/addNewBook")}
                      className="mt-4 px-6 py-2 hover:bg-[#2699fb] text-blue-600 border
                 border-[#2699fb] hover:text-white rounded-lg bg-white
                "
                    >
                      Add New Book
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
