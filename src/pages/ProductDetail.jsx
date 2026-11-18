import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectProductById, selectProductsStatus } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "../features/wishlist/wishlistSlice";
import formatPrice from "../utils/formatPrice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => selectProductById(state, id));
  const status = useSelector(selectProductsStatus);
  const wishlisted = useSelector((state) => selectIsWishlisted(state, Number(id)));

  if (status !== "succeeded") return <p className="status">Loading...</p>;
  if (!product) return <p className="status">Product not found. <Link to="/">Back to shop</Link></p>;

  const buyNow = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <section className="detail">
      <button className="link-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-grid">
        <div className="detail-image">{product.emoji}</div>
        <div>
          <span className="category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="rating">★ {product.rating} / 5</p>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="description">{product.description}</p>
          <p className={product.stock < 10 ? "stock low" : "stock"}>
            {product.stock < 10 ? `Only ${product.stock} left!` : "In stock"}
          </p>
          <div className="actions">
            <button className="btn" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            <button className="btn btn-dark" onClick={buyNow}>Buy Now</button>
            <button className="btn btn-outline" onClick={() => dispatch(toggleWishlist(product))}>
              {wishlisted ? "♥ Wishlisted" : "♡ Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
