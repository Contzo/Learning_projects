import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function CartOverview() {
  const totalCartQuanity = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0),
  );
  return (
    <div className="text-stone-bg-pink-200 sm:pxy-6 flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart"> Open cart</Link>
    </div>
  );
}

export default CartOverview;
