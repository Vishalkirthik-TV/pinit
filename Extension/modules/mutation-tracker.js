/**
 * mutation-tracker.js
 * Observes DOM mutations to catch newly loaded messages in virtualized lists.
 */

window.Pinit = window.Pinit || {};

Pinit.MutationTracker = (() => {
  let observer = null;
  let onMatchCallback = null;
  let targetPin = null;

  function start(pin, onMatch) {
    if (observer) stop();

    targetPin = pin;
    onMatchCallback = onMatch;

    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              checkNode(node);
            }
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    // Auto-stop after 30 seconds to prevent performance leak
    setTimeout(() => {
      stop();
    }, 30000);
  }

  function stop() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function checkNode(node) {
    // Quick filter: only check if node might be a message
    const config = Pinit.MessageDetector.getActiveConfig();
    const isMessage = node.matches(config.messageSelector) || node.querySelector(config.messageSelector);
    
    if (!isMessage) return;

    // Use a lightweight check first (text contains keywords)
    const text = node.innerText;
    if (!text) return;

    // Perform full match
    const candidate = {
        element: node,
        text: text,
        structure: {
            tag: node.tagName.toLowerCase(),
            classList: Array.from(node.classList)
        },
        position: {
            scrollPercent: window.scrollY / document.documentElement.scrollHeight
        }
    };

    const match = Pinit.MatchingEngine.findBestMatch(targetPin, [candidate]);
    if (match) {
      stop();
      if (onMatchCallback) onMatchCallback(match);
    }
  }

  return {
    start,
    stop
  };
})();
