
// Usage: node navigate.js <url> [--token <key>]
import { callGlazyr, resolveToken } from "./lib.js";

const url = process.argv.filter(a => !a.startsWith("--"))[2];
if (!url) { console.error("Usage: node navigate.js <url> [--token <key>]"); process.exit(1); }

const token = resolveToken();

try {
    const result = await callGlazyr("navigate", { url }, token);
    console.log(JSON.stringify(result, null, 2));
} catch (e) {
    console.error("[GLAZYR] Navigation Error:", e.message);
    process.exit(1);
}
