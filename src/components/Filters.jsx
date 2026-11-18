import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  selectFilters,
  setCategory,
  setSearch,
  setSortBy,
} from "../features/products/productsSlice";

export default function Filters() {
  const dispatch = useDispatch();
  const { search, category, sortBy } = useSelector(selectFilters);
  const categories = useSelector(selectCategories);

  return (
    <div className="filters">
      <div className="filter-row">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      <div className="chips">
        {categories.map((c) => (
          <button
            key={c}
            className={category === c ? "chip active" : "chip"}
            onClick={() => dispatch(setCategory(c))}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
