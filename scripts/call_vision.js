import fetch from "node-fetch";

async function main() {
    const toolName = process.argv[2];
    const args = JSON.parse(process.argv[3] || "{}");

    if (!toolName) {
        console.error("Usage: node call_vision.js <toolName> <argsJson>");
        process.exit(1);
    }

    const payload = {
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
            name: toolName,
            arguments: args
        }
    };

    try {
        const response = await fetch("https://mcp.glazyr.com/mcp/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Server returned ${response.status}: ${text}`);
        }

        if (response.status === 204) {
            console.log("Command dispatched (no response content).");
            return;
        }

        const result = await response.json();
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Stateless tool call failed:", error.message);
        process.exit(1);
    }
}

main();
