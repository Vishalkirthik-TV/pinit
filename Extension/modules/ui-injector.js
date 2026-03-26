/**
 * ui-injector.js
 * Handles UI overlays, pin buttons, and toast notifications.
 */

window.Pinit = window.Pinit || {};

Pinit.UIInjector = (() => {
  let activePinButton = null;

  function init() {
    console.log("Pinit: Initializing UIInjector...");
    document.addEventListener("mouseover", handleMouseOver);
    console.log("Pinit: Mouseover listener added.");
  }

  function handleMouseOver(e) {
    const config = Pinit.MessageDetector.getActiveConfig();
    const messageEl = e.target.closest(config.messageSelector);

    if (messageEl) {
      // Avoid re-injecting if we're hovering inside the same message but not on the messageEl itself
      if (activePinButton && activePinButton.parentElement === messageEl) return;
      
      console.log("Pinit: Detected message element under mouse", messageEl);
      showPinButton(messageEl);
    } else {
        // If we moved out of a message, remove the button after a delay
        // (Optional: can leave it for better UX but let's be clean)
        // Only remove if we're not hovering the button itself
        if (e.target.closest(".pinit-delegate-btn")) return;
        // removePinButton(); // Actually, it's better to keep it until another message is hovered
    }
  }

  function showPinButton(element) {
    if (activePinButton && activePinButton.parentElement === element) return;
    removePinButton();

    const btn = document.createElement("button");
    btn.className = "pinit-delegate-btn";
    btn.innerText = "📌";
    btn.title = "Pin this message";
    
    // Position it at top-right of the message element
    btn.style.position = "absolute";
    btn.style.top = "8px";
    btn.style.right = "8px";
    btn.style.zIndex = "2147483647"; // Max z-index to stay on top

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Pinit: Pin button clicked for", element);
      const pin = Pinit.Fingerprint.capture(element);
      if (pin) {
        chrome.runtime.sendMessage({ action: "savePin", pin: pin }, (response) => {
            console.log("Pinit: Pin saved response", response);
            showToast("Message Pinned!");
        });
      }
    });

    // Ensure the message element is relative for absolute positioning of the button
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.position === "static") {
      element.style.position = "relative";
    }
    
    element.appendChild(btn);
    activePinButton = btn;
    console.log("Pinit: Pin button injected.");
  }

  function removePinButton() {
    if (activePinButton) {
      activePinButton.remove();
      activePinButton = null;
    }
  }

  function highlight(element) {
    element.classList.add("pinit-highlight-pulse");
    setTimeout(() => {
      element.classList.remove("pinit-highlight-pulse");
    }, 5000);
  }

  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `pinit-toast pinit-toast-${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("pinit-toast-show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("pinit-toast-show");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  return {
    init,
    highlight,
    showToast
  };
})();
