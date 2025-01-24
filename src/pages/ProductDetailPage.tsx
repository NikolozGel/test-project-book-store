import { useNavigate, useParams } from "react-router-dom";

interface IProducts {
  bookData: IBook[];
  basket: IBook[];
  handleQuantityChange: (bookId: number, increase: boolean) => void;
  setQuantity: React.Dispatch<React.SetStateAction<number | string>>;
  addToBasket: (id: number, increase: boolean) => void;
  handleDelete: (id: number) => Promise<void>;
}

export default function ProductDetailPage({
  bookData,
  basket,
  handleQuantityChange,
  setQuantity,
  addToBasket,
  handleDelete,
}: IProducts) {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const book = bookData?.find((book) => String(book.id) === bookId);

  if (!book) {
    return (
      <p className="text-red-500 text-xl py-20 text-center">Book not found!</p>
    );
  }

  const calculateTotal = (bookId: number) => {
    return basket
      .filter((item) => item.id === bookId)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const bookQuantity =
    basket.find((item) => item.id === book?.id)?.quantity || 1;

  return (
    <div className="md:flex md:justify-start md:relative lg:pl-36 mt-5">
      <img src={book?.image} alt="bookImg" className="w-[400px]" />
      <div className="px-11">
        <h1 className="text-2xl text-[#707070]">{book?.name}</h1>
        <h3 className="text-lg text-[#707070] mt-1">
          <span className="text-[#2699fb] text-2xl">{book?.author}</span>
          {" (Author) "}

          <p className="text-lg text-[#707070]">Category: {book?.category}</p>
        </h3>

        <p className="text-lg text-[#707070]">
          Description: {book?.description}
        </p>

        <div className="flex items-center mt-5">
          <p className="text-lg font-bold mr-4">
            Total:{" "}
            <span className="text-[#cb0e4e]">
              {calculateTotal(book.id).toFixed(2)}
            </span>{" "}
            GEL
          </p>
        </div>

        <div className="md:absolute md:bottom-5">
          <div className="flex items-center gap-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleQuantityChange(book.id, true);
              }}
            >
              <div className="flex items-center border-gray border-[1px] p-5 rounded-lg">
                <label
                  htmlFor="number"
                  className="text-[#707070] text-[17px] mr-3"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  max={10}
                  min={1}
                  defaultValue={bookQuantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="p-2 w-16  rounded mr-5  border-[#2699fb] border-[1px]"
                />
                <p className="text-[#cb0e4e] text-[20px]"> {book.price} GEL</p>
              </div>

              <button
                type="submit"
                onClick={() => addToBasket(book.id, true)}
                className="mt-4 px-4 py-2 hover:bg-[#2699fb] text-blue-600 border
                  border-[#2699fb] hover:text-white rounded-lg bg-white
                  focus:outline-none transition duration-200 flex items-center"
              >
                Add To Basket
              </button>

              <button
                className="mt-4 px-3 py-2 hover:bg-[#2699fb] text-blue-600 border border-[#2699fb] hover:text-white rounded-lg bg-white focus:outline-none transition duration-200 flex items-center"
                onClick={() => {
                  handleDelete(book.id);
                  navigate("/");
                }}
              >
                Delete the Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
