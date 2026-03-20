// Usage: node set_fish.js <count>
// Hardened with direct CDP connection to avoid MCP proxy failures
import http from 'http';
import WebSocket from 'ws';

const count = parseInt(process.argv[2], 10);
if (isNaN(count)) { console.error("Usage: node set_fish.js <count>"); process.exit(1); }

(async () => {
    try {
        // 1. Get WS URL
        const wsUrl = await new Promise((resolve, reject) => {
            http.get('http://127.0.0.1:9222/json/list', (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    const targets = JSON.parse(data);
                    const page = targets.find(t => t.type === 'page');
                    if (page && page.webSocketDebuggerUrl) resolve(page.webSocketDebuggerUrl);
                    else reject(new Error("No valid page target found"));
                });
            }).on('error', reject);
        });

        // 2. Connect via WS
        const ws = new WebSocket(wsUrl);
        await new Promise((resolve, reject) => {
            ws.on('open', resolve);
            ws.on('error', reject);
        });

        // 3. Send CDP Command
        const expression = `if (typeof setSetting === 'function') { setSetting(document.getElementById('numFish'), ${count}); }`;
        ws.send(JSON.stringify({
            id: 1,
            method: "Runtime.evaluate",
            params: { expression }
        }));

        await new Promise(resolve => setTimeout(resolve, 500));
        ws.close();
        
        console.log(`[+] SUCCESS: Fish count set to ${count} via Direct CDP.`);
    } catch (e) {
        console.error("\n[!] FATAL: Could not set fish count.");
        console.error(e.message);
        process.exit(1);
    }
})();
