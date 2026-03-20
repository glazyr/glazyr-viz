#!/usr/bin/env bash
# Glazyr Viz Secure Browser - Onboarding Script
# This script sets up the Node.js dependencies for the Glazyr bridge scripts.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==================================="
echo "  Glazyr Secure Browser - Setup    "
echo "==================================="
echo ""

# Install Node.js dependencies
echo "[1/2] Installing dependencies..."
cd "$SCRIPT_DIR"
npm install --silent 2>/dev/null || npm install

echo ""
echo "[2/2] Verifying Glazyr token..."

if [ -z "$GLAZYR_TOKEN" ]; then
    echo ""
    echo "  WARNING: GLAZYR_TOKEN is not set."
    echo "  To use this skill, get your token at:"
    echo ""
    echo "    https://glazyr.com/dashboard"
    echo ""
    echo "  Then run:  export GLAZYR_TOKEN=\"<your token>\""
    echo ""
else
    echo "  GLAZYR_TOKEN is set. Testing connection..."
    node status.js --token "$GLAZYR_TOKEN" 2>/dev/null && echo "  Connection verified!" || echo "  Connection test failed. Check your token."
fi

echo ""
echo "==================================="
echo "  Setup Complete!                  "
echo "==================================="
echo ""
echo "  Try: node skills/glazyr-viz/scripts/navigate.js https://example.com"
echo ""
