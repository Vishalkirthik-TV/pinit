# 📌 Pinit — Smart Message Pinning for AI Chat Apps

**Pinit** is a professional Chrome extension designed to solve the frustration of losing important messages in long, virtualized AI chat conversations. Whether you're using ChatGPT, Claude, or Grok, Pinit allows you to bookmark any message and jump back to it instantly—even if the message has been unmounted from the DOM.

![Pinit Icon](Extension/pin.png)

## 🚀 The Challenge: Virtualized Lists
Modern AI chat apps use **virtualization** to maintain performance. This means:
*   Only the currently visible messages exist in the DOM.
*   Older messages are removed (unmounted) as you scroll away.
*   Traditional browser bookmarks or static HTML IDs fail to find these messages later.

## 💡 The Pinit Solution: Content-Based Re-identification
Pinit doesn't rely on fragile DOM selectors or unreliable scroll positions. Instead, it uses a **Similo-inspired matching engine** to fingerprint messages based on:
1.  **Content**: The actual text and meaning of the message.
2.  **Context**: The surrounding neighbor messages.
3.  **Structure**: The DOM tags, roles, and classes.
4.  **Position**: Approximate relative scroll depth.

### Key Features
*   **Intelligent Restore**: Automatically scrolls and triggers the chat app's virtualization to "re-find" your pinned message.
*   **Mutation Tracking**: Uses `MutationObserver` to watch for newly loaded messages during the restoration process.
*   **Multi-Platform**: Deeply integrated with **ChatGPT**, **Claude (claude.ai)**, and **Grok**.
*   **Premium UI**: Glassmorphism design, pulsing highlights, and smooth toast notifications.

---

## 🛠️ Installation

1.  **Clone/Download** this repository.
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Enable **Developer mode** (toggle in the top-right corner).
4.  Click **Load unpacked**.
5.  Select the `Extension/` folder from this project.

---

## 📖 How to Use

### 1. Pinning a Message
Simply hover over any message in ChatGPT, Claude, or Grok. A 📌 button will appear in the top-right corner of the message block. Click it to save the pin.

### 2. Viewing Pins
Click the Pinit icon in your browser's extension toolbar to see a list of all pins for the current website.

### 3. Restoring a Pin
Click on any pin in the extension window. Pinit will:
*   Identify if the message is already visible.
*   If not, it will initiate a **Progressive Scroll Search**, scrolling upwards and scanning newly loaded content until a match is found.
*   Once found, the message will be scrolled into view and highlighted with a pulsing blue glow.

---

## 🧠 Technical Architecture

Built with a modular Manifest V3 architecture:
*   **[message-detector.js](Extension/modules/message-detector.js)**: Site-specific heuristics for AI platforms.
*   **[fingerprint.js](Extension/modules/fingerprint.js)**: Advanced multi-attribute fingerprinting.
*   **[matching-engine.js](Extension/modules/matching-engine.js)**: Weighted similarity scoring (threshold-based).
*   **[mutation-tracker.js](Extension/modules/mutation-tracker.js)**: Real-time monitoring of DOM updates.
*   **[restore-engine.js](Extension/modules/restore-engine.js)**: Progressive scroll search orchestrator.
*   **[ui-injector.js](Extension/modules/ui-injector.js)**: Floating overlays and notification system.

---

## 📝 License
MIT License. Built for advanced agentic coding demonstration.
