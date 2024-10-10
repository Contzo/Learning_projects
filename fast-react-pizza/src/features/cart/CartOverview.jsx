import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPizzas, getTotalCartPrice } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartPizzas);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartQuantity) return null;
  return (
    <div className="text-stone-bg-pink-200 sm:pxy-6 flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalCartPrice}</span>
      </p>
      <Link className="text-stone-400" to="/cart">
        {" "}
        Open cart
      </Link>
    </div>
  );
}

export default CartOverview;
