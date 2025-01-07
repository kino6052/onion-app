import { router } from "./router.js";
import { serve } from "bun";

import "./notes.js";
import "./ontology.js";

router.on("OPTIONS", "/*", async (req) => {
  const res = new Response("", { status: 200 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.headers.set("Access-Control-Max-Age", "86400"); // Cache preflight response for 24 hours
  return res;
});

export const start = () => {
  try {
    serve({
      fetch: async (req) => {
        const response = await router.handle(req);
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, OPTIONS"
        );
        response.headers.set(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization"
        );
        return response;
      },
      port: 3000,
    });

    console.log("Server running on http://localhost:3000");
  } catch (e) {
    console.error(e);
    start();
  }
};
