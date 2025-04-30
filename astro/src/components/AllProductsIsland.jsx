import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function AllProductsIsland() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        let url = `${import.meta.env.PUBLIC_MEDUSA_BACKEND_URL}/store/products?limit=20`;

        if (category) {
          // WARNING: This will only work if your Medusa backend uses "collection_handle" properly.
          url += `&collection_handle=${category}`;
        }

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": import.meta.env.PUBLIC_MEDUSA_TOKEN,
          },
        });

        const result = await response.json();
        console.log("Fetched Products Result:", result);

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch products");
        }

        let loadedProducts = result.products || [];

        // Optional Sorting
        if (sort === "price-asc") {
          loadedProducts.sort((a, b) => {
            const aPrice = a?.variants?.[0]?.prices?.[0]?.amount || 0;
            const bPrice = b?.variants?.[0]?.prices?.[0]?.amount || 0;
            return aPrice - bPrice;
          });
        } else if (sort === "price-desc") {
          loadedProducts.sort((a, b) => {
            const aPrice = a?.variants?.[0]?.prices?.[0]?.amount || 0;
            const bPrice = b?.variants?.[0]?.prices?.[0]?.amount || 0;
            return bPrice - aPrice;
          });
        }

        setProducts(loadedProducts);
      } catch (err) {
        console.error("Failed to load products:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [category, sort]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!products.length) {
    return <p className="text-center text-gray-400">No products available.</p>;
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700"
        >
          <option value="">All Categories</option>
          <option value="hoodies">Hoodies</option>
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="accessories">Accessories</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 rounded-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
