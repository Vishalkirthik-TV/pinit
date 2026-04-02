/**
 * fingerprint.js
 * Captures a content-based fingerprint of a message element.
 */

window.Pinit = window.Pinit || {};

Pinit.Fingerprint = (() => {
  
  function capture(element) {
    if (!element) return null;

    const text = element.innerText.trim();
    if (!text) return null;

    // Get context (neighbors)
    const prev = element.previousElementSibling;
    const next = element.nextElementSibling;
    
    const contextBefore = prev ? prev.innerText.trim().substring(0, 200) : "";
    const contextAfter = next ? next.innerText.trim().substring(0, 200) : "";

    // Structural info
    const structure = {
      tag: element.tagName.toLowerCase(),
      classList: Array.from(element.classList),
      role: element.getAttribute("role") || element.getAttribute("data-role") || ""
    };

    // Position info
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const scrollPercent = window.scrollY / scrollHeight;

    // Generate a simple hash of the text for quick filtering
    const textHash = hashString(text);

    return {
      id: crypto.randomUUID(),
      url: window.location.href,
      platform: Pinit.MessageDetector.getActiveConfig().id,
      text: text,
      textPreview: text.substring(0, 150) + (text.length > 150 ? "..." : ""),
      textHash: textHash,
      contextBefore: contextBefore,
      contextAfter: contextAfter,
      structure: structure,
      position: {
        scrollPercent: scrollPercent,
        timestamp: Date.now()
      }
    };
  }

  function hashString(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  return {
    capture
  };
})();
