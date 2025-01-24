import { useEffect, useRef, useState } from "react";
import BasketIcon from "./BasketIcon";
import { useNavigate } from "react-router-dom";

const FilterOptions = ({
  basketCount,
  bookData,
  setFilteredBooks,
  setCurrentPage,
}: {
  basketCount: number;
  bookData: TBooks;
  setFilteredBooks: React.Dispatch<React.SetStateAction<TBooks>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const stickyRef = useRef<HTMLDivElement>(null); // Sticky ელემენტის რეფერენსი
  const [isSticky, setIsSticky] = useState(false); // Sticky მდგომარეობა
  const navigate = useNavigate();

  // ფილტრის ლოგიკა
  const handleFilterClick = (filterType: string, value: string) => {
    const normalize = (str: string) => str.toLowerCase();
    const normalizedValue = normalize(value);

    const updatedFilteredBooks = bookData.filter((book) => {
      const normalizedFields = [
        normalize(book.author),
        normalize(book.description),
        normalize(book.name),
        ...book.category.split(",").map((cat) => normalize(cat.trim())),
      ];

      return filterType === "Category"
        ? normalizedFields.includes(normalizedValue)
        : normalizedFields.some((field) => field.includes(normalizedValue));
    });

    setFilteredBooks(updatedFilteredBooks);
    setCurrentPage(1);
    navigate(`/${filterType.toLowerCase()}/${value.toLowerCase()}`);
  };

  const items = [
    {
      title: "Fiction",
      values: [
        "Mini Vintages",
        "Romance",
        "Harry Potter",
        "Sherlock Holmes",
        "Vintage Classics",
        "Science Fiction",
        "Classics",
        "Horror",
      ],
    },
    {
      title: "Non-Fiction",
      values: [
        "History",
        "Health & Lifestyle",
        "Computing & Internet",
        "Good stories are ahead",
        "Book Trust",
        "Little Black Classics",
        "Philosophy",
        "Language & Reference",
      ],
    },
    {
      title: "Other Publishers",
      values: [
        "Pearson Education",
        "Cerebellum Press",
        "Bloomsbury Publishing PLC",
        "Garnet Publishing Ltd",
        "International Curricula",
        "CGP Books",
        "Scholastic",
        "John Wiley & Sons Inc",
      ],
    },
    {
      title: "Children's",
      values: ["Teenage", "5-8", "9-12", "Baby & Toddler"],
    },
  ];

  // ამას ვიყენებ Basket Icon-თვის როდესაც სტიკი მდგომარეობაშია
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(
          entry.boundingClientRect.top <= 0 && entry.intersectionRatio < 1
        );
      },
      { threshold: [1] }
    );

    const currentStickyRef = stickyRef.current;
    if (currentStickyRef) {
      observer.observe(currentStickyRef);
    }

    return () => {
      if (currentStickyRef) {
        observer.unobserve(currentStickyRef);
      }
    };
  }, []);

  return (
    <div ref={stickyRef} className="sticky -top-1 z-10">
      <div className="relative bg-gray-100">
        <nav>
          <ul className="flex justify-evenly sm:justify-around">
            {items.map((item, index) => (
              <div className="group py-3" key={index}>
                <h1 className="hover:text-blue-500 py-2 text-gray-800 cursor-pointer">
                  {item.title}
                </h1>

                <ul
                  className={`bg-white hidden group-hover:block filter-dropdown shadow-lg p-4 absolute top-full left-0 w-full cursor-pointer`}
                >
                  {item.values.map((value, valueIndex) => (
                    <li
                      key={valueIndex}
                      className="text-gray-600 mb-1 hover:text-blue-500 px-10 md:px-16"
                      onClick={() => {
                        handleFilterClick(item.title, value);
                      }}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* BasketIcon გამოჩნდება მხოლოდ sticky მდგომარეობაში */}
            {isSticky && (
              <div className="flex items-center">
                <BasketIcon basketCount={basketCount} />
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default FilterOptions;
