import { useParams } from "react-router-dom";

interface IProducts {
  bookData: IBook[];
  basket: IBook[];
  handleQuantityChange: (bookId: number, increase: boolean) => void;
  setQuantity: React.Dispatch<React.SetStateAction<number | string>>;
  addToBasket: (id: number, increase: boolean) => void;
}

export default function ProductDetailPage({
  bookData,
  basket,
  handleQuantityChange,
  setQuantity,
  addToBasket,
}: IProducts) {
  const { bookId } = useParams();

  const book = bookData?.find((book) => String(book.id) === bookId);

  // ეს ფუნქცია ანგარიშობს თითოეული წიგნის ჯამურ რაოდენობას
  const calculateTotal = (bookId: number) => {
    return basket
      .filter((item) => item.id === bookId)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const bookQuantity =
    basket.find((item) => item.id === book?.id)?.quantity || 1;

  return (
    <>
      {!book ? (
        <h1 className="text-red-500 text-center text-xl my-16">
          book not found or deleted
        </h1>
      ) : (
        <div className="md:flex  lg:pl-36 mt-5 gap-4">
          <img src={book?.image} alt="bookImg" className="w-[400px]" />
          <div className="p-7">
            <h1 className="text-2xl text-[#707070]">{book?.name}</h1>
            <h3 className="text-lg text-[#707070]">
              <span className="text-[#2699fb] text-[18px]">{book?.author}</span>
              {" (Author) "}

              <p className="text-lg text-[#707070]">
                Category: {book?.category}
              </p>
            </h3>

            <p className="text-lg text-[#707070]">
              Description: {book?.description}
            </p>

            <div className="flex items-center my-10">
              <p className="font-bold">
                Total:{" "}
                <span className="text-[#cb0e4e]">
                  {calculateTotal(book.id).toFixed(2)}
                </span>{" "}
                GEL
              </p>
            </div>

            <div className=" md:bottom-5">
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
                    <p className="text-[#cb0e4e] text-[20px]">
                      {" "}
                      {book.price} GEL
                    </p>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
