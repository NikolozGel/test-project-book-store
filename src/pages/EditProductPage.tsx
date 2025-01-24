import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export default function EditProductPage({
  bookData,
  setAlert,
  setFilteredBooks,
}: {
  bookData: IBook[];
  setAlert: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      message: string;
    }>
  >;
  setFilteredBooks: React.Dispatch<React.SetStateAction<TBooks>>;
}) {
  const { setCurrentPage } = useOutletContext<{
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }>();

  const { editBookId } = useParams();
  const book = bookData?.find((book) => String(book.id) === editBookId);
  const navigate = useNavigate();
  // Initialize `editBook` with the book data if it exists
  const [editBook, setEditBook] = useState<IBook | null>(book || null);

  // Sync the `editBook` state with `book` when `book` changes
  useEffect(() => {
    if (book) {
      setEditBook(book);
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editBook) {
      setEditBook({ ...editBook, [e.target.name]: e.target.value });
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBook) return;

    try {
      const response = await axios.put(
        `http://localhost:3000/books/${editBookId}`,
        editBook
      );
      if (response.status === 200) {
        const updatedBooks = bookData.map((book) =>
          book.id === editBook.id ? { ...book, ...editBook } : book
        );
        setFilteredBooks(updatedBooks);
        setCurrentPage(1);
        navigate("/");
        setAlert({ visible: true, message: "Book Edited successfully!" });
        setTimeout(() => setAlert({ visible: false, message: "" }), 3000);
      } else {
        throw new Error("Error updating the book");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:flex md:justify-start   lg:pl-36 mt-5">
      <img src={book?.image} alt="bookImg" className="w-[400px]" />
      <form className="mt-10" onSubmit={handleSaveEdit}>
        <div className="flex flex-col gap-5">
          <div className="flex items-center">
            <label htmlFor="name" className="text-xl w-[105px]">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="h-[40px]  px-2 w-[250px] border border-gray-300 rounded-lg"
              value={editBook?.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="description" className="text-xl w-[105px]">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={editBook?.description || ""}
              onChange={handleChange}
              className="h-[40px]  px-2 w-[250px] border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="author" className="text-xl w-[105px]">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={editBook?.author || ""}
              onChange={handleChange}
              className="h-[40px]  px-2 w-[250px] border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="category" className="text-xl w-[105px]">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={editBook?.category || ""}
              onChange={handleChange}
              className="h-[40px]  px-2 w-[250px] border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="price" className="text-xl w-[105px]">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={editBook?.price || ""}
              onChange={handleChange}
              className="h-[40px]  px-2 w-[250px] border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <button
            type="submit"
            className="px-10 py-2 hover:bg-[#2699fb] text-blue-600 border
                  border-[#2699fb] hover:text-white rounded-lg bg-white
                  focus:outline-none transition duration-200 flex items-center "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
