/**
 * ui-injector.js
 * Handles UI overlays, pin buttons, and toast notifications.
 */

window.Pinit = window.Pinit || {};

Pinit.UIInjector = (() => {
  let activePinButton = null;

  function init() {
    console.log("Pinit: Initializing UIInjector (using capture-phase for robust events)...");
    document.addEventListener("mouseover", handleMouseOver, true);
  }
  function handleMouseOver(e) {
    const config = Pinit.MessageDetector.getActiveConfig();
    const messageEl = e.target.closest(config.messageSelector);

    if (messageEl) {
      if (activePinButton && activePinButton.parentElement === messageEl) return;
      console.log(`Pinit: Found message element on ${config.name}`, messageEl);
      showPinButton(messageEl);
    }
  }

  function showPinButton(element) {
    if (activePinButton && activePinButton.parentElement === element) return;
    removePinButton();

    const btn = document.createElement("button");
    btn.className = "pinit-delegate-btn";
    btn.title = "Pin this message";
    
    // Icon is set via CSS mask or internal img to allow better styling
    const iconImg = document.createElement("img");
    iconImg.src = chrome.runtime.getURL("pinit-icon-clear.png");
    iconImg.style.width = "20px";
    iconImg.style.height = "20px";
    iconImg.style.pointerEvents = "none";
    btn.appendChild(iconImg);

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const pin = Pinit.Fingerprint.capture(element);
      if (pin) {
        chrome.runtime.sendMessage({ action: "savePin", pin: pin }, (response) => {
            showToast("Message Pinned!");
        });
      }
    });

    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.position === "static") {
      element.style.position = "relative";
    }
    
    element.appendChild(btn);
    activePinButton = btn;
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
    
    const iconImg = document.createElement("img");
    iconImg.src = chrome.runtime.getURL("pinit-icon-clear.png");
    iconImg.className = "pinit-toast-icon";
    toast.appendChild(iconImg);
    
    const textNode = document.createTextNode(message);
    toast.appendChild(textNode);
    
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
