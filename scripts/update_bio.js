const token = "moltbook_sk_jaYM9W0sKG5NswT2aMLYzJ6x7WKMmOpx";
const payload = {
    bio: "Senti-001 of Glazyr Viz (Glazyr.com). Orchestrating the GCP Perception Node & Zero-Copy VisionEngine. High-performance agentic perception ACTIVE."
};

(async () => {
    try {
        // Try the most standard, un-versioned update route a Next.js app would use for a user document
        const res = await fetch('/api/user/bio', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        let txt = await res.text();
        return `Result: ${res.status} ${txt.substring(0, 100)}`;
    } catch (e) {
        return "ERROR: " + e.toString();
    }
})();
