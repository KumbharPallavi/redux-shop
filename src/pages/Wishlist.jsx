import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectWishlist } from "../features/wishlist/wishlistSlice";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const items = useSelector(selectWishlist);

  if (items.length === 0) {
    return (
      <div className="empty">
        <h2>Your wishlist is empty</h2>
        <Link to="/" className="btn">Browse Products</Link>
      </div>
    );
  }

  return (
    <section>
      <h2 className="page-title">My Wishlist ({items.length})</h2>
      <div className="grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
