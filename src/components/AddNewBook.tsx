import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function AddNewBook({
  bookData,
  setBookData,
  setAlert,
}: {
  bookData: IBook[];
  setBookData: React.Dispatch<React.SetStateAction<IBook[]>>;
  setAlert: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      message: string;
    }>
  >;
}) {
  const { setCurrentPage, setFilteredBooks } = useOutletContext<{
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setFilteredBooks: React.Dispatch<React.SetStateAction<TBooks>>;
  }>();

  const [book, setBook] = useState<IBook>({
    id: Math.random(),
    name: "",
    description: "",
    author: "",
    category: "",
    price: Number(),
    image: "../src/assets/book-3.jpg",
    quantity: 0,
  });
  const [error, setError] = useState({
    name: "",
    description: "",
    author: "",
    category: "",
    price: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (book.name === "") {
      setError({
        ...error,
        name: "Name is Required",
      });
      return;
    }
    if (book.description.length < 5) {
      setError({
        ...error,
        description: "Description must be at least 5 characters",
      });
      return;
    }

    if (book.author === "") {
      setError({
        ...error,
        author: "Author is Required",
      });
      return;
    }

    if (book.category === "") {
      setError({
        ...error,
        category: "Category is Required",
      });
      return;
    }

    if (book.price <= 5) {
      setError({
        ...error,
        price: "price must be greater than 5",
      });
      return;
    }

    try {
      const newBook = {
        ...book,
        id: String(book.id),
      };

      const response = await axios.post(`http://localhost:3000/books`, newBook);
      if (response.status === 201) {
        setBookData([...bookData, book]);
        setBook({
          id: Math.random(),
          name: "",
          description: "",
          author: "",
          category: "",
          price: Number(),
          image: "../src/assets/book-3.jpg",
          quantity: 0,
        });
        setAlert({ visible: true, message: "Book added successfully!" });
        setTimeout(() => setAlert({ visible: false, message: "" }), 3000);

        setError({
          name: "",
          description: "",
          author: "",
          category: "",
          price: "",
        });

        setCurrentPage(1);
        navigate("/");
        setFilteredBooks([]);
      } else {
        throw new Error("Error adding the book");
      }
    } catch (error) {
      console.error("Error adding the book:", error);
    }
  };

  return (
    <>
      <div className="ml-10 flex justify-center lg:pl-30 mt-5">
        <form className="mt-10" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex items-center space-x-4">
              <label htmlFor="name" className="text-xl w-[100px]">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={book.name}
                onChange={handleChange}
                className="h-[40px] px-2 w-[250px] border border-gray-300 rounded-lg"
              />
              {error.name && <p className="text-red-500">{error.name}</p>}
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="description" className="text-xl w-[100px]">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={book.description}
                onChange={handleChange}
                className="h-[40px] px-2 w-[250px] border border-gray-300 rounded-lg"
              />
              {error.description && (
                <p className="text-red-500">{error.description}</p>
              )}{" "}
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="author" className="text-xl w-[100px]">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={book.author}
                onChange={handleChange}
                className="h-[40px] px-2 w-[250px] border border-gray-300 rounded-lg"
              />
              {error.author && <p className="text-red-500">{error.author}</p>}{" "}
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="category" className="text-xl w-[100px]">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={book.category}
                onChange={handleChange}
                className="h-[40px] px-2 w-[250px] border border-gray-300 rounded-lg"
              />
              {error.category && (
                <p className="text-red-500">{error.category}</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="price" className="text-xl w-[100px]">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={book.price}
                onChange={handleChange}
                className="h-[40px] px-2 w-[250px] border border-gray-300 rounded-lg"
              />
              {error.price && <p className="text-red-500">{error.price}</p>}
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <button
              type="submit"
              className="px-10 py-2 hover:bg-[#2699fb] text-blue-600 border
                  border-[#2699fb] hover:text-white rounded-lg bg-white
                  focus:outline-none transition duration-200 flex items-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
