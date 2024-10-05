import { Link } from "react-router-dom";
function CartOverview() {
  return (
    <div className="text-stone-bg-pink-200 bg-stone-800 p-4 uppercase">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart"> Open cart</Link>
    </div>
  );
}

export default CartOverview;
