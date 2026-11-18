import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, selectCartItems, selectCartTotals } from "../features/cart/cartSlice";
import formatPrice from "../utils/formatPrice";

const emptyForm = { name: "", email: "", phone: "", address: "", city: "", pincode: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email";
  if (!/^[6-9]\d{9}$/.test(form.phone)) errors.phone = "Enter a valid 10-digit mobile number";
  if (!form.address.trim()) errors.address = "Address is required";
  if (!form.city.trim()) errors.city = "City is required";
  if (!/^\d{6}$/.test(form.pincode)) errors.pincode = "Enter a valid 6-digit pincode";
  return errors;
}

export default function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const { total } = useSelector(selectCartTotals);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setOrderId("RS" + Date.now().toString().slice(-8));
    dispatch(clearCart());
  };

  if (orderId) {
    return (
      <div className="empty">
        <h2>🎉 Order placed successfully!</h2>
        <p>Thank you, {form.name}. Your order ID is <strong>{orderId}</strong>.</p>
        <Link to="/" className="btn">Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty">
        <h2>Nothing to check out</h2>
        <Link to="/" className="btn">Go to Shop</Link>
      </div>
    );
  }

  const field = (name, label, type = "text") => (
    <label className="field">
      {label}
      <input name={name} type={type} value={form[name]} onChange={handleChange} />
      {errors[name] && <span className="field-error">{errors[name]}</span>}
    </label>
  );

  return (
    <section className="checkout">
      <h2 className="page-title">Checkout</h2>
      <form onSubmit={handleSubmit} noValidate>
        {field("name", "Full Name")}
        {field("email", "Email", "email")}
        {field("phone", "Mobile Number", "tel")}
        {field("address", "Address")}
        <div className="two-col">
          {field("city", "City")}
          {field("pincode", "Pincode")}
        </div>
        <button type="submit" className="btn btn-block">Place Order · {formatPrice(total)}</button>
      </form>
    </section>
  );
}
