<p align="center">
  <img src="Extension/pinit-icon-clear.png" width="96" height="96" alt="Pinit Logo">
</p>

<h1 align="center">Pinit</h1>

<p align="center">
  <b>The Intelligent Message Pinning System for AI Chat Apps</b><br>
  <i>Never lose a critical insight in a 500-message conversation again.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Chrome-blue.svg?style=flat-square" alt="Platform: Chrome">
  <img src="https://img.shields.io/badge/Supports-ChatGPT%20|%20Claude%20|%20Grok-orange.svg?style=flat-square" alt="Supports: ChatGPT, Claude, Grok">
  <img src="https://img.shields.io/badge/Engine-Similo--Inspired-green.svg?style=flat-square" alt="Engine: Similo-Inspired">
</p>

---

## 🌟 Overview

**Pinit** is a premium browser extension engineered to solve a fundamental flaw in modern AI chat interfaces: **DOM Virtualization**. 

Popular chat apps like ChatGPT and Claude "unmount" older messages to save memory. This means traditional scroll-position saving or browser bookmarks fail the moment you refresh the page or scroll too far away. Pinit overcomes this using a sophisticated **Content-Based Re-identification System**.

## ✨ Key Features

-   **🎯 Smart Fingerprinting**: Captures the unique "DNA" of a message—not just its text, but its neighboring context, DOM structure, and relative depth.
-   **🔄 Progressive Auto-Restore**: When you click a pin, Pinit orchestrates a "seek and find" mission, automatically scrolling and triggering virtualization until the exact message is re-found.
-   **🛡️ Robust matching**: Based on the **VON Similo** research paper, our engine uses weighted similarity scoring (0.40 threshold) to re-identify messages even if the UI styling shifts.
-   **💎 Premium Experience**: Designed with a glassmorphism aesthetic, featuring pulsing visual highlights and sleek toast notifications.

## 🛠️ Installation

1.  **Download** or Clone this repository.
2.  In Chrome, navigate to `chrome://extensions`.
3.  Enable **Developer mode** in the top-right corner.
4.  Click **Load unpacked** and select the `Extension/` folder.
5.  Pin the **Pinit icon** to your browser toolbar for instant access.

## 📖 How it Works

### 1. The Pin
Hover over any message block in **ChatGPT**, **Claude**, or **Grok**. A custom branded Pinit button will appear in the top-right corner. One click secures the message's unique fingerprint.

### 2. The Library
Access your saved insights via the extension popup. Each pin shows a preview, timestamp, and site context.

### 3. The Restore
Click a pin to fly back to that exact moment in the conversation. If the message is currently unmounted from the DOM, Pinit initiates a **Progressive Scroll Search**—monitoring live DOM mutations until the target reappears and is highlighted for you.

## 🧠 Technical Architecture

Pinit is built on a modular V3 architecture for maximum performance and security:

| Module | Responsibility |
| :--- | :--- |
| **`message-detector.js`** | Site-specific heuristics for AI platforms. |
| **`fingerprint.js`** | Multi-attribute hashing and context capture. |
| **`matching-engine.js`** | Similo-inspired weighted similarity scoring. |
| **`mutation-tracker.js`** | `MutationObserver` logic for virtualized list tracking. |
| **`restore-engine.js`** | Progressive scroll and seeking algorithms. |
| **`ui-injector.js`** | Branded overlays and pulsing highlight system. |

---

<p align="center">
  Built for the future of Agentic AI interactions.
</p>
