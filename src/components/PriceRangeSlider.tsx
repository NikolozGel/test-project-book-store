import React, { useEffect, useState } from "react";
import "./PriceRangeSliderStyles.css";
import { useNavigate } from "react-router-dom";

const PriceRangeSlider = ({
  bookData,
  setFilteredBooks,
}: {
  bookData: TBooks;
  setFilteredBooks: React.Dispatch<React.SetStateAction<TBooks>>;
}) => {
  // სტეითის შექმნა და ინიციალიზაცია მინიმალური და მაქსიმალრი მნიშვნელობა
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

  const navigate = useNavigate();

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0 && value <= maxValue) {
      setMinValue(value);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value <= 200 && value >= minValue) {
      setMaxValue(value);
    }
  };

  const handleMinRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value <= maxValue) {
      setMinValue(value);
    }
  };

  const handleMaxRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= minValue) {
      setMaxValue(value);
    }
  };

  const handleFilterClick = () => {
    const filteredBooks = bookData.filter(
      (book) => book.price >= minValue && book.price <= maxValue
    );
    setFilteredBooks(filteredBooks);
    navigate(`/price_from=${minValue}&price_to=${maxValue}`);
  };

  return (
    <div className="priceRangeSlider">
      <div className="wrapper">
        <div className="price-input">
          <div className="field">
            <span>From</span>
            <input
              type="number"
              className="input-min border border-gray-400"
              value={minValue}
              onChange={handleMinInputChange}
            />
          </div>
          <div className="separator">-</div>
          <div className="field">
            <span>To</span>
            <input
              type="number"
              className="input-max border border-gray-400"
              value={maxValue}
              onChange={handleMaxInputChange}
            />
          </div>
        </div>
        <div className="slider"></div>
        <div className="range-input">
          <input
            type="range"
            className="range-min"
            min={0}
            max={200}
            value={minValue}
            step={1}
            onChange={handleMinRangeChange}
          />
          <input
            type="range"
            className="range-max"
            min={0}
            max={200}
            value={maxValue}
            step={1}
            onChange={handleMaxRangeChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="filter-button bg-[#2699fb] hover:opacity-60 text-white px-4 py-2 rounded mt-4"
            onClick={handleFilterClick}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
