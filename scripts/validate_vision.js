// Usage: node validate_vision.js <url> [--token <key>]
import { callGlazyr, resolveToken } from "./lib.js";

const url = process.argv.filter(a => !a.startsWith("--"))[2];
if (!url) { console.error("Usage: node validate_vision.js <url> [--token <key>]"); process.exit(1); }

const token = resolveToken();

try {
    console.log(`[GLAZYR] Validating Vision Signal for ${url}...`);
    const result = await callGlazyr("shm_vision_validate", { url }, token);
    console.log(JSON.stringify(result, null, 2));
} catch (e) {
    console.error("[GLAZYR] Validation Error:", e.message);
    process.exit(1);
}
