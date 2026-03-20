// Usage: node glazyr_status_loop.js --token <your_token>
// Version: 12.0 (VIZ5 - ENGINEERING LOG MODE)
import { resolveToken } from "./lib.js";

const token = resolveToken();
const INTERVAL = 20; // 50Hz Polling
const startupTime = Date.now();

function hexToRgb(hex) {
    if (!hex || hex.length < 7) return { r: 51, g: 255, b: 51 };
    const r = parseInt(hex.substring(1,3), 16);
    const g = parseInt(hex.substring(3,5), 16);
    const b = parseInt(hex.substring(5,7), 16);
    return { r, g, b };
}

let lastMetrics = {
    fps: "0.0",
    throughput: "0.0 MB/s",
    colorHex: "#33ff33",
    colorBlock: "\x1b[48;2;51;255;51m      \x1b[0m",
    latency: "0",
    lastServerTime: 0,
    consecutiveStops: 0,
    hasSeenPulse: false,
    collisionActive: 0,
    isDone: false,
    totalBytes: 0,
    totalMB: "0.0000"
};

const REDIS_URL = "https://big-oyster-39155.upstash.io/get/glazyr:viz:latest_telemetry?_token=AZjzAAIncDE2YzlkYWRjNzI5YjQ0NDFkOWY0ZTRkNDc0NGE0YWUxMHAxMzkxNTU";

const run = async () => {
    try {
        const start = Date.now();
        const res = await fetch(REDIS_URL);
        const latency = Date.now() - start;

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        let rawText = await res.text();
        lastMetrics.totalBytes += Buffer.byteLength(rawText, 'utf8');
        lastMetrics.totalMB = (lastMetrics.totalBytes / (1024 * 1024)).toFixed(4);

        const data = JSON.parse(rawText);
        const rawJson = data.result; 
        
        if (rawJson) {
            let tel;
            try { tel = JSON.parse(rawJson); } catch (e) { setTimeout(run, INTERVAL); return; }
            
            const serverTime = tel.server_time || 0;
            const currentFps = parseFloat(tel.fps || "0.0");
            const status = tel.status || "ACTIVE";
            
            if (currentFps > 0) lastMetrics.hasSeenPulse = true;

            // 1. SMART EXIT
            if (lastMetrics.hasSeenPulse && (status === "DONE" || status === "FLUSH")) {
                process.stdout.write('\x1b[2J\x1b[H');
                console.log(`\n\n\x1b[32;1m      GLAZYR VIZ: PERCEPTION > PIXELS\x1b[0m\n\n`);
                lastMetrics.isDone = true;
                setTimeout(() => process.exit(0), 1500);
                return;
            }

            const isFresh = serverTime > lastMetrics.lastServerTime;
            
            if (isFresh) {
                lastMetrics.lastServerTime = serverTime;
                lastMetrics.fps = currentFps.toFixed(1);
                lastMetrics.throughput = tel.shm_throughput || "0.0 MB/s";
                lastMetrics.consecutiveStops = 0;
            } else {
                lastMetrics.consecutiveStops++;
            }

            // 2. GHOST SHIELD (20s)
            const timeSinceStartup = (Date.now() - startupTime) / 1000;
            if (!lastMetrics.isDone && timeSinceStartup > 30 && lastMetrics.consecutiveStops > 500) { 
                process.exit(0);
            }

            lastMetrics.latency = latency.toString();
            
            // 3. COLLISION FEEDBACK (White Flash)
            if (status === "COLLISION") lastMetrics.collisionActive = 10;
            if (lastMetrics.collisionActive > 0) lastMetrics.collisionActive--;

            if (tel.pixel_sample) {
                lastMetrics.colorHex = tel.pixel_sample;
                const rgb = (lastMetrics.collisionActive > 0) ? {r:255, g:255, b:255} : hexToRgb(tel.pixel_sample);
                const label = (lastMetrics.collisionActive > 0) ? "ACTION" : "LOG   ";
                lastMetrics.colorBlock = 
                    `  \x1b[48;2;${rgb.r};${rgb.g};${rgb.b}m                  \x1b[0m\n` +
                    `  \x1b[48;2;${rgb.r};${rgb.g};${rgb.b}m                  \x1b[0m\n` +
                    `  \x1b[48;2;${rgb.r};${rgb.g};${rgb.b}m      VISION      \x1b[0m\n` +
                    `  \x1b[48;2;${rgb.r};${rgb.g};${rgb.b}m      ${label}       \x1b[0m\n` +
                    `  \x1b[48;2;${rgb.r};${rgb.g};${rgb.b}m                  \x1b[0m\n` +
                    `  \x1b[48;2;${rgb.r};${rgb.g};${rgb.b}m                  \x1b[0m`;
            }
        }

        if (lastMetrics.isDone) return;

        process.stdout.write('\x1b[2J\x1b[H'); 
        console.log(`\x1b[32;1m[METHOD] GLAZYR SHM (ZERO-COPY DMA)\x1b[0m`);
        console.log(`\x1b[90m--------------------------------------------------\x1b[0m`);
        console.log(`\x1b[32;1m[ENGINE PULSE]   ${lastMetrics.fps} FPS\x1b[0m`);
        console.log(`\x1b[32;1m[VISION LATENCY] ${lastMetrics.latency} ms\x1b[0m`);
        console.log(`\x1b[32;1m[CLOUD SYNC]     0.2 KB/s\x1b[0m  \x1b[90m(The "Savings")\x1b[0m`);
        console.log(`\x1b[90m--------------------------------------------------\x1b[0m`);
        
        // THE GAS PUMP (Massive Green Counter)
        console.log(`\n\x1b[32;1;5m  TOTAL BANDWIDTH CONSUMED:\x1b[0m`);
        console.log(`\x1b[32;1m  +----------------------------------+\x1b[0m`);
        console.log(`\x1b[32;1m  |   ${lastMetrics.totalMB.padStart(10)} MB RACKED UP   |\x1b[0m`);
        console.log(`\x1b[32;1m  +----------------------------------+\x1b[0m`);
        
        console.log(`\x1b[90m--------------------------------------------------\x1b[0m`);
        if (lastMetrics.collisionActive > 0) {
            console.log(`\x1b[37;1;5m!!! PERCEPTUAL ACTION: RED SHARK DETECTED !!!\x1b[0m`);
        } else {
            console.log(`\x1b[32;1mLIVE OPTIC NERVE PULSE:\x1b[0m`);
        }
        console.log(lastMetrics.colorBlock);
        console.log(`\x1b[30;42;1m HANDSHAKE: ${lastMetrics.colorHex} \x1b[0m`);
        
        console.log(`\n\x1b[32;1m[STATUS] PULSE ACTIVE (50Hz) - glazyr.com\x1b[0m`);

    } catch (e) {
        process.stdout.write('\x1b[2J\x1b[H');
        console.log(`\x1b[32;1m[BIG_IRON_NODE] GLAZYR VIZ (ZERO-COPY DMA)\x1b[0m`);
        console.log(`\x1b[90m[STATUS] RECOVERING LINK...\x1b[0m`);
    }
    setTimeout(run, INTERVAL);
};

run();
