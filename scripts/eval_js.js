
// Usage: node eval_js.js <javascript code> [--token <key>]
import { callGlazyr, resolveToken } from "./lib.js";

const tokenIdx = process.argv.indexOf("--token");
const args = process.argv.slice(2).filter((_, i, arr) => {
    if (arr[i] === "--token" || (i > 0 && arr[i - 1] === "--token")) return false;
    return true;
});
const script = args.join(" ");
if (!script) { console.error("Usage: node eval_js.js <javascript code> [--token <key>]"); process.exit(1); }

const token = resolveToken();

try {
    const result = await callGlazyr("evaluate_js", { script }, token);
    console.log(JSON.stringify(result, null, 2));
} catch (e) {
    console.error("[GLAZYR] JS Eval Error:", e.message);
    process.exit(1);
}
