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
  
  if (request.action === "ping") {
    Pinit.UIInjector.showToast("Pinit is ready!");
    sendResponse({ status: "active", version: "2.1" });
  }
});