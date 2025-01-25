import { Link } from "react-router-dom";
import basketImg from "../assets/shopping-cart.png";

const BasketIcon = ({ getTotalQuantity }: { getTotalQuantity: number }) => {
  return (
    <Link to="/product/basket">
      <div className="relative  float-right md:float-none w-16">
        <img src={basketImg} className="w-10" alt="Basket" />

        {getTotalQuantity >= 0 && (
          <span className="absolute  top-0 left-5 text-white bg-[#cb0e4e] text-xs h-6 w-6 rounded-full flex items-center justify-center">
            {getTotalQuantity}
          </span>
        )}
      </div>
    </Link>
  );
};

export default BasketIcon;
