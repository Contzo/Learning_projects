import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
function Header() {
  return (
    <div>
      <header className="bg-yellow-500">
        <Link to="/">Fast React Pizza Co.</Link>
        <SearchOrder />
        <p>Laur Claur</p>
      </header>
    </div>
  );
}

export default Header;
