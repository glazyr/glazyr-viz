# Glazyr Viz: High-Speed Vision SDK 🚀

Ditch the screenshot loop. **Glazyr Viz** is a high-performance Chromium fork that provides agents with **Zero-Copy Vision**—direct, raw memory access to the frame buffer for sub-10ms perception.

### 🎯 Real-World Use Cases
- **High-Density Data Extraction**: Navigating complex tables, Canvas-based charts, and WebGL interfaces where DOM scrapers fail.
- **Latency-Critical Automation**: Executing multi-step workflows (checkout bots, form filling) at human or super-human speeds.
- **Large-Scale Scraping**: Reducing API tokens by 99%, allowing for thousands of perception cycles at a fraction of the cost.
- **Anti-Bot Resilience**: Interacting with raw coordinates to bypass detection systems that flag standard WebDriver behavior.

### ⚡ Performance Floor
- **7.35ms Latency:** Sub-10ms frame-to-data conversion floor.
- **99% Token Savings:** 12-16 tokens per perception cycle via the `vision.json` schema.
- **Zero-Jitter:** Synchronous frame access directly from the Chromium Viz subsystem.

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
