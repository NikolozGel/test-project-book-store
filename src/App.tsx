import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EditProductPage from "./pages/EditProductPage";
import BasketPage from "./pages/BasketPage";
import Product from "./pages/Product";
import ProductDetailPage from "./pages/ProductDetailPage";
import AddNewBook from "./components/AddNewBook";
import BookAddedAlert from "./components/alerts/BookAddedAlert";

function App() {
  // ეს სტეიტი არის წიგნების მონაცემების შენახვისთვის
  const [bookData, setBookData] = useState<TBooks>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // ეს სტეიტი გამოიყენება Conditional-render-თვის თუ სწრაფი ფილტრის შედეგები არ არის
  const [noResults, setNoResults] = useState<boolean>(() => {
    const storedResults = localStorage.getItem("noResults");
    return storedResults ? JSON.parse(storedResults) : false;
  });
  // ეს სტეიტი გამოიყენება კალათაში არსებული რაოდენობის ინპუტის შეცვლისთვის
  const [quantity, setQuantity] = useState<number | string>("");

  // ეს სტეიტი გამოვიყენე ფასის ფილტრის შეცვლისთვის და აქ იმიტომ გავაკეთე რომ
  // პროპსად გადავცე header-ს, რომ logo-ზე დაკლიკებისას დაუბრუნდეს საწყის Value-ს
  const [minValue, setMinValue] = useState(() => {
    const minVal = localStorage.getItem("minValue");
    return minVal ? parseInt(minVal) : 0;
  });
  const [maxValue, setMaxValue] = useState(() => {
    const maxVal = localStorage.getItem("maxValue");
    return maxVal ? parseInt(maxVal) : 200;
  });

  useEffect(() => {
    localStorage.setItem("minValue", minValue.toString());
    localStorage.setItem("maxValue", maxValue.toString());
  }, [minValue, maxValue]);

  // ეს სტეიტი არის Error Handling-თვის თუ რაიმე შეცდომა მოხდება რექუესთის დროს
  const [error, setError] = useState<string>("");
  // ეს სტეიტი გამოიყენება წარმატებით დასრულებული ქმედებისთვის შეტყობინების გამოსაჩენად
  const [alert, setAlert] = useState({ visible: true, message: "" });
  // რეფრეშის დროს კალათაში არსებული მონაცემების შენახვის ლოგიკა localStorage-ის გამოყენებით
  const [basket, setBasket] = useState<TBooks>(() => {
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  });
  // რეფრეშის დროს გაფილტრული მონაცემების შენახვის ლოგიკა localStorage-ის გამოყენებით
  const [filteredBooks, setFilteredBooks] = useState(() => {
    const savedFilteredBooks = localStorage.getItem("filteredBooks");
    return savedFilteredBooks ? JSON.parse(savedFilteredBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem("filteredBooks", JSON.stringify(filteredBooks));
    localStorage.setItem("basket", JSON.stringify(basket));
    localStorage.setItem("noResults", JSON.stringify(noResults));
  }, [filteredBooks, basket, noResults]);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/books");
        if (response.status === 200) {
          setBookData(response.data);
        } else {
          throw new Error("Error fetching the books");
        }
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // რაოდენობის შეცვლის ლოგიკა კალათაში
  const handleQuantityChange = (bookId: number) => {
    const newQuantity = Number(quantity);

    if (!isNaN(newQuantity) && newQuantity > 0) {
      setBasket((prevBasket) => {
        let quantityChanged = false;

        const updatedBasket = prevBasket.map((bookItem) => {
          if (bookItem.id === bookId && bookItem.quantity !== newQuantity) {
            quantityChanged = true;
            return { ...bookItem, quantity: newQuantity };
          }
          return bookItem;
        });

        if (quantityChanged) {
          setAlert({ visible: true, message: "Book added successfully!" });
          setTimeout(() => setAlert({ visible: false, message: "" }), 3500);
        }

        return updatedBasket;
      });
    }
  };
  // წიგნის კალათაში დამატების ლოგიკა
  const addToBasket = (id: number, increase: boolean) => {
    setBasket((prevBasket) => {
      // ვამოწმებ არსებობს თუ არა წიგნი კალათაში
      const book = prevBasket.find((item) => item.id === id);

      // თუ კალათაში არის წიგნი და გაზრდის რაოდენობა ვაბრუნებ იგივე მნიშვნელობას
      if (book && increase) {
        return prevBasket;
      }
      // თუ წიგნი არ არის კალათაში მაშინ ვამატებ ახალ წიგნს კალათაში და რაოდენობას ვზრდი 1-ით
      if (!book) {
        const foundBook = bookData.find((item) => item.id === id);
        if (!foundBook) return prevBasket;
        setAlert({ visible: true, message: "Book Added successfully!" });
        setTimeout(() => setAlert({ visible: false, message: "" }), 3500);
        return [...prevBasket, { ...foundBook, quantity: 1 }];
      }

      // სხვა შემთხვევაში რაოდენობას ვზრდი 1-ით ან ვამცირებ 1-ით
      const updatedQuantity = increase ? book.quantity + 1 : book.quantity - 1;
      // თუ რაოდენობა 0-ზე ნაკლებია წიგნს ვშლით კალათიდან
      if (updatedQuantity <= 0) {
        return prevBasket.filter((item) => item.id !== id);
      }
      // აქ საბოლოოდ განახლდება წიგნის რაოდენობა კალათაში
      return prevBasket.map((item) =>
        item.id === id ? { ...item, quantity: updatedQuantity } : item
      );
    });
  };
  // წიგნის წაშლის ლოგიკა
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/books/${id}`);
      if (response.status === 200) {
        setBookData((prevBooks) => prevBooks.filter((book) => book.id !== id));
        setFilteredBooks((prevBooks: TBooks) =>
          prevBooks.filter((book) => book.id !== id)
        );

        setAlert({ visible: true, message: "Book Deleted successfully!" });
        setTimeout(() => setAlert({ visible: false, message: "" }), 3500);
      } else {
        throw new Error("Error deleting the book");
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };
  // წიგნის წაშლის ლოგიკა კალათიდან
  const removeFromBasket = (id: number) => {
    setBasket((prevBasket) => prevBasket.filter((book) => book.id !== id));
  };
  // ეს ფუნქცია გამოიყენება კალათიდან წიგნის რაოდენობის შეცვლისთვის UI-ზე
  const getTotalQuantity = () => {
    return basket.reduce((total, book) => total + book.quantity, 0);
  };

  return (
    <>
      {alert.visible && (
        <BookAddedAlert message={alert.message} setAlert={setAlert} />
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                filteredBooks={filteredBooks}
                setFilteredBooks={setFilteredBooks}
                bookData={bookData}
                getTotalQuantity={getTotalQuantity()}
                error={error}
                setNoResults={setNoResults}
                noResults={noResults}
                minValue={minValue}
                setMinValue={setMinValue}
                maxValue={maxValue}
                setMaxValue={setMaxValue}
                isLoading={isLoading}
              />
            }
          >
            <Route
              index
              path="/:filterType?/:value?"
              element={
                <Home addToBasket={addToBasket} handleDelete={handleDelete} />
              }
            />

            <Route
              path="/page/:pageId"
              element={
                <Product
                  addToBasket={addToBasket}
                  handleDelete={handleDelete}
                />
              }
            />
            <Route
              path="/book/:bookId"
              element={
                <ProductDetailPage
                  bookData={bookData}
                  basket={basket}
                  handleQuantityChange={handleQuantityChange}
                  setQuantity={setQuantity}
                  addToBasket={addToBasket}
                />
              }
            />

            <Route
              path="/edit-product/:editBookId"
              element={
                <EditProductPage
                  setBookData={setBookData}
                  setAlert={setAlert}
                  bookData={bookData}
                  setFilteredBooks={setFilteredBooks}
                />
              }
            />
            <Route
              path="/addNewBook"
              element={
                <AddNewBook
                  bookData={bookData}
                  setBookData={setBookData}
                  setAlert={setAlert}
                />
              }
            />
            <Route
              path="/product/basket"
              element={
                <BasketPage
                  basket={basket}
                  removeFromBasket={removeFromBasket}
                  handleQuantityChange={handleQuantityChange}
                  setQuantity={setQuantity}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
