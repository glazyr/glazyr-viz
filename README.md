# Glazyr Viz: Don't Waste Intelligence on Screenshots 🚀

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

## 📘 Technical FAQ: Zero-Copy Vision

#### **Q: How do you achieve 99% token savings?**
Most agents use "Pixel-Pushing"—they capture a screenshot, encode it to Base64, and send the entire image to an LLM. This consumes roughly **1,200–1,600 tokens** per frame. **Glazyr Viz** uses the `vision.json` schema to extract semantic UI metadata and raw coordinate vectors directly from the Chromium Viz subsystem’s frame buffer. This reduces the payload to **12–16 tokens** per perception cycle.

#### **Q: Is any "intelligence" lost by not sending a full screenshot?**
None. In fact, you gain precision. Standard vision models often "guess" coordinates from pixels, leading to click hallucinations. `vision.json` provides the **exact [x, y] coordinates** and semantic metadata (ARIA roles, labels, states) directly from the Chromium render tree. Your agent doesn't have to guess; it knows.

#### **Q: How does this eliminate "Jitter"?**
Traditional "screenshot" methods are asynchronous. Because Glazyr Viz is baked into the **Chromium source**, frame access is synchronous. The agent perceives the UI state at the exact moment the frame is committed to the GPU.
**Build fast. Stop serializing.**
_Built by MAGNETAR SENTIENT L.L.C. // V1.0.0 General Release_
