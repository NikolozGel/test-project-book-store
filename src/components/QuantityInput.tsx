interface QuantityInputProps {
  handleQuantityChange: (bookId: number) => void;
  setQuantity: React.Dispatch<React.SetStateAction<number | string>>;
  book: IBook;
}

const QuantityInput = ({
  book,
  handleQuantityChange,
  setQuantity,
}: QuantityInputProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleQuantityChange(book.id);
      }}
    >
      <input
        type="number"
        max={10}
        defaultValue={book.quantity}
        min={1}
        onChange={(e) => setQuantity(e.target.value)}
        className="p-2 w-16  rounded mr-5  border-[#2699fb] border-[1px]"
      />
      <button
        type="submit"
        className="px-5 py-2 border-[1px] border-[#2699fb] text-[#2699fb] hover:bg-[#2699fb] hover:text-white rounded transition"
      >
        Add
      </button>
    </form>
  );
};

export default QuantityInput;
