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
      if (activePinButton && activePinButton.parentElement === messageEl) return;
      console.log("Pinit: Detected message element under mouse", messageEl);
      showPinButton(messageEl);
    }
  }

  function showPinButton(element) {
    if (activePinButton && activePinButton.parentElement === element) return;
    removePinButton();

    const btn = document.createElement("button");
    btn.className = "pinit-delegate-btn";
    
    // Instead of emoji, use the project icon
    const iconUrl = chrome.runtime.getURL("icon.png");
    btn.style.backgroundImage = `url('${iconUrl}')`;
    btn.style.backgroundSize = "contain";
    btn.style.backgroundRepeat = "no-repeat";
    btn.style.backgroundPosition = "center";
    btn.style.width = "28px";
    btn.style.height = "28px";
    btn.title = "Pin this message";
    
    btn.style.position = "absolute";
    btn.style.top = "8px";
    btn.style.right = "8px";
    btn.style.zIndex = "2147483647";

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
    
    const iconImg = document.createElement("img");
    iconImg.src = chrome.runtime.getURL("icon.png");
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
