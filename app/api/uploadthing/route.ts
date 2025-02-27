import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

// Add this configuration
export const config = {
  // Corrected matcher pattern that starts with a slash
  matcher: ["/api/uploadthing"],
};
