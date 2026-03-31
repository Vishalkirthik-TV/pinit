/**
 * content.js
 * Main entry point for the Pinit content script.
 */

console.log("Pinit: Extension active. Version 2.1");

try {
    // Initialize UI
    if (Pinit && Pinit.UIInjector) {
        Pinit.UIInjector.init();
        console.log("Pinit: UI System initialized.");
    } else {
        console.error("Pinit: UI System modules not found during init.");
    }

    // Check for pending restore on load
    chrome.storage.local.get(["pendingRestore"], (result) => {
        if (result.pendingRestore) {
            const pin = result.pendingRestore;
            const currentUrlWithoutHash = window.location.href.split('#')[0];
            const pinUrlWithoutHash = pin.url ? pin.url.split('#')[0] : "";
            
            // Clear it immediately to prevent loops
            chrome.storage.local.remove(["pendingRestore"]);

            // If it matches loosely, run restore
            if (currentUrlWithoutHash === pinUrlWithoutHash) {
                // Give the page a tiny bit to render
                setTimeout(() => {
                    Pinit.RestoreEngine.restore(pin);
                }, 500);
            }
        }
    });

} catch (e) {
    console.error("Pinit: Initialization failed", e);
}

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Pinit: Received message", request.action);
    
  if (request.action === "restorePin") {
    Pinit.RestoreEngine.restore(request.pin).then((success) => {
        sendResponse({ success: success });
    });
    return true; // Keep channel open for async response
  }
  
  if (request.action === "capturePage") {
    const pin = Pinit.Fingerprint.capturePage();
    chrome.runtime.sendMessage({ action: "savePin", pin: pin }, (response) => {
        Pinit.UIInjector.showToast("Page Pinned!");
        sendResponse({ success: true });
    });
    return true; // Keep channel open for async response
  }
  
  if (request.action === "ping") {
    Pinit.UIInjector.showToast("Pinit is ready!");
    sendResponse({ status: "active", version: "2.1" });
  }
});