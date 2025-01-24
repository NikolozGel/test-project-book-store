import basketImg from "../assets/shopping-cart.png";

interface IProducts {
  bookId: number;
  addToBasket: (book: number, increase: boolean) => void;
}

export default function AddBasket({ bookId, addToBasket }: IProducts) {
  return (
    <div className="flex justify-center">
      <div key={bookId}>
        <button
          className="mt-4 px-4 py-2 hover:bg-[#2699fb] text-blue-600 border border-[#2699fb] hover:text-white rounded-lg bg-white focus:outline-none transition duration-200 flex items-center"
          onClick={() => addToBasket(bookId, true)}
        >
          <img src={basketImg} alt="basketImg" className="w-4 mr-2" />
          Add to Basket
        </button>
      </div>
    </div>
  );
}
