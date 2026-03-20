import fetch from "node-fetch";
import fs from "fs";

const script = fs.readFileSync("update_bio.js", "utf8");
const payload = {
    jsonrpc: "2.0", id: 1,
    method: "tools/call",
    params: { name: "browser_evaluate_js", arguments: { script } }
};

const res = await fetch("https://mcp.glazyr.com/mcp/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
});

if (res.status === 204) {
    console.log("JS dispatched successfully.");
} else {
    console.log(await res.text());
}
