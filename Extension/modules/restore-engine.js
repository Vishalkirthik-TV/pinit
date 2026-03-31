/**
 * restore-engine.js
 * Orchestrates the progressive scroll search to find and restore a pinned message.
 */

window.Pinit = window.Pinit || {};

Pinit.RestoreEngine = (() => {
  
  async function restore(pin) {
    console.log("Pinit: Restoring pin...", pin.textPreview);

    if (pin.isPagePin) {
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      window.scrollTo({
        top: pin.position.scrollPercent * scrollHeight,
        behavior: "smooth"
      });
      Pinit.UIInjector.showToast("Restored page position!");
      return true;
    }

    // 1. Immediate scan
    const visibleMessages = Pinit.MessageDetector.getAllVisibleMessages();
    const immediateMatch = Pinit.MatchingEngine.findBestMatch(pin, visibleMessages);

    if (immediateMatch) {
      finishRestore(immediateMatch.element);
      return true;
    }

    // 2. Start MutationObserver & Progressive Scroll
    return new Promise((resolve) => {
      let found = false;

      Pinit.MutationTracker.start(pin, (match) => {
        found = true;
        finishRestore(match.element);
        resolve(true);
      });

      performProgressiveScroll(() => found).then((scrolledToTop) => {
        if (!found) {
          Pinit.MutationTracker.stop();
          if (scrolledToTop) {
            console.log("Pinit: Reached top, pin not found.");
            Pinit.UIInjector.showToast("Message not found in this chat.", "error");
          }
          resolve(false);
        }
      });
    });
  }

  async function performProgressiveScroll(isFoundFn) {
    // Scroll upwards in steps to trigger virtualization loading
    const step = 800;
    const delay = 400;
    let totalScrolled = 0;

    while (!isFoundFn() && window.scrollY > 0) {
      window.scrollBy(0, -step);
      totalScrolled += step;
      await sleep(delay);

      // Safety break: if we've scrolled a massive amount without finding anything
      if (totalScrolled > 50000) break; 
    }

    return window.scrollY === 0;
  }

  function finishRestore(element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    Pinit.UIInjector.highlight(element);
    Pinit.UIInjector.showToast("Message found!");
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return {
    restore
  };
})();
