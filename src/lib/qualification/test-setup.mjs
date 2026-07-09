/**
 * Test bootstrap for `pnpm test` (node --test, zero dependencies).
 *
 * Node's native type stripping runs the .ts sources directly, but two
 * gaps need a resolve hook:
 * 1. `import "server-only"` resolves via a Next.js bundler alias that
 *    plain Node does not know; stub it with an empty module.
 * 2. Project sources use extensionless relative imports ("./config"),
 *    which Node's ESM resolver rejects; retry with a ".ts" suffix.
 */
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "server-only") {
      return { url: "data:text/javascript,", shortCircuit: true };
    }
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (specifier.startsWith("./") || specifier.startsWith("../")) {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw error;
    }
  },
});
