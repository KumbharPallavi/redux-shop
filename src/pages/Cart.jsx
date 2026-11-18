import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  selectCartItems,
  selectCartTotals,
} from "../features/cart/cartSlice";
import formatPrice from "../utils/formatPrice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const { subtotal, shipping, tax, total } = useSelector(selectCartTotals);

  if (items.length === 0) {
    return (
      <div className="empty">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn">Start Shopping</Link>
      </div>
    );
  }

  return (
    <section className="cart-layout">
      <div>
        <div className="cart-head">
          <h2>Shopping Cart</h2>
          <button className="link-btn danger" onClick={() => dispatch(clearCart())}>Clear cart</button>
        </div>
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <span className="cart-emoji">{item.emoji}</span>
            <div className="cart-info">
              <Link to={`/product/${item.id}`}>{item.title}</Link>
              <span>{formatPrice(item.price)}</span>
            </div>
            <div className="qty">
              <button onClick={() => dispatch(decreaseQty(item.id))}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => dispatch(increaseQty(item.id))} disabled={item.qty >= item.stock}>+</button>
            </div>
            <span className="line-total">{formatPrice(item.price * item.qty)}</span>
            <button className="remove" onClick={() => dispatch(removeFromCart(item.id))} aria-label="Remove">✕</button>
          </div>
        ))}
      </div>

      <aside className="summary">
        <h3>Order Summary</h3>
        <div className="row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <div className="row"><span>Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
        <div className="row"><span>GST (18%)</span><span>{formatPrice(tax)}</span></div>
        <div className="row total"><span>Total</span><span>{formatPrice(total)}</span></div>
        <Link to="/checkout" className="btn btn-block">Proceed to Checkout</Link>
      </aside>
    </section>
  );
}
