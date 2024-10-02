import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <header>
        <Link to="/">Fast React Pizza Co.</Link>
        <p>Laur Claur</p>
      </header>
    </div>
  );
}

export default Header;
