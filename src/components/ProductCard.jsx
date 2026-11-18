import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "../features/wishlist/wishlistSlice";
import formatPrice from "../utils/formatPrice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlisted = useSelector((state) => selectIsWishlisted(state, product.id));

  return (
    <div className="card">
      <button
        className={wishlisted ? "wish active" : "wish"}
        onClick={() => dispatch(toggleWishlist(product))}
        aria-label="Toggle wishlist"
      >
        {wishlisted ? "♥" : "♡"}
      </button>
      <Link to={`/product/${product.id}`} className="card-image">{product.emoji}</Link>
      <div className="card-body">
        <span className="category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="card-title">{product.title}</Link>
        <span className="rating">★ {product.rating}</span>
        <div className="card-footer">
          <span className="price">{formatPrice(product.price)}</span>
          <button className="btn" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
