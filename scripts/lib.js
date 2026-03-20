// Shared Glazyr Viz MCP Bridge Library
// Single source of truth for endpoint URL and auth injection.

const GLAZYR_ENDPOINT = "https://mcp.glazyr.com/mcp/messages";

/**
 * Resolves the Glazyr Bearer token from (in order of priority):
 * 1. Explicit function argument
 * 2. GLAZYR_TOKEN environment variable
 * 3. CLI --token flag
 */
export function resolveToken(explicit) {
    if (explicit) return explicit;
    if (process.env.GLAZYR_TOKEN) return process.env.GLAZYR_TOKEN;

    const tokenIdx = process.argv.indexOf("--token");
    if (tokenIdx !== -1 && process.argv[tokenIdx + 1]) {
        return process.argv[tokenIdx + 1];
    }

    console.error("[GLAZYR] ERROR: No Bearer token found.");
    console.error("  Set GLAZYR_TOKEN env var, pass --token <key>, or get one at https://glazyr.com/dashboard");
    process.exit(1);
}

/**
 * Calls a Glazyr Viz MCP tool with proper Authorization.
 * @param {string} toolName - MCP tool name (e.g., "browser_navigate")
 * @param {object} args - Tool arguments
 * @param {string} token - Bearer token
 * @returns {object} Parsed JSON-RPC response
 */
export async function callGlazyr(toolName, args, token) {
    const payload = {
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name: toolName, arguments: args }
    };

    const res = await fetch(GLAZYR_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if (res.status === 204) return { result: "Command dispatched (no content)." };
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Glazyr API ${res.status}: ${body}`);
    }
    return await res.json();
}
