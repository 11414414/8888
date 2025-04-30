import { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // adjust path if different

export default function FeaturedProductsIsland() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${import.meta.env.PUBLIC_MEDUSA_BACKEND_URL}/store/products?limit=4`, {
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": import.meta.env.PUBLIC_MEDUSA_TOKEN,
          },
        });
  
        const data = await response.json();
  
        if (!response.ok || !data.products) {
          throw new Error(data.message || "Failed to load products");
        }
  
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
  
    loadProducts();
  }, []);
  

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}


console.log("Medusa backend:", import.meta.env.PUBLIC_MEDUSA_BACKEND_URL);
console.log("Medusa token:", import.meta.env.PUBLIC_MEDUSA_TOKEN);