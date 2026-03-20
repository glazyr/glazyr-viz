// Usage: node surge.js [--token <key>]
import { callGlazyr, resolveToken } from "./lib.js";

const token = resolveToken();

try {
    console.log("[GLAZYR] Attempting DOGFOOD SURGE to prime the engine...");
    const result = await callGlazyr("run_dogfood_surge", {}, token);
    console.log(JSON.stringify(result, null, 2));
} catch (e) {
    console.error("[GLAZYR] Surge Error:", e.message);
    process.exit(1);
}
