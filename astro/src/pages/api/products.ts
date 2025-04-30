// src/pages/api/products.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const backendUrl = import.meta.env.PUBLIC_MEDUSA_BACKEND_URL;
  const token = import.meta.env.PUBLIC_MEDUSA_TOKEN;

  try {
    const res = await fetch(`${backendUrl}/store/products?limit=4`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch products from Medusa");
    }

    return new Response(JSON.stringify(data.products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
      status: 500,
    });
  }
};
