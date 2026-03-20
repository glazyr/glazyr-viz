
// Usage: node status.js [--token <key>]
import { callGlazyr, resolveToken } from "./lib.js";

const token = resolveToken();

try {
    const result = await callGlazyr("get_optic_nerve_status", {}, token);
    console.log(JSON.stringify(result, null, 2));
} catch (e) {
    console.error("[GLAZYR] Status Error:", e.message);
    process.exit(1);
}
