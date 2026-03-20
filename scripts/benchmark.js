
// Usage: node benchmark.js [--frames 50] [--token <key>]
import { callGlazyr, resolveToken } from "./lib.js";

function getArg(name, defaultVal) {
    const idx = process.argv.indexOf(`--${name}`);
    return idx !== -1 ? process.argv[idx + 1] : defaultVal;
}

const FRAMES = parseInt(getArg("frames", "50"));
const token = resolveToken();

console.log(`[GLAZYR] Starting ${FRAMES}-frame benchmark on mcp.glazyr.com...`);

const latencies = [];
const startTime = performance.now();

for (let i = 0; i < FRAMES; i++) {
    const frameStart = performance.now();
    try {
        await callGlazyr("peek_vision_buffer", { include_base64: false }, token);
        latencies.push(performance.now() - frameStart);
    } catch (e) {
        console.error(`[GLAZYR] Stream halted at frame ${i + 1}: ${e.message}`);
        break;
    }
}

const totalMs = performance.now() - startTime;
const totalSec = totalMs / 1000;
const fps = latencies.length / totalSec;

latencies.sort((a, b) => a - b);
const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
const p99 = latencies[Math.floor(latencies.length * 0.99)] || avg;

console.log(`\n=================================`);
console.log(`   GLAZYR VIZ BENCHMARK REPORT   `);
console.log(`=================================`);
console.log(`Frames Pulled:  ${latencies.length}`);
console.log(`Total Time:     ${totalSec.toFixed(3)}s`);
console.log(`Throughput:     ${fps.toFixed(2)} FPS`);
console.log(`Avg Latency:    ${avg.toFixed(2)} ms`);
console.log(`P99 Latency:    ${p99.toFixed(2)} ms`);
console.log(`=================================\n`);
