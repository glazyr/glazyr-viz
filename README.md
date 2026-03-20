# Glazyr Viz: High-Performance Vision for Agents 🛸

Ditch the screenshot dial-up. **Glazyr Viz** is a high-throughput, low-latency visual cortex for the OpenClaw ecosystem. By bypassing heavy image serialization and pulling directly from the Chromium frame buffer, we provide agents with **Zero-Copy Vision** for real-time perception.

### Why This Exists
Standard agents are slow and expensive. They capture full-page screenshots, encode them to Base64, and send them to LLMs — consuming thousands of tokens per step. **Glazyr Viz** reduces this overhead by **99%**, delivering structured UI metadata and visual deltas in milliseconds.

### ⚡ Performance-First Architecture
- **7.35ms Latency:** Sub-10ms perception floor via the `vision.json` schema.
- **99% Token Savings:** 12-16 tokens per frame vs. the standard 1,200+.
- **Zero-Jitter:** Synchronous frame access directly from the Chromium Viz subsystem.
- **Cloud-Isolated:** All heavy rendering happens on GCP "Big Iron" nodes (NVIDIA L4 GPUs).

### Installation
```bash
# Copy the skill to your OpenClaw skills directory
cp -r glazyr-viz ~/.openclaw/workspace/skills/glazyr-viz

# Install dependencies
cd ~/.openclaw/workspace/skills/glazyr-viz/scripts
npm install
```

### Quick Start
```bash
# Navigate to a page
node skills/glazyr-viz/scripts/navigate.js https://news.ycombinator.com

# Extract data (Ah-Ha Demo)
node skills/glazyr-viz/scripts/showcase.js
```

### Pricing (Launch Tiers)
| Tier | Frames | Price |
| :--- | :--- | :--- |
| **Free** | **5,000** | **$0** |
| **Developer** | 100,000 | $3 |
| **Professional** | 500,000 | $15 |

_Get your API key at [glazyr.com/dashboard](https://glazyr.com/dashboard)._

---
**Build fast. Stop serializing.**
_Built by MAGNETAR SENTIENT L.L.C. // V1.0.0 General Release_
