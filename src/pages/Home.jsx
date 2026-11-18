import { useSelector } from "react-redux";
import {
  selectFilteredProducts,
  selectProductsError,
  selectProductsStatus,
} from "../features/products/productsSlice";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const products = useSelector(selectFilteredProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  return (
    <section>
      <div className="hero">
        <h1>Shop smart, shop simple</h1>
        <p>Free shipping on orders above ₹999</p>
      </div>
      <Filters />
      {status === "loading" && <p className="status">Loading products...</p>}
      {status === "failed" && <p className="status error">{error}</p>}
      {status === "succeeded" && products.length === 0 && <p className="status">No products found.</p>}
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
