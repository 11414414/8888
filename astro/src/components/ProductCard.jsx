import { useCart } from "../contexts/CartContext"; // adjust path if needed

export default function ProductCard({ product }) {
  const { addToCart, loading } = useCart();

  const hasPrice = product?.variants?.[0]?.prices?.[0]?.amount !== undefined;
  const price = hasPrice ? product.variants[0].prices[0].amount / 100 : null;
  const currency = product?.variants?.[0]?.prices?.[0]?.currency_code?.toUpperCase() || "";
  const thumbnail = product.thumbnail || "/placeholder.png"; // fallback image
  const variantId = product?.variants?.[0]?.id;

  return (
    <div className="group flex flex-col bg-white dark:bg-black p-4 rounded-2xl shadow-md hover:shadow-xl transition-all">
      <a href={`/store/${product.handle}`} className="flex-1">
        <div className="overflow-hidden rounded-xl mb-4 bg-gray-100 dark:bg-gray-800">
          <img
            src={thumbnail}
            alt={product.title || "Product image"}
            className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2 group-hover:underline text-center">
          {product.title || "Untitled Product"}
        </h3>

        <p className="text-primary font-bold text-lg text-center">
          {hasPrice ? `${price.toFixed(2)} ${currency}` : "Price not available"}
        </p>
      </a>

      <button
        onClick={() => addToCart(variantId, 1)}
        disabled={!variantId || loading}
        className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}



