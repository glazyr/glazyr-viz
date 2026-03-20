
// Usage: node interact.js --action click --x 500 --y 300 [--token <key>]
//        node interact.js --action type --text "hello world" [--token <key>]
//        node interact.js --action key --key Enter [--token <key>]
import { callGlazyr, resolveToken } from "./lib.js";

function getArg(name) {
    const idx = process.argv.indexOf(`--${name}`);
    return idx !== -1 ? process.argv[idx + 1] : undefined;
}

const action = getArg("action");
if (!action) {
    console.error("Usage: node interact.js --action <click|type|key> [--x N] [--y N] [--text STR] [--key KEY] [--token KEY]");
    process.exit(1);
}

const token = resolveToken();

try {
    let result;
    switch (action) {
        case "click":
            result = await callGlazyr("click", {
                x: parseFloat(getArg("x") || "0"),
                y: parseFloat(getArg("y") || "0")
            }, token);
            break;
        case "type":
            result = await callGlazyr("type", { text: getArg("text") || "" }, token);
            break;
        case "key":
            result = await callGlazyr("key", { key: getArg("key") || "Enter" }, token);
            break;
        default:
            console.error(`Unknown action: ${action}. Use click, type, or key.`);
            process.exit(1);
    }
    console.log(JSON.stringify(result, null, 2));
} catch (e) {
    console.error("[GLAZYR] Interaction Error:", e.message);
    process.exit(1);
}
