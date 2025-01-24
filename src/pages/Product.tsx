import { BookList } from "../components/BookList";

interface IProducts {
  addToBasket: (book: number, increase: boolean) => void;
  handleDelete: (id: number) => void;
}

export default function Product({ addToBasket, handleDelete }: IProducts) {
  return (
    <div className="bg-white  py-10">
      <div className="container mx-auto">
        <BookList addToBasket={addToBasket} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
