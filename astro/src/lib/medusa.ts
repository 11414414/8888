import Medusa from "@medusajs/js-sdk";

export const medusa = new Medusa({
  baseUrl: import.meta.env.PUBLIC_MEDUSA_BACKEND_URL,
  apiKey: import.meta.env.PUBLIC_MEDUSA_TOKEN,
});
