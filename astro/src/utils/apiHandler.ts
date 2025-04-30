import type { APIRoute } from "astro";

export function withApiErrorHandler(routeHandler: APIRoute): APIRoute {
  return async (context) => {
    try {
      return await routeHandler(context);
    } catch (err: any) {
      console.error("[API ERROR]", err);

      return new Response(
        JSON.stringify({
          error: err?.message || "Unexpected server error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };
}