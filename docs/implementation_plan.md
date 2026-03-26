# Pinit Chrome Extension — Content-Based Message Pinning

Build a production-ready Chrome extension that pins messages in AI chat apps (ChatGPT, Claude, Grok) and reliably re-finds them later using content-based matching — overcoming virtualized DOM challenges.

## Audit Summary

The existing extension is a **basic scroll-position saver** (saves `window.scrollY`). It has:
- ✅ Manifest V3 structure, content script, background service worker, popup, settings page
- ❌ No message detection or DOM analysis
- ❌ No content-based fingerprinting
- ❌ No MutationObserver
- ❌ No similarity matching engine
- ❌ No progressive scroll search / restore system
- ❌ No site-specific heuristics for ChatGPT/Claude/Grok

**Conclusion:** Near-complete rewrite needed. Keep the Manifest V3 shell and `chrome.storage` pattern; replace all logic.

## User Review Required

> [!IMPORTANT]
> This is a **complete rewrite** of all JS logic. The existing scroll-position-based system will be fully replaced with the content-based approach. The [pin.png](file:///c:/Users/vkirt/Desktop/Pinit/Extension/pin.png) icon will be kept.

> [!WARNING]
> Site-specific selectors (ChatGPT, Claude, Grok) are based on current DOM structures and may break if those apps update their markup. The matching engine mitigates this by being content-first, with selectors as hints only.

## Proposed Changes

### Core Extension Structure

New file layout:

```
Extension/
├── manifest.json          ← Updated permissions + host patterns
├── background.js          ← Rewritten: storage orchestration
├── content.js             ← Rewritten: main orchestrator
├── modules/
│   ├── message-detector.js  ← [NEW] Site-specific message detection
│   ├── fingerprint.js       ← [NEW] Content fingerprinting
│   ├── matching-engine.js   ← [NEW] Similo-inspired similarity scoring
│   ├── mutation-tracker.js  ← [NEW] MutationObserver system
│   ├── restore-engine.js    ← [NEW] Progressive scroll search + restore
│   └── ui-injector.js       ← [NEW] Pin button injection + highlight
├── popup.html             ← Redesigned: list of pinned messages
├── popup.js               ← Rewritten: pin list with restore actions
├── popup.css              ← [NEW] Premium popup styling
├── styles.css             ← Rewritten: pin buttons + highlight animations
├── pin.png                ← Keep existing
└── settings.html/js       ← [DELETE] (merged into popup)
```

---

### Module: Message Detector

#### [NEW] [message-detector.js](file:///c:/Users/vkirt/Desktop/Pinit/Extension/modules/message-detector.js)

- Detects which AI chat platform the user is on (ChatGPT, Claude, Grok) via URL patterns
- Returns site-specific config: message container selector, individual message selector, role detection
- Fallback generic detector using heuristics: `article`, `div[class*="message"]`, `div[data-message]`
- Exports `getAllVisibleMessages()` returning `{element, text, role, index}[]`

---

### Module: Content Fingerprint

#### [NEW] [fingerprint.js](file:///c:/Users/vkirt/Desktop/Pinit/Extension/modules/fingerprint.js)

Captures a rich fingerprint when user pins a message:

```js
{
  id: crypto.randomUUID(),
  url: location.href,
  platform: "chatgpt" | "claude" | "grok" | "unknown",
  text: messageText,               // Full text content
  textPreview: first100Chars,       // For popup display
  textHash: hashFnv32a(text),       // Fast integer hash for quick filtering
  keywords: extractKeywords(text),  // Top 5 distinctive words
  contextBefore: prevMessageText,   // Previous sibling message
  contextAfter: nextMessageText,    // Next sibling message
  structure: { tag, classList, role },
  position: { scrollPercent, approxIndex },
  timestamp: Date.now(),
  label: ""                         // Optional user label
}
```

---

### Module: Matching Engine (Similo-Inspired)

#### [NEW] [matching-engine.js](file:///c:/Users/vkirt/Desktop/Pinit/Extension/modules/matching-engine.js)

Implements weighted multi-attribute similarity scoring (inspired by research paper's Similo approach):

```
score = 0.50 * textSimilarity(pin, candidate)
       + 0.20 * contextSimilarity(pin, candidate)
       + 0.20 * structureSimilarity(pin, candidate)
       + 0.10 * positionSimilarity(pin, candidate)
```

**Text similarity:** Exact match → 1.0, contains → 0.8, Levenshtein-based ratio for partial → 0.0–0.7
**Context similarity:** Compare `contextBefore` / `contextAfter` with neighbor messages
**Structure similarity:** Tag match + class overlap ratio  
**Position similarity:** 1.0 - abs(pinScrollPercent - currentScrollPercent)

Match threshold: **0.40** (per VON Similo research, optimal for high accuracy)

---

### Module: MutationObserver Tracker

#### [NEW] [mutation-tracker.js](file:///c:/Users/vkirt/Desktop/Pinit/Extension/modules/mutation-tracker.js)

- Observes `document.body` for `childList` + `subtree` mutations
- For each added node, checks if it's a message element (via message-detector)
- Runs quick keyword filter first (`node.innerText.includes(keyword)`) for early exit
- If keyword matches, runs full matching engine
- On match found: triggers callback, disconnects observer
- Timeout safety: auto-disconnect after 30 seconds

---

### Module: Restore Engine

#### [NEW] [restore-engine.js](file:///c:/Users/vkirt/Desktop/Pinit/Extension/modules/restore-engine.js)

When user clicks a pinned message in popup:

1. **Immediate scan:** Check all currently visible messages for match
2. **If found:** `scrollIntoView({ block: "center" })` + highlight animation
3. **If not found:** Start progressive scroll search:
   - Activate MutationObserver
   - Scroll upward in steps of 600px with 300ms delays
   - On each pause, scan newly loaded messages
   - Stop when: match found, top of page reached, or 30s timeout
4. On success: highlight the matched message with a pulsing glow

---

### Content Script

#### [MODIFY] [content.js](file:///c:/Users/vkirt/Desktop/Pinit/Extension/content.js)

Complete rewrite. Becomes the orchestrator:
- Imports all modules
- Listens for messages from popup (`pin-message`, `restore-pin`, `get-visible-messages`)
- On `pin-message`: uses fingerprint module to capture, sends to background for storage
- On `restore-pin`: uses restore engine to find and highlight
- Injects context-menu-style "📌 Pin" button near hovered messages via ui-injector

---

### Background Script

#### [MODIFY] [background.js](file:///c:/Users/vkirt/Desktop/Pinit/Extension/background.js)

Complete rewrite:
- Handles `savePinData`, `getPins`, [removePin](file:///c:/Users/vkirt/Desktop/Pinit/Extension/settings.js#79-86), `updatePinLabel` messages
- Storage key: `pinit_pins_{hostname}` → array of pin fingerprint objects
- Badge text: shows pin count on extension icon

---

### UI: Pin Button Injection

#### [NEW] [ui-injector.js](file:///c:/Users/vkirt/Desktop/Pinit/Extension/modules/ui-injector.js)

- On mouseover of message elements: show a floating "📌" button at the top-right corner
- On click: capture fingerprint, save pin, show confirmation toast
- Highlight styles: pulsing border glow for found messages
- Toast notification for pin saved / pin restored / not found

---

### Popup Redesign

#### [MODIFY] [popup.html](file:///c:/Users/vkirt/Desktop/Pinit/Extension/popup.html)

Redesigned as pin management hub:
- Header with Pinit branding
- List of pinned messages for current domain (text preview + timestamp)
- Click a pin → sends `restore-pin` to content script → auto-finds message
- Delete button per pin
- Empty state with helpful message
- Dark/light theme matching

#### [MODIFY] [popup.js](file:///c:/Users/vkirt/Desktop/Pinit/Extension/popup.js)

Complete rewrite to handle pin list rendering and restore actions.

#### [NEW] [popup.css](file:///c:/Users/vkirt/Desktop/Pinit/Extension/popup.css)

Premium styling: glassmorphism, gradients, smooth transitions, dark mode.

---

### Styles

#### [MODIFY] [styles.css](file:///c:/Users/vkirt/Desktop/Pinit/Extension/styles.css)

Rewritten with:
- Pin button hover overlay styles
- Highlight pulse animation for found messages
- Toast notification styles
- Dark mode support

---

### Manifest

#### [MODIFY] [manifest.json](file:///c:/Users/vkirt/Desktop/Pinit/Extension/manifest.json)

- Add `host_permissions` for ChatGPT, Claude, Grok URLs
- Change `content_scripts.matches` to target specific AI chat URLs
- Remove [settings.html](file:///c:/Users/vkirt/Desktop/Pinit/Extension/settings.html) options page
- Keep permissions: `storage`, `activeTab`, `scripting`

---

### Deletions

#### [DELETE] [settings.html](file:///c:/Users/vkirt/Desktop/Pinit/Extension/settings.html)
#### [DELETE] [settings.js](file:///c:/Users/vkirt/Desktop/Pinit/Extension/settings.js)

Settings merged into popup. No longer needed.

---

## Verification Plan

### Manual Testing (User)

Since this is a Chrome extension that must be tested on live sites, all verification is manual:

1. **Load Extension:**
   - Open `chrome://extensions` → Enable Developer mode → Load unpacked → select `Extension/` folder
   - Verify extension loads without errors in the console

2. **Test on ChatGPT (`chatgpt.com`):**
   - Open a long conversation (50+ messages)
   - Hover over a message → verify "📌" pin button appears
   - Click pin → verify toast confirmation
   - Open popup → verify pin appears with text preview
   - Scroll away (or reload page)
   - Click pin in popup → verify it scrolls to and highlights the correct message
   - Delete pin from popup → verify it's removed

3. **Test on Claude (`claude.ai`):**
   - Repeat the same steps as ChatGPT

4. **Test on Grok (`grok.com` or `x.com/i/grok`):**
   - Repeat the same steps as ChatGPT

5. **Edge Cases:**
   - Test with 500+ messages (virtualized content)
   - Test after page reload (pin should still restore)
   - Test with multiple pins on same page
   - Test that pins from one domain don't appear on another

> [!NOTE]
> I'll inspect each AI chat site's DOM structure during implementation to calibrate the selectors. The matching engine's content-first approach ensures resilience even if selectors become stale.
