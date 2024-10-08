import { formatCurrency } from "../../utilities/helpers";
import DeleteItem from "./DeleteItem";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-7">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <DeleteItem pizzaId={pizzaId} />
    </li>
  );
}

export default CartItem;
