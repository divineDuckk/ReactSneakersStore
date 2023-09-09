import { Link } from "react-router-dom";
import AppContext from "../context/context";
import React from "react";
function Header(props) {
  return (
    <header className="header">
      <Link to="/">
        <div className="header-name">
          <img width={40} height={40} src="img/logo.svg" />
          <div className="nameOfSite">
            <h2>REACT SNEAKERS</h2>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="menu">
        <li>
          <button onClick={props.onCartClick}>
            <img src="img/cart.svg"></img>
          </button>
          <span>{props.price} руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <button onClick={props.onClickFav}>
              <img src="img/favorite.svg"></img>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <button>
              <img src="img/user.svg"></img>
            </button>
          </Link>
        </li>
      </ul>
    </header>
  );
}
export default Header;
