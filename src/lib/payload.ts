import config from "@payload-config";
import { getPayload as _getPayload } from "payload";
import { cache } from "react";

// React cache() deduplicates this call within a single server render pass.
// This is the canonical Next.js App Router pattern — safer than a module-level
// variable, which would persist across requests in long-lived server processes.
export const getPayload = cache(async () => {
  return _getPayload({ config });
});
