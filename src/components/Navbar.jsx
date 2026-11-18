import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { selectCartCount } from "../features/cart/cartSlice";
import { selectWishlist } from "../features/wishlist/wishlistSlice";

export default function Navbar() {
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlist).length;

  return (
    <header className="navbar">
      <Link to="/" className="logo">🛒 ReduxShop</Link>
      <nav>
        <NavLink to="/" end>Shop</NavLink>
        <NavLink to="/wishlist">♡<span className="nav-label"> Wishlist</span> <span className="badge">{wishlistCount}</span></NavLink>
        <NavLink to="/cart">Cart <span className="badge">{cartCount}</span></NavLink>
      </nav>
    </header>
  );
}
