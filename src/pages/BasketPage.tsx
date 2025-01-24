import { Link } from "react-router-dom";
import QuantityInput from "../components/QuantityInput";

export default function BasketPage({
  basket,
  removeFromBasket,
  handleQuantityChange,
  setQuantity,
}: {
  basket: TBooks;
  removeFromBasket: (id: number) => void;
  handleQuantityChange: (bookId: number) => void;
  addToBasket: (book: number, increase: boolean) => void;
  setQuantity: React.Dispatch<React.SetStateAction<number | string>>;
}) {
  const calculateTotal = () => {
    return basket.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const calculateEachBook = (bookId: number) => {
    return basket
      .filter((item) => item.id === bookId)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <div className="px-4 lg:px-36 py-24">
        {basket.length > 0 ? (
          <div className="space-y-4 ">
            {basket.map((book, index) => (
              <div
                key={index}
                className="p-1 sm:p-3 md:p-6 lg:p-9 xl:p-12 border rounded-md py-2"
              >
                <div className="hidden md:flex md:items-center md:justify-between mb-5">
                  <h2 className="w-[100px]">product</h2>
                  <h2>price</h2>
                  <h2>quantity</h2>
                </div>

                <div className="flex-row md:flex md:justify-between md:items-center">
                  <div className="flex sm:w-[300px]">
                    <img
                      src={book.image}
                      alt="BookImg"
                      className="w-[85px] mr-3"
                    />
                    <div>
                      <Link to={`/book/${book.id}`}>
                        <div className="group">
                          <p className="text-[14px] group-hover:text-[#cb0e4e]">
                            {book.name}
                          </p>
                          <p className="text-[14px] group-hover:text-[#cb0e4e]">
                            {book.author}
                          </p>
                        </div>
                      </Link>
                      <p>Quantity: {book.quantity}</p>
                    </div>
                  </div>

                  <p className="text-[14px] ml-2 mb-1 text-[#cb0e4e]">
                    {calculateEachBook(book.id).toFixed(2)} GEL
                  </p>
                  <div className="pl-2">
                    <div className="flex gap-5">
                      <div className="flex justify-center items-center">
                        <QuantityInput
                          book={book}
                          handleQuantityChange={handleQuantityChange}
                          setItems={setQuantity}
                        />
                      </div>
                      <div className="mx-auto">
                        <button
                          onClick={() => removeFromBasket(book.id)}
                          className="px-4 py-2 border border-gray-500  text-gray-500 hover:border-red-500 hover:text-red-500 rounded transition"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Your cart is empty. Keep shopping to find a Book
          </p>
        )}
      </div>
      <div className="flex justify-end mr-5">
        <p className="text-lg font-bold mr-4">
          Total:{" "}
          <span className="text-[#cb0e4e]">{calculateTotal().toFixed(2)}</span>{" "}
          GEL
        </p>
      </div>
    </>
  );
}
