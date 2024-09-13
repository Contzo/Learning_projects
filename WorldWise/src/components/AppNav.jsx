import style from "./AppNav.module.css";
import { NavLink } from "react-router-dom";
function AppNav() {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <NavLink to="cities">cites</NavLink>
        </li>
        <li>
          <NavLink to="countries">countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
