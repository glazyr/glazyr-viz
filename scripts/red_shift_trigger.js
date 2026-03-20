// Usage: node red_shift_trigger.js
// Forces a "Red-Shift" in the aquarium to prove real-time perception.
import http from 'http';
import WebSocket from 'ws';

(async () => {
    console.log("[FIRE] INJECTING RED-SHIFT PERCEPTION TEST...");
    
    const script = `
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '0';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.backgroundColor = 'red';
        div.style.zIndex = '999999';
        div.style.transition = 'opacity 1s';
        div.style.opacity = '1';
        document.body.appendChild(div);
        
        setTimeout(() => {
            div.style.opacity = '0';
            setTimeout(() => div.remove(), 1000);
        }, 2000);
    `;

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
        ws.send(JSON.stringify({
            id: 1,
            method: "Runtime.evaluate",
            params: { expression: script }
        }));

        await new Promise(resolve => setTimeout(resolve, 500));
        ws.close();
        
        console.log("[SUCCESS] DARK RED OVERLAY INJECTED. TERMINAL SHOULD SNAP TO RED.");
    } catch (e) {
        console.error("[ERROR] RED-SHIFT TRIGGER FAILED:", e.message);
    }
})();
