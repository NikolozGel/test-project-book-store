import { Link } from "react-router-dom";
import basketImg from "../assets/shopping-cart.png";

interface BasketIconProps {
  basketCount: number;
}

const BasketIcon: React.FC<BasketIconProps> = ({ basketCount }) => {
  return (
    <Link to="/basket">
      <div className="relative  float-right md:float-none w-16">
        <img src={basketImg} className="w-10" alt="Basket" />

        {basketCount >= 0 && (
          <span className="absolute  top-0 left-5 text-white bg-[#cb0e4e] text-xs h-6 w-6 rounded-full flex items-center justify-center">
            {basketCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default BasketIcon;
